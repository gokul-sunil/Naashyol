import Product from "../../model/admin/productModel.js";
import Category from "../../model/admin/categoryModel.js";
import fs from "fs";
import mongoose from "mongoose";


const createProduct = async (
  req,
  res
) => {
  const session =
    await mongoose.startSession();

  let uploadedFiles = [];

  try {
    session.startTransaction();

    const {
      productName,
      sku,
      category,
      vendor,
      purchasePrice,
      stockQuantity,
      paidAmount,
      status,
      description,
      hasVariants,
      specifications,
    } = req.body;

    uploadedFiles = req.files || [];

    // ============================================
    // CHECK SKU
    // ============================================

    const existingProduct =
      await Product.findOne({
        sku,
      }).session(session);

    if (existingProduct) {
      throw new Error(
        "SKU already exists"
      );
    }

    // ============================================
    // IMAGE PATHS
    // ============================================

    const imagePaths =
      uploadedFiles.map(
        (file) =>
          `/uploads/products/${file.filename}`
      );

    // ============================================
    // CREATE PRODUCT
    // ============================================

    const product =
      await Product.create(
        [
          {
            productName,

            sku,

            category,

            vendor,

            purchasePrice:
              hasVariants === "true"
                ? 0
                : purchasePrice,

            stockQuantity:
              hasVariants === "true"
                ? 0
                : stockQuantity,

            paidAmount,

            status,

            description,

            hasVariants:
              hasVariants === "true",

            specifications: {
              ...specifications,
            },

            images: imagePaths,
          },
        ],
        { session }
      );

    // ============================================
    // COMMIT
    // ============================================

    await session.commitTransaction();

    session.endSession();

    return res.status(201).json({
      success: true,

      message:
        "Product created successfully",

      product: product[0],
    });
  } catch (error) {
    console.log(error);

    // ============================================
    // ABORT DB TRANSACTION
    // ============================================

    await session.abortTransaction();

    session.endSession();

    // ============================================
    // DELETE UPLOADED FILES
    // ============================================

    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((file) => {
        try {
          if (
            fs.existsSync(file.path)
          ) {
            fs.unlinkSync(file.path);
          }
        } catch (deleteError) {
          console.log(
            "FILE DELETE ERROR:",
            deleteError
          );
        }
      });
    }

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Create product failed",
    });
  }
};



const updateProduct = async (
  req,
  res
) => {
  const session =
    await mongoose.startSession();

  let uploadedFiles = [];

  try {
    session.startTransaction();

    const { productId } =
      req.params;

    const product =
      await Product.findById(
        productId
      ).session(session);

    if (!product) {
      throw new Error(
        "Product not found"
      );
    }

    uploadedFiles = req.files || [];

    // ============================================
    // DUPLICATE SKU CHECK
    // ============================================

    if (
      req.body.sku &&
      req.body.sku !== product.sku
    ) {
      const existingProduct =
        await Product.findOne({
          sku: req.body.sku
            .trim()
            .toUpperCase(),
          _id: {
            $ne: productId,
          },
        }).session(session);

      if (existingProduct) {
        throw new Error(
          "SKU already exists"
        );
      }
    }

    // ============================================
    // NORMALIZE SPECIFICATIONS
    // ============================================

    let specifications = {};

    if (req.body.specifications) {
      Object.keys(
        req.body.specifications
      ).forEach((key) => {
        specifications[
          key.trim()
        ] = String(
          req.body.specifications[key]
        ).trim();
      });
    }

    // ============================================
    // UPDATE FIELDS
    // ============================================

    const fields = [
      "productName",
      "category",
      "vendor",
      "purchasePrice",
      "sellingPrice",
      "stockQuantity",
      "paidAmount",
      "description",
      "isFeatured",
    ];

    fields.forEach((field) => {
      if (
        req.body[field] !==
        undefined
      ) {
        product[field] =
          req.body[field];
      }
    });

    if (req.body.status) {
      product.status =
        req.body.status.trim();
    }

    if (req.body.sku) {
      product.sku =
        req.body.sku
          .trim()
          .toUpperCase();
    }

    if (
      req.body.hasVariants !==
      undefined
    ) {
      product.hasVariants =
        req.body.hasVariants ===
        "true";
    }

    // ============================================
    // PREVENT PRODUCT SELLING PRICE
    // ============================================

    if (
      product.hasVariants &&
      req.body.sellingPrice
    ) {
      product.sellingPrice = 0;
    }

    // ============================================
    // SPECIFICATIONS
    // ============================================

    if (
      Object.keys(specifications)
        .length > 0
    ) {
      product.specifications =
        specifications;
    }

    // ============================================
    // REPLACE IMAGES
    // ============================================

    if (uploadedFiles.length > 0) {
      // DELETE OLD IMAGES

      product.images.forEach(
        (imagePath) => {
          try {
            const fullPath = `.${imagePath}`;

            if (
              fs.existsSync(fullPath)
            ) {
              fs.unlinkSync(
                fullPath
              );
            }
          } catch (err) {
            console.log(err);
          }
        }
      );

      // ADD NEW IMAGES

      product.images =
        uploadedFiles.map(
          (file) =>
            `/uploads/products/${file.filename}`
        );
    }

    await product.save({
      session,
    });

    await session.commitTransaction();

    session.endSession();

    return res.status(200).json({
      success: true,
      message:
        "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    await session.abortTransaction();

    session.endSession();

    // DELETE NEWLY UPLOADED FILES

    uploadedFiles.forEach((file) => {
      try {
        if (
          fs.existsSync(file.path)
        ) {
          fs.unlinkSync(file.path);
        }
      } catch (err) {
        console.log(err);
      }
    });

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Update failed",
    });
  }
};

