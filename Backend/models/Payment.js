import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    provider: {
      type: String,
      enum: ["stripe", "razorpay"],
    },

    transactionId: {
      type: String,
      required: true,
    },

    amount: Number,

    status: {
      type: String,
      enum: ["success", "failed", "refunded"],
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);