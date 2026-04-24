import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";
import User from "../models/User.js";
import { rewardReferrer } from "./referralController.js";
import { sendNotification } from "./notificationController.js";
import { logTransaction } from "./transactionController.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { addressId, address, couponCode } = req.body;
  let shippingAddress = address;
  if (addressId && !address) {
    const Address = (await import("../models/Address.js")).default;
    const saved = await Address.findOne({ _id: addressId, user: req.user._id });
    if (!saved) {
      res.status(400);
      throw new Error("Address not found");
    }
    shippingAddress = {
      fullName: saved.fullName,
      phone: saved.phone,
      street: saved.street,
      city: saved.city,
      state: saved.state,
      pincode: saved.pincode,
    };
  }
  if (!shippingAddress?.fullName || !shippingAddress?.phone || !shippingAddress?.street || !shippingAddress?.city || !shippingAddress?.state || !shippingAddress?.pincode) {
    res.status(400);
    throw new Error("Valid shipping address is required");
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  if (!cart || !cart.items.length) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  const items = [];
  let totalAmount = 0;
  for (const line of cart.items) {
    if (!line.product) continue;
    const product = await Product.findById(line.product._id);
    if (!product || !product.isActive) continue;

    const variant = product.variants.find((v) => v.sku === line.sku);
    if (!variant || !variant.isActive) continue;

    const qty = Math.min(line.quantity, variant.currentStock);
    if (qty < 1) continue;

    const price = variant.sellingPrice;
    items.push({
      productId: product._id,
      sku: line.sku,
      title: `${product.title} (${line.sku})`,
      price,
      quantity: qty,
      vendorId: variant.currentVendor,
    });
    totalAmount += price * qty;

    // Deduct stock
    variant.currentStock -= qty;
    await product.save();
  }

  if (items.length === 0) {
    res.status(400);
    throw new Error("No valid items in cart");
  }

  let discountAmount = 0;
  if (couponCode && couponCode.trim()) {
    const coupon = await Coupon.findOne({ code: couponCode.trim().toUpperCase(), isActive: true });
    if (coupon && (!coupon.expiryDate || new Date(coupon.expiryDate) >= new Date()) && (coupon.usageLimit == null || coupon.usedCount < coupon.usageLimit)) {
      if (coupon.discountType === "percentage") {
        discountAmount = (totalAmount * (coupon.discountValue || 0)) / 100;
      } else {
        discountAmount = Math.min(coupon.discountValue || 0, totalAmount);
      }
      coupon.usedCount = (coupon.usedCount || 0) + 1;
      await coupon.save();
    }
  }
  totalAmount = Math.max(0, totalAmount - discountAmount);

  const order = await Order.create({
    user: req.user._id,
    items,
    totalAmount,
    address: shippingAddress,
    paymentStatus: "pending",
    orderStatus: "pending",
    couponCode: discountAmount > 0 ? couponCode : undefined,
    discountAmount,
  });

  await Cart.findOneAndUpdate({ user: req.user._id }, { $set: { items: [] } });

  // Notify user
  await sendNotification(
    req.user._id,
    "Order Placed!",
    `Your order ${order._id} has been placed successfully.`,
    "order",
    `/orders/${order._id}`
  );

  res.status(201).json(order);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findById(id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.orderStatus = status;
  await order.save();

  // If order is delivered, reward the referrer
  if (status === "delivered") {
    await rewardReferrer(order);
  }

  res.json(order);
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order || (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin")) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.json(order);
});

export const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to cancel this order");
  }

  if (order.orderStatus !== "pending") {
    res.status(400);
    throw new Error(`Cannot cancel order in ${order.orderStatus} status`);
  }

  order.orderStatus = "cancelled";
  await order.save();

  // Restore stock
  for (const item of order.items) {
    const product = await Product.findById(item.productId);
    if (product) {
      const variant = product.variants.find((v) => v.sku === item.sku);
      if (variant) {
        variant.currentStock += item.quantity;
        await product.save();
      }
    }
  }

  res.json({ message: "Order cancelled successfully", order });
});
