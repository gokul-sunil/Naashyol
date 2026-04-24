import express from "express";
import {
  registerVendor,
  getMyVendorProfile,
  updateMyVendorProfile,
  getAllApprovedVendors,
  getVendorById,
  adminGetAllVendors,
  adminUpdateApprovalStatus,
  adminDeleteVendor,
  adminUpdateRevenue,
} from "../controllers/vendorController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ─────────────────────────────────────────
//  PUBLIC ROUTES
// ─────────────────────────────────────────
router.get("/", getAllApprovedVendors);           // GET  /api/vendors
router.get("/:id", getVendorById);                // GET  /api/vendors/:id

// ─────────────────────────────────────────
//  VENDOR (logged-in) ROUTES
// ─────────────────────────────────────────
router.post("/register", protect, registerVendor);              // POST   /api/vendors/register
router.get("/my-profile", protect, getMyVendorProfile);         // GET    /api/vendors/my-profile
router.put("/my-profile", protect, updateMyVendorProfile);      // PUT    /api/vendors/my-profile

// ─────────────────────────────────────────
//  ADMIN ROUTES
// ─────────────────────────────────────────
router.get("/admin/all", protect, adminGetAllVendors);

router.patch("/admin/:id/approval", protect, adminUpdateApprovalStatus);

router.patch("/admin/:id/revenue", protect, adminUpdateRevenue);

router.delete("/admin/:id", protect, adminDeleteVendor);

export default router;