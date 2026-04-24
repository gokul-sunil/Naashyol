import asyncHandler from "express-async-handler";
import Notification from "../models/Notification.js";

// @desc    Get user's notifications
// @route   GET /api/notifications
// @access  Private
export const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort("-createdAt");
  res.json(notifications);
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (notification && notification.user.toString() === req.user._id.toString()) {
    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } else {
    res.status(404);
    throw new Error("Notification not found");
  }
});

// @desc    Internal helper function to create notifications
export const sendNotification = async (userId, title, message, type, link) => {
  try {
    await Notification.create({
      user: userId,
      title,
      message,
      type,
      link,
    });
  } catch (err) {
    console.error("Failed to send notification:", err);
  }
};
