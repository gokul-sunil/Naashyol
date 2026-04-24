import asyncHandler from "express-async-handler";
import Attribute from "../models/Attribute.js";

// @desc    Get all attributes
// @route   GET /api/attributes
// @access  Public
export const getAttributes = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = { isActive: true };

  if (category) {
    filter.categories = category;
  }

  const attributes = await Attribute.find(filter).populate("categories", "name");
  res.json(attributes);
});

// @desc    Create an attribute (Admin only)
// @route   POST /api/attributes
// @access  Private/Admin
export const createAttribute = asyncHandler(async (req, res) => {
  const { name, categories } = req.body;

  const attributeExists = await Attribute.findOne({ name });
  if (attributeExists) {
    res.status(400);
    throw new Error("Attribute already exists");
  }

  const attribute = await Attribute.create({
    name,
    categories,
  });

  res.status(201).json(attribute);
});

// @desc    Update an attribute (Admin only)
// @route   PUT /api/attributes/:id
// @access  Private/Admin
export const updateAttribute = asyncHandler(async (req, res) => {
  const attribute = await Attribute.findById(req.params.id);

  if (attribute) {
    attribute.name = req.body.name || attribute.name;
    attribute.categories = req.body.categories || attribute.categories;
    attribute.isActive = req.body.isActive !== undefined ? req.body.isActive : attribute.isActive;

    const updatedAttribute = await attribute.save();
    res.json(updatedAttribute);
  } else {
    res.status(404);
    throw new Error("Attribute not found");
  }
});

// @desc    Delete an attribute (Admin only)
// @route   DELETE /api/attributes/:id
// @access  Private/Admin
export const deleteAttribute = asyncHandler(async (req, res) => {
  const attribute = await Attribute.findById(req.params.id);

  if (attribute) {
    attribute.isActive = false;
    await attribute.save();
    res.json({ message: "Attribute deactivated" });
  } else {
    res.status(404);
    throw new Error("Attribute not found");
  }
});
