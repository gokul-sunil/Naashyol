import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false, // never return password
        },

        role: {
            type: String,
            enum: ["user", "admin", "vendor", "superadmin"],
            default: "user",
            index: true,
        },

        isBlocked: {
            type: Boolean,
            default: false,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        referralCode: {
            type: String,
            unique: true,
            index: true,
        },

        referredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
            index: true,
        },

        referralCount: {
            type: Number,
            default: 0,
        },

        walletBalance: {
            type: Number,
            default: 0,
        },

        otp: String,
        otpExpiry: Date,
    },
    { timestamps: true }
);

// 🔐 Hash password before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Generate referral code before saving
userSchema.pre("save", function (next) {
  if (!this.referralCode) {
    this.referralCode = crypto.randomBytes(4).toString("hex");
  }
  next();
});

export default mongoose.model("User", userSchema);