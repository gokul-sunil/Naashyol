import asyncHandler from "express-async-handler";
import Coupon from "../models/Coupon.js";

export const validateCoupon = asyncHandler(async (req, res) => {
  const { code, subtotal } = req.query;
  if (!code || !code.trim()) {
    return res.status(400).json({ message: "Coupon code is required" });
  }
  const coupon = await Coupon.findOne({ code: code.trim().toUpperCase(), isActive: true });
  if (!coupon) {
    return res.status(404).json({ valid: false, message: "Invalid or expired coupon" });
  }
  if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
    return res.status(400).json({ valid: false, message: "Coupon has expired" });
  }
  if (coupon.usageLimit != null && coupon.usedCount >= coupon.usageLimit) {
    return res.status(400).json({ valid: false, message: "Coupon usage limit reached" });
  }
  const sub = Math.max(0, Number(subtotal) || 0);
  let discountAmount = 0;
  if (coupon.discountType === "percentage") {
    discountAmount = (sub * (coupon.discountValue || 0)) / 100;
  } else {
    discountAmount = Math.min(coupon.discountValue || 0, sub);
  }
  res.json({
    valid: true,
    code: coupon.code,
    discountAmount,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    finalAmount: Math.max(0, sub - discountAmount),
  });
});
