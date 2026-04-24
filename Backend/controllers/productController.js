

import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";


// ── Get All Products ──
export const getProducts = asyncHandler(async (req, res) => {

  const {
    search,
    category,
    brand,
    minPrice,
    maxPrice,
    sort = "-createdAt",
    page = 1,
    limit = 20
  } = req.query;

  const filter = { isActive: true };

  if (search) {
    filter.$text = { $search: search };
  }

  if (category) filter.category = category;
  if (brand) filter.brand = brand;

  if (minPrice) filter["variants.sellingPrice"] = { $gte: Number(minPrice) };
  if (maxPrice) filter["variants.sellingPrice"] = { ...filter["variants.sellingPrice"], $lte: Number(maxPrice) };

  const skip = (page - 1) * limit;

  const products = await Product.find(filter)
    .populate("category", "name")
    .populate("variants.currentVendor", "storeName")
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(filter);

  res.json({
    products,
    total,
    page: Number(page),
    limit: Number(limit),
  });

});


// ── Get Single Product ──
export const getProductById = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)
    .populate("category", "name parentCategory")
    .populate("variants.currentVendor", "storeName");

  if (!product || !product.isActive) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);

});


// ── Featured Products ──
export const getFeaturedProducts = asyncHandler(async (req, res) => {

  const products = await Product.find({
    isActive: true,
    featured: true,
  })
    .populate("category", "name")
    .limit(12);

  res.json(products);

});


// ── Offer Products ──
export const getOffers = asyncHandler(async (req, res) => {

  const products = await Product.find({
    isActive: true,
    offerPrice: { $gt: 0 },
  })
    .populate("category", "name")
    .limit(12);

  res.json(products);

});


// ── Create Product (Admin) ──
export const createProduct = asyncHandler(async (req, res) => {

  const product = new Product({
    createdBy: req.user._id,
    ...req.body,
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);

});


// ── Update Product (Admin) ──
export const updateProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  Object.assign(product, req.body);

  const updatedProduct = await product.save();

  res.json(updatedProduct);

});


// ── Delete Product (Soft Delete) ──
export const deleteProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.isActive = false;

  await product.save();

  res.json({ message: "Product removed (soft delete)" });

});