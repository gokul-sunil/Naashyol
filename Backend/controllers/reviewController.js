import asyncHandler from "express-async-handler";
import Review from "../models/Review.js";
import Product from "../models/Product.js";

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
export const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment, images } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const alreadyReviewed = await Review.findOne({ user: req.user._id, product: productId });
  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Product already reviewed by this user");
  }

  const review = await Review.create({
    user: req.user._id,
    product: productId,
    rating,
    comment,
    images,
  });

  res.status(201).json(review);
});

// @desc    Get all reviews for a product (Approved only)
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId, isApproved: true })
    .populate("user", "name")
    .sort("-createdAt");
  res.json(reviews);
});

// @desc    Moderate reviews (Admin only)
// @route   GET /api/reviews/moderate
// @access  Private/Admin
export const getPendingReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ isApproved: false })
    .populate("user", "name")
    .populate("product", "title");
  res.json(reviews);
});

// @desc    Approve or reject review (Admin only)
// @route   PUT /api/reviews/:id/approve
// @access  Private/Admin
export const approveReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (review) {
    review.isApproved = req.body.isApproved;
    await review.save();
    res.json({ message: `Review ${review.isApproved ? "approved" : "rejected"}` });
  } else {
    res.status(404);
    throw new Error("Review not found");
  }
});
