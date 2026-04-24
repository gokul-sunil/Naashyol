import express from "express";
import {
  createReview,
  getProductReviews,
  getPendingReviews,
  approveReview,
} from "../controllers/reviewController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/product/:productId", getProductReviews);

// Protected routes
router.post("/", protect, createReview);

// Admin routes
router.get("/moderate", protect, authorize("admin"), getPendingReviews);
router.put("/:id/approve", protect, authorize("admin"), approveReview);

export default router;
