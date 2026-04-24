import express from "express";
import {
  getAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
} from "../controllers/attributeController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAttributes);

// Admin only routes
router.post("/", protect, authorize("admin"), createAttribute);
router.put("/:id", protect, authorize("admin"), updateAttribute);
router.delete("/:id", protect, authorize("admin"), deleteAttribute);

export default router;