const deleteProduct = async (
  req,
  res
) => {
  const session =
    await mongoose.startSession();

  try {
    session.startTransaction();

    const { productId } =
      req.params;

    const product =
      await Product.findById(
        productId
      ).session(session);

    if (!product) {
      throw new Error(
        "Product not found"
      );
    }

    if (
      product.images?.length > 0
    ) {
      product.images.forEach(
        (imagePath) => {
          try {
            const fullPath =
              path.join(
                process.cwd(),
                imagePath
              );

            if (
              fs.existsSync(fullPath)
            ) {
              fs.unlinkSync(fullPath);
            }
          } catch (error) {
            console.log(error);
          }
        }
      );
    }

    if (
      product.variants?.length > 0
    ) {
      product.variants.forEach(
        (variant) => {
          if (
            variant.images?.length >
            0
          ) {
            variant.images.forEach(
              (imagePath) => {
                try {
                  const fullPath =
                    path.join(
                      process.cwd(),
                      imagePath
                    );

                  if (
                    fs.existsSync(
                      fullPath
                    )
                  ) {
                    fs.unlinkSync(
                      fullPath
                    );
                  }
                } catch (error) {
                  console.log(
                    error
                  );
                }
              }
            );
          }
        }
      );
    }

    await Product.findByIdAndDelete(
      productId,
      {
        session,
      }
    );

    await session.commitTransaction();

    session.endSession();

    return res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    await session.abortTransaction();

    session.endSession();

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Delete failed",
    });
  }
};
const addVariant = async (req, res) => {
  const session = await mongoose.startSession();

  let uploadedFiles = [];

  try {
    session.startTransaction();

    const { productId } = req.params;
    const product = await Product.findById(
      productId
    ).session(session);

    if (!product) {
      throw new Error("Product not found");
    }
    uploadedFiles = req.files || [];

    let attributes = {};

    if (req.body.attributes) {
      Object.keys(req.body.attributes).forEach(
        (key) => {
          attributes[key.trim()] = String(
            req.body.attributes[key]
          ).trim();
        }
      );
    }

    const variantSku = String(
      req.body.sku || ""
    )
      .trim()
      .toUpperCase();

    const variantStatus = String(
      req.body.status || "pending"
    )
      .trim()
      .toLowerCase();

    const useVariantImages =
      String(
        req.body.useVariantImages
      ).toLowerCase() === "true";


    const existingVariant =
      product.variants.find(
        (variant) =>
          variant.sku === variantSku
      );

    if (existingVariant) {
      throw new Error(
        "Variant SKU already exists"
      );
    }

    const imagePaths = useVariantImages
      ? uploadedFiles.map(
          (file) =>
            `/uploads/products/${file.filename}`
        )
      : [];

    const variant = {
      attributes: {
        ...attributes,
      },

      sku: variantSku,

      purchasePrice: Number(
        req.body.purchasePrice || 0
      ),

      sellingPrice: Number(
        req.body.sellingPrice || 0
      ),

      stockQuantity: Number(
        req.body.stockQuantity || 0
      ),

      status: variantStatus,

      useVariantImages,

      images: imagePaths,
    };


    product.variants.push(variant);

    product.hasVariants = true;

    await product.save({ session });

    await session.commitTransaction();

    session.endSession();

    return res.status(200).json({
      success: true,

      message:
        "Variant added successfully",

      variant:
        product.variants[
          product.variants.length - 1
        ],
    });
  } catch (error) {
    console.log(error);

    // =====================================================
    // ABORT TRANSACTION
    // =====================================================

    await session.abortTransaction();

    session.endSession();

    // =====================================================
    // DELETE UPLOADED FILES
    // =====================================================

    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((file) => {
        try {
          if (
            file.path &&
            fs.existsSync(file.path)
          ) {
            fs.unlinkSync(file.path);
          }
        } catch (deleteError) {
          console.log(
            "FILE DELETE ERROR:",
            deleteError.message
          );
        }
      });
    }

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Variant add failed",
    });
  }
};

