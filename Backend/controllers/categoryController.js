import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";

/* ================= CREATE CATEGORY ================= */

export const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, description, icon, parentCategory } = req.body;

  const existingCategory = await Category.findOne({ slug });

  if (existingCategory) {
    return res.status(400).json({
      success: false,
      message: "Category already exists",
    });
  }

  const category = await Category.create({
    name,
    slug,
    description,
    icon,
    parentCategory: parentCategory || null,
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

/* ================= GET ALL CATEGORIES ================= */

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find()
    .populate("parentCategory", "name")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

/* ================= GET CATEGORY BY ID ================= */

export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).populate(
    "parentCategory",
    "name"
  );

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.json({
    success: true,
    data: category,
  });
});

/* ================= UPDATE CATEGORY ================= */

export const updateCategory = asyncHandler(async (req, res) => {
  const { name, slug, description, icon, parentCategory } = req.body;

  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  category.name = name || category.name;
  category.slug = slug || category.slug;
  category.description = description || category.description;
  category.icon = icon || category.icon;
  category.parentCategory = parentCategory || null;

  const updatedCategory = await category.save();

  res.json({
    success: true,
    message: "Category updated successfully",
    data: updatedCategory,
  });
});

/* ================= DELETE CATEGORY ================= */

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  await category.deleteOne();

  res.json({
    success: true,
    message: "Category deleted successfully",
  });
});

/* ================= ACTIVATE / DEACTIVATE ================= */

export const toggleCategoryStatus = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  category.isActive = !category.isActive;

  await category.save();

  res.json({
    success: true,
    message: `Category ${
      category.isActive ? "activated" : "deactivated"
    } successfully`,
    data: category,
  });
});

/* ================= SEARCH CATEGORY ================= */

export const searchCategories = asyncHandler(async (req, res) => {
  const { keyword } = req.query;

  const categories = await Category.find({
    name: { $regex: keyword, $options: "i" },
  });

  res.json({
    success: true,
    count: categories.length,
    data: categories,
  });
});