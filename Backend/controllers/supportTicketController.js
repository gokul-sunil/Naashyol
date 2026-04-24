import asyncHandler from "express-async-handler";
import SupportTicket from "../models/SupportTickets.js";

// @desc    Create a new support ticket
// @route   POST /api/support-tickets
// @access  Private
export const createSupportTicket = asyncHandler(async (req, res) => {
  const { subject, message, priority } = req.body;

  const ticket = await SupportTicket.create({
    userId: req.user._id,
    subject,
    message,
    priority,
  });

  res.status(201).json(ticket);
});

// @desc    Get user's support tickets
// @route   GET /api/support-tickets/my-tickets
// @access  Private
export const getMySupportTickets = asyncHandler(async (req, res) => {
  const tickets = await SupportTicket.find({ userId: req.user._id }).sort("-createdAt");
  res.json(tickets);
});

// @desc    Get all support tickets (Admin only)
// @route   GET /api/support-tickets
// @access  Private/Admin
export const getAllSupportTickets = asyncHandler(async (req, res) => {
  const tickets = await SupportTicket.find({}).populate("userId", "name email").sort("-createdAt");
  res.json(tickets);
});

// @desc    Reply to a support ticket (Admin only)
// @route   PUT /api/support-tickets/:id/reply
// @access  Private/Admin
export const replySupportTicket = asyncHandler(async (req, res) => {
  const ticket = await SupportTicket.findById(req.params.id);

  if (ticket) {
    ticket.adminReply.push({
      message: req.body.message,
      adminId: req.user._id,
    });
    ticket.status = req.body.status || ticket.status;
    await ticket.save();
    res.json(ticket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});
