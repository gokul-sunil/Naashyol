import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {

    storeName: {
      type: String,
      required: true,
      trim: true,
    },

    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    businessLicenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    isSuspended: {
      type: Boolean,
      default: false,
    },
    totalSalesAmount: {
      type: Number,
      default: 0,
    },

    totalProducts: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model(
  "Vendor",
  vendorSchema
);

export default Vendor;