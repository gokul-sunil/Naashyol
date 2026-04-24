import express from "express";
import {
  createVendorStock,
  selectVendorForVariant,
  getVendorStocksForVariant,
  approveVendorStock,
} from "../controllers/vendorStockController.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Vendor
router.post("/", protect, authorize("vendor","admin"), createVendorStock);

// ✅ Admin
router.put("/select", protect, authorize("admin"), selectVendorForVariant);

// 🔥 NEW: Approve stock
router.put("/approve/:stockId", protect, authorize("admin"), approveVendorStock);

// ✅ Get all vendor stocks for a variant
router.get("/:productId/:sku", protect, authorize("admin"), getVendorStocksForVariant);

export default router;