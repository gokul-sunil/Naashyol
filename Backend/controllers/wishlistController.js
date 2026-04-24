import asyncHandler from "express-async-handler";
import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

const getOrCreateWishlist = async (userId) => {
  let wl = await Wishlist.findOne({ user: userId }).populate("products");
  if (!wl) wl = await Wishlist.create({ user: userId, products: [] });
  return wl;
};

export const getWishlist = asyncHandler(async (req, res) => {
  const wl = await getOrCreateWishlist(req.user._id);
  const products = wl.products.filter((p) => p && p.isActive);
  res.json(products);
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    res.status(404);
    throw new Error("Product not found");
  }
  let wl = await Wishlist.findOne({ user: req.user._id });
  if (!wl) wl = await Wishlist.create({ user: req.user._id, products: [] });
  if (wl.products.some((p) => p.toString() === productId)) {
    const list = await Wishlist.findById(wl._id).populate("products");
    return res.json(list.products.filter((p) => p && p.isActive));
  }
  wl.products.push(productId);
  await wl.save();
  const list = await Wishlist.findById(wl._id).populate("products");
  res.json(list.products.filter((p) => p && p.isActive));
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const wl = await Wishlist.findOne({ user: req.user._id });
  if (!wl) return res.json([]);
  wl.products = wl.products.filter((p) => p.toString() !== productId);
  await wl.save();
  const list = await Wishlist.findById(wl._id).populate("products");
  res.json(list.products.filter((p) => p && p.isActive));
});
