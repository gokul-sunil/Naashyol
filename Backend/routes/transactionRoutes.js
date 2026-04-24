import express from "express";
import { getMyTransactions, getAllTransactions } from "../controllers/transactionController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMyTransactions);

// Admin routes
router.get("/admin", protect, authorize("admin"), getAllTransactions);

export default router;
