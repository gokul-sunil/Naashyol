import express from "express";
import { getAdminStats, getVendorStats } from "../controllers/dashboardController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/admin", protect, authorize("admin"), getAdminStats);
router.get("/vendor", protect, authorize("vendor"), getVendorStats);

export default router;
