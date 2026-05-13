import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    department: {
      type: String,

      enum: [
        "none",
        "electronics",
        "fashion",
        "home_garden",
        "sports_outdoor",
        "books",
      ],

      default: "none",
      required: true,
      index: true,
    },

    icon: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index({
  department: 1,
  slug: 1,
});

export default mongoose.model("Category", categorySchema);