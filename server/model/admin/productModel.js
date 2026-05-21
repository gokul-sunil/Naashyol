import mongoose from "mongoose";

const productVariantSchema =
  new mongoose.Schema(
    {
    
      attributes: {
        type: Map,
        of: String,
        default: {},
      },
   sku: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
      },

      purchasePrice: {
        type: Number,
        required: true,
        min: 0,
      },
      sellingPrice: {
        type: Number,
        default: 0,
        min: 0,
      },
            stockQuantity: {
        type: Number,
        default: 0,
        min: 0,
      },
      useVariantImages: {
        type: Boolean,
        default: false,
      },

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
    productName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
      index: true,
    },
    purchasePrice: {
      type: Number,
      default: 0,
      min: 0,
    },
  sellingPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    stockQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
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

    description: {
      type: String,
      default: "",
    },
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
    specifications: {
      type: Map,
      of: String,
      default: {},
    },
    variants: [productVariantSchema],
    hasVariants: {
      type: Boolean,
      default: false,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
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

productSchema.pre(
  "save",
  function () {
    if (!this.hasVariants) {
      this.status =
        this.stockQuantity <= 0
          ? "out_of_stock"
          : "approved";
    }
  }
);

// productSchema.post(
//   "save",
//   async function (doc) {
//     try {
//       const Category =
//         mongoose.model("Category");

//       if (doc.isNew) {
//         await Category.findByIdAndUpdate(
//           doc.category,
//           {
//             $inc: {
//               productCount: 1,
//             },
//           }
//         );
//       }
//     } catch (error) {
//       console.log(
//         "CATEGORY COUNT UPDATE ERROR:",
//         error
//       );
//     }
//   }
// );
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
        "CATEGORY PRODUCT DELETE ERROR:",
        error
      );
    }
  }
);

export default mongoose.model(
  "Product",
  productSchema
);