const updateVariant = async (req, res) => {
  const session = await mongoose.startSession();

  let uploadedFiles = [];

  try {
    session.startTransaction();

    const { productId, variantId } =
      req.params;

    const product =
      await Product.findById(
        productId
      ).session(session);

    if (!product) {
      throw new Error(
        "Product not found"
      );
    }

    const variant =
      product.variants.id(
        variantId
      );

    if (!variant) {
      throw new Error(
        "Variant not found"
      );
    }

    uploadedFiles = req.files || [];

    let attributes = {};

    if (req.body.attributes) {
      Object.keys(req.body.attributes).forEach(
        (key) => {
          attributes[key.trim()] =
            String(
              req.body.attributes[key]
            ).trim();
        }
      );
    }

    const updatedSku = req.body.sku
      ? String(req.body.sku)
          .trim()
          .toUpperCase()
      : variant.sku;

    const duplicateVariant =
      product.variants.find(
        (item) =>
          item._id.toString() !==
            variantId &&
          item.sku === updatedSku
      );

    if (duplicateVariant) {
      throw new Error(
        "Variant SKU already exists"
      );
    }

    if (
      req.body.attributes !==
      undefined
    ) {
      variant.attributes = {
        ...attributes,
      };
    }

    if (req.body.sku !== undefined) {
      variant.sku = updatedSku;
    }

    if (
      req.body.purchasePrice !==
      undefined
    ) {
      variant.purchasePrice =
        Number(
          req.body.purchasePrice
        );
    }

    if (
      req.body.sellingPrice !==
      undefined
    ) {
      variant.sellingPrice =
        Number(
          req.body.sellingPrice
        );
    }

    if (
      req.body.stockQuantity !==
      undefined
    ) {
      variant.stockQuantity =
        Number(
          req.body.stockQuantity
        );
    }

    if (
      req.body.status !== undefined
    ) {
      variant.status = String(
        req.body.status
      )
        .trim()
        .toLowerCase();
    }

    if (
      req.body
        .useVariantImages !==
      undefined
    ) {
      variant.useVariantImages =
        String(
          req.body
            .useVariantImages
        ).toLowerCase() === "true";
    }

    if (
      variant.useVariantImages &&
      uploadedFiles.length > 0
    ) {
      if (
        variant.images?.length > 0
      ) {
        variant.images.forEach(
          (imagePath) => {
            try {
              const fullPath =
                path.join(
                  process.cwd(),
                  imagePath
                );

              if (
                fs.existsSync(
                  fullPath
                )
              ) {
                fs.unlinkSync(
                  fullPath
                );
              }
            } catch (error) {
              console.log(error);
            }
          }
        );
      }

      variant.images =
        uploadedFiles.map(
          (file) =>
            `/uploads/products/${file.filename}`
        );
    }

    if (
      !variant.useVariantImages
    ) {
      if (
        variant.images?.length > 0
      ) {
        variant.images.forEach(
          (imagePath) => {
            try {
              const fullPath =
                path.join(
                  process.cwd(),
                  imagePath
                );

              if (
                fs.existsSync(
                  fullPath
                )
              ) {
                fs.unlinkSync(
                  fullPath
                );
              }
            } catch (error) {
              console.log(error);
            }
          }
        );
      }

      variant.images = [];
    }

    await product.save({
      session,
    });

    await session.commitTransaction();

    session.endSession();

    return res.status(200).json({
      success: true,
      message:
        "Variant updated successfully",
      variant,
    });
  } catch (error) {
    console.log(error);

    await session.abortTransaction();

    session.endSession();

    if (uploadedFiles.length > 0) {
      uploadedFiles.forEach((file) => {
        try {
          if (
            file.path &&
            fs.existsSync(file.path)
          ) {
            fs.unlinkSync(file.path);
          }
        } catch (deleteError) {
          console.log(
            deleteError.message
          );
        }
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Variant update failed",
    });
  }
};

const deleteVariant = async (
  req,
  res
) => {
  const session =
    await mongoose.startSession();

  try {
    session.startTransaction();

    const {
      productId,
      variantId,
    } = req.params;

    const product =
      await Product.findById(
        productId
      ).session(session);

    if (!product) {
      throw new Error(
        "Product not found"
      );
    }

    const variant =
      product.variants.id(
        variantId
      );

    if (!variant) {
      throw new Error(
        "Variant not found"
      );
    }

    if (
      variant.images?.length > 0
    ) {
      variant.images.forEach(
        (imagePath) => {
          try {
            const fullPath =
              path.join(
                process.cwd(),
                imagePath
              );

            if (
              fs.existsSync(fullPath)
            ) {
              fs.unlinkSync(fullPath);
            }
          } catch (error) {
            console.log(error);
          }
        }
      );
    }

    variant.deleteOne();

    if (
      product.variants.length ===
      1
    ) {
      product.hasVariants = false;
    }

    await product.save({
      session,
    });

    await session.commitTransaction();

    session.endSession();

    return res.status(200).json({
      success: true,
      message:
        "Variant deleted successfully",
    });
  } catch (error) {
    console.log(error);

    await session.abortTransaction();

    session.endSession();

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Variant delete failed",
    });
  }
};

 const getProductsByCategory =
  async (req, res) => {
    try {
      const { categoryId } = req.params;

      const products =
        await Product.find({
          category: categoryId,
        })
          .populate("category")
          .populate("vendor")
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        count: products.length,
        products,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Fetch failed",
      });
    }
  };

