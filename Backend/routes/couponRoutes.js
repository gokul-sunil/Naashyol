import express from "express";
import { validateCoupon } from "../controllers/couponController.js";

const router = express.Router();
router.get("/validate", validateCoupon);

export default router;
