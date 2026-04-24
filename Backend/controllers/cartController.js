import asyncHandler from "express-async-handler";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

export const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  const items = cart.items
    .filter((i) => i.product)
    .map((i) => {
      const variant = i.product.variants.find((v) => v.sku === i.sku);
      const price = variant ? variant.sellingPrice : 0;
      return {
        product: i.product,
        sku: i.sku,
        quantity: i.quantity,
        productId: i.product._id,
        variant,
        price,
      };
    });
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  res.json({ items, subtotal, count: items.reduce((s, i) => s + i.quantity, 0) });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, sku, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    res.status(404);
    throw new Error("Product not found");
  }

  const variant = product.variants.find((v) => v.sku === sku);
  if (!variant || !variant.isActive) {
    res.status(404);
    throw new Error("Product variant not found");
  }

  if (variant.currentStock < quantity) {
    res.status(400);
    throw new Error("Insufficient stock for this variant");
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

  const existing = cart.items.find((i) => i.product.toString() === productId && i.sku === sku);
  if (existing) {
    const newQty = existing.quantity + quantity;
    if (variant.currentStock < newQty) {
      res.status(400);
      throw new Error("Insufficient stock");
    }
    existing.quantity = newQty;
  } else {
    cart.items.push({ product: productId, sku, quantity });
  }
  await cart.save();
  
  res.status(200).json({ message: "Item added to cart" });
});

export const updateQuantity = asyncHandler(async (req, res) => {
  const { productId, sku, quantity } = req.body;
  
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const item = cart.items.find((i) => i.product.toString() === productId && i.sku === sku);
  if (!item) {
    res.status(404);
    throw new Error("Item not in cart");
  }

  if (quantity < 1) {
    cart.items = cart.items.filter((i) => !(i.product.toString() === productId && i.sku === sku));
  } else {
    const product = await Product.findById(productId);
    const variant = product?.variants.find((v) => v.sku === sku);
    if (!variant || variant.currentStock < quantity) {
      res.status(400);
      throw new Error("Invalid quantity or insufficient stock");
    }
    item.quantity = quantity;
  }

  await cart.save();
  res.status(200).json({ message: "Cart updated" });
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId, sku } = req.params;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.json({ message: "Cart is empty" });

  cart.items = cart.items.filter((i) => !(i.product.toString() === productId && i.sku === sku));
  await cart.save();
  res.status(200).json({ message: "Item removed from cart" });
});
