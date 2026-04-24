


import mongoose from "mongoose";

// ── Review Schema ──
const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ── Variant Schema ──
const variantSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  attributes: [
    {
      name: String,
      value: String,
    },
  ],
  sellingPrice: {
    type: Number,
    required: true,
  },
  currentVendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },
  currentStock: {
    type: Number,
    default: 0,
  },
  currentVendorPrice: Number,
  weight: Number,
  image: String,
  barcode: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

// ── Referral Coupon Schema ──
const referralCouponSchema = new mongoose.Schema({
  code: String,
  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  referrerCode: String,
  email: String,
  discountPrefix: String,
  discountValue: Number,
  rewardType: String,
  rewardValue: Number,
  used: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 1,
  },
  expiry: Date,
  status: {
    type: String,
    enum: ["Active", "Expired", "Used"],
    default: "Active",
  },
});

// ── Product Schema ──
const productSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      index: true,
    },

    brand: {
      type: String,
      required: true,
      index: true,
    },

    description: String,

    specifications: [
      {
        key: String,
        value: String,
      },
    ],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    images: [String],

    variants: [variantSchema],

    seo: {
      title: String,
      description: String,
      slug: {
        type: String,
        unique: true,
        sparse: true,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    offerPrice: {
      type: Number,
      default: null,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    referralCoupons: [referralCouponSchema],

    reviews: [reviewSchema],
  },
  { timestamps: true }
);

// ── Search Index ──
productSchema.index({ title: "text", description: "text" });

export default mongoose.model("Product", productSchema);