const getProductsByDepartment =
  async (req, res) => {
    try {
      const { department } = req.params;

      const categories =
        await Category.find({
          department,
        });

      const categoryIds = categories.map(
        (cat) => cat._id
      );

      const products =
        await Product.find({
          category: {
            $in: categoryIds,
          },
        })
          .populate("category")
          .populate("vendor");

      return res.status(200).json({
        success: true,
        count: products.length,
        products,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Fetch failed",
      });
    }
  };



 const getSingleProduct = async (
  req,
  res
) => {
  try {
    const { productId } = req.params;

    const product =
      await Product.findById(productId)
        .populate("category")
        .populate("vendor");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Fetch failed",
    });
  }
};
const getAllVariants = async (
  req,
  res
) => {
  try {
    const { productId } =
      req.params;

    const product =
      await Product.findById(
        productId
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found",
      });
    }

    return res.status(200).json({
      success: true,

      count:
        product.variants.length,

      variants:
        product.variants,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,

      message:
        "Fetch variants failed",
    });
  }
};
 const getSingleVariant = async (
  req,
  res
) => {
  try {
    const { productId, variantId } =
      req.params;

    const product =
      await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const variant =
      product.variants.id(variantId);

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Variant not found",
      });
    }

    return res.status(200).json({
      success: true,
      variant,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Fetch failed",
    });
  }
};
export {createProduct,updateProduct,deleteProduct,addVariant,updateVariant,deleteVariant,getProductsByCategory,getProductsByDepartment,getSingleProduct,getAllVariants ,getSingleVariant}