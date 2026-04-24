import asyncHandler from "express-async-handler";
import Transaction from "../models/Transactions.js";

// @desc    Get user's transactions
// @route   GET /api/transactions
// @access  Private
export const getMyTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id }).sort("-createdAt");
  res.json(transactions);
});

// @desc    Get all transactions (Admin only)
// @route   GET /api/transactions/admin
// @access  Private/Admin
export const getAllTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({}).populate("userId", "name email").sort("-createdAt");
  res.json(transactions);
});

// @desc    Internal helper function to create transactions
export const logTransaction = async (userId, amount, type, method, status, description, orderId) => {
  try {
    await Transaction.create({
      userId,
      amount,
      type,
      method,
      status,
      description,
      orderId,
    });
  } catch (err) {
    console.error("Failed to log transaction:", err);
  }
};
