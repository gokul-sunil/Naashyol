import express from "express";
import { applyReferralCode, getReferralStats } from "../controllers/referralController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/apply", protect, applyReferralCode);
router.get("/stats", protect, getReferralStats);

export default router;
