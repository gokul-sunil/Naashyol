import mongoose from "mongoose";

const productVariantSchema =
  new mongoose.Schema(
    {
      // =====================================================
      // VARIANT TYPE
      // Example:
      // Color / Size / Storage
      // =====================================================

      name: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // VARIANT VALUE
      // Example:
      // Red / XL / 256GB
      // =====================================================

      value: {
        type: String,
        required: true,
        trim: true,
      },

      // =====================================================
      // VARIANT SKU
      // =====================================================

      sku: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
      },

      // =====================================================
      // VARIANT PRICE
      // =====================================================

      price: {
        type: Number,
        required: true,
        min: 0,
      },

      // =====================================================
      // VARIANT STOCK
      // =====================================================

      stockQuantity: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
      },

      // =====================================================
      // USE VARIANT IMAGES
      // =====================================================

      useVariantImages: {
        type: Boolean,
        default: false,
      },

      // =====================================================
      // VARIANT IMAGES
      // ONLY USED IF useVariantImages = true
      // =====================================================

      images: {
        type: [String],

        validate: {
          validator: function (value) {
            return value.length <= 5;
          },

          message:
            "Maximum 5 variant images allowed",
        },

        default: [],
      },

      // =====================================================
      // VARIANT STATUS
      // =====================================================

      status: {
        type: String,

        enum: [
          "pending",
          "approved",
          "out_of_stock",
        ],

        default: "pending",
      },
    },
    {
      _id: true,
      timestamps: true,
    }
  );

const productSchema = new mongoose.Schema(
  {
    // =====================================================
    // PRODUCT NAME
    // =====================================================

    productName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    // =====================================================
    // PRODUCT SKU
    // =====================================================

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    // =====================================================
    // CATEGORY
    // =====================================================

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    // =====================================================
    // VENDOR
    // =====================================================

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },

    // =====================================================
    // PRODUCT PRICE
    // =====================================================

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // =====================================================
    // STOCK QUANTITY
    // =====================================================

    stockQuantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    // =====================================================
    // PAID AMOUNT
    // =====================================================

    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // =====================================================
    // STATUS
    // =====================================================

    status: {
      type: String,

      enum: [
        "pending",
        "approved",
        "out_of_stock",
      ],

      default: "pending",

      index: true,
    },

    // =====================================================
    // DESCRIPTION
    // =====================================================

    description: {
      type: String,
      default: "",
    },

    // =====================================================
    // PRODUCT IMAGES
    // =====================================================

    images: {
      type: [String],

      validate: {
        validator: function (value) {
          return value.length <= 5;
        },

        message:
          "Maximum 5 product images allowed",
      },

      default: [],
    },

    // =====================================================
    // PRODUCT VARIANTS
    // =====================================================

    variants: [productVariantSchema],

    // =====================================================
    // HAS VARIANTS
    // =====================================================

    hasVariants: {
      type: Boolean,
      default: false,
    },

    // =====================================================
    // TOTAL SALES
    // =====================================================

    totalSales: {
      type: Number,
      default: 0,
    },

    // =====================================================
    // FEATURED
    // =====================================================

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// =====================================================
// INDEXES
// =====================================================

productSchema.index({
  productName: "text",
  description: "text",
});

productSchema.index({
  category: 1,
  status: 1,
});

productSchema.index({
  vendor: 1,
  status: 1,
});

// =====================================================
// AUTO STOCK STATUS
// =====================================================

productSchema.pre("save", function (next) {
  if (this.stockQuantity <= 0) {
    this.status = "out_of_stock";
  }

  next();
});

// =====================================================
// CATEGORY PRODUCT COUNT UPDATE
// =====================================================

productSchema.post("save", async function (doc) {
  try {
    const Category =
      mongoose.model("Category");

    if (doc.isNew) {
      await Category.findByIdAndUpdate(
        doc.category,
        {
          $inc: {
            productCount: 1,
          },
        }
      );
    }
  } catch (error) {
    console.log(
      "CATEGORY COUNT UPDATE ERROR:",
      error
    );
  }
});

// =====================================================
// CATEGORY PRODUCT COUNT DELETE
// =====================================================

productSchema.post(
  "findOneAndDelete",
  async function (doc) {
    try {
      if (doc) {
        const Category =
          mongoose.model("Category");

        await Category.findByIdAndUpdate(
          doc.category,
          {
            $inc: {
              productCount: -1,
            },
          }
        );
      }
    } catch (error) {
      console.log(
        "CATEGORY COUNT DELETE ERROR:",
        error
      );
    }
  }
);

export default mongoose.model(
  "Product",
  productSchema
);