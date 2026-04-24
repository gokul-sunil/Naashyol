import mongoose from "mongoose";

const vendorStockSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    sku: {
      type: String,
      required: true,
      index: true,
    },

    stockQuantity: {
      type: Number,
      required: true,
      default: 0,
    },

    vendorPrice: {
      type: Number,
      required: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Compound index to ensure a vendor has only one stock entry per SKU of a product
vendorStockSchema.index({ vendor: 1, product: 1, sku: 1 }, { unique: true });

export default mongoose.model("VendorStock", vendorStockSchema);
