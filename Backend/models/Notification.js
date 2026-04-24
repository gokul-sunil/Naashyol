import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["order", "payment", "referral", "system", "promo"],
      default: "system",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    link: String, // Optional link to redirect user (e.g., to order details)
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
