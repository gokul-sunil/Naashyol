import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Referral from "../models/Referral.js";
import Coupon from "../models/Coupon.js";
import { sendNotification } from "./notificationController.js";
import { logTransaction } from "./transactionController.js";

// @desc    Apply referral code
// @route   POST /api/referrals/apply
// @access  Private
export const applyReferralCode = asyncHandler(async (req, res) => {
  const { referralCode } = req.body;
  const user = req.user;

  if (user.referredBy) {
    res.status(400);
    throw new Error("You have already been referred");
  }

  const referrer = await User.findOne({ referralCode });
  if (!referrer) {
    res.status(404);
    throw new Error("Referral code not found");
  }

  if (referrer._id.toString() === user._id.toString()) {
    res.status(400);
    throw new Error("You cannot refer yourself");
  }

  // Update user with referrer
  user.referredBy = referrer._id;
  await user.save();

  // Create a record in Referral model
  await Referral.create({
    referrer: referrer._id,
    referredUser: user._id,
  });

  // Increment referrer's count
  referrer.referralCount += 1;
  await referrer.save();

  // Notify referrer
  await sendNotification(
    referrer._id,
    "New Referral!",
    `${user.name} used your referral code. You'll get a reward after their first order!`,
    "referral"
  );

  res.json({ message: "Referral code applied successfully", referrer: referrer.name });
});

// @desc    Reward referrer after order delivery
export const rewardReferrer = async (order) => {
  const buyer = await User.findById(order.user).populate("referredBy");
  if (!buyer || !buyer.referredBy) return;

  const referral = await Referral.findOne({
    referrer: buyer.referredBy._id,
    referredUser: buyer._id,
    rewardGranted: false,
  });

  if (!referral) return;

  const rewardAmount = order.totalAmount * 0.05; // 5% reward
  buyer.referredBy.walletBalance += rewardAmount;
  await buyer.referredBy.save();

  referral.rewardGranted = true;
  referral.rewardAmount = rewardAmount;
  await referral.save();

  // Log transaction
  await logTransaction(
    buyer.referredBy._id,
    rewardAmount,
    "deposit",
    "wallet",
    "completed",
    `Referral reward from order ${order._id}`,
    order._id
  );

  // Notify referrer
  await sendNotification(
    buyer.referredBy._id,
    "Referral Reward Granted!",
    `You've received ${rewardAmount} reward for ${buyer.name}'s order.`,
    "referral",
    `/orders/${order._id}`
  );

  console.log(`Referral reward of ${rewardAmount} granted to ${buyer.referredBy.name}`);
};

// @desc    Get referral stats
// @route   GET /api/referrals/stats
// @access  Private
export const getReferralStats = asyncHandler(async (req, res) => {
  const user = req.user;
  const referrals = await Referral.find({ referrer: user._id }).populate("referredUser", "name createdAt");
  
  res.json({
    referralCode: user.referralCode,
    referralCount: user.referralCount,
    walletBalance: user.walletBalance,
    referrals,
  });
});
