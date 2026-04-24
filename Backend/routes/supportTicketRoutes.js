import express from "express";
import {
  createSupportTicket,
  getMySupportTickets,
  getAllSupportTickets,
  replySupportTicket,
} from "../controllers/supportTicketController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", protect, createSupportTicket);
router.get("/my-tickets", protect, getMySupportTickets);

// Admin routes
router.get("/", protect, authorize("admin"), getAllSupportTickets);
router.put("/:id/reply", protect, authorize("admin"), replySupportTicket);

export default router;
