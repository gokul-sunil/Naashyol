import Product from "../../model/admin/productModel.js";
import Category from "../../model/admin/categoryModel.js";

 const createProduct = async (
  req,
  res
) => {
  try {
    const {
      productName,
      sku,
      category,
      vendor,
      price,
      stockQuantity,
      paidAmount,
      status,
      description,
      hasVariants,
    } = req.body;

    const existingProduct =
      await Product.findOne({
        sku,
      });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "SKU already exists",
      });
    }

    const imagePaths = req.files.map(
      (file) => file.path
    );

    const product = await Product.create({
      productName,
      sku,
      category,
      vendor,
      price,
      stockQuantity,
      paidAmount,
      status,
      description,
      hasVariants,
      images: imagePaths,
    });

    return res.status(201).json({
      success: true,
      message: "Product created",
      product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Create product failed",
    });
  }
};

 const updateProduct = async (
  req,
  res
) => {
  try {
    const { productId } = req.params;

    const product =
      await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const fields = [
      "productName",
      "sku",
      "category",
      "vendor",
      "price",
      "stockQuantity",
      "paidAmount",
      "status",
      "description",
      "hasVariants",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    if (req.files?.length > 0) {
      const imagePaths = req.files.map(
        (file) => file.path
      );

      product.images = imagePaths;
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated",
      product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};

const deleteProduct = async (
  req,
  res
) => {
  try {
    const { productId } = req.params;

    const product =
      await Product.findByIdAndDelete(
        productId
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};
const addVariant = async (req, res) => {
  try {
    const { productId } = req.params;

    const product =
      await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const useVariantImages =
      req.body.useVariantImages === "true";

    let imagePaths = [];

    if (
      useVariantImages &&
      req.files?.length > 0
    ) {
      imagePaths = req.files.map(
        (file) => file.path
      );
    }

    const variant = {
      name: req.body.name,
      value: req.body.value,
      sku: req.body.sku,
      price: req.body.price,
      stockQuantity:
        req.body.stockQuantity,
      status: req.body.status,
      useVariantImages,
      images: imagePaths,
    };

    product.variants.push(variant);

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Variant added",
      variants: product.variants,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Variant add failed",
    });
  }
};

const updateVariant = async (
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

    const fields = [
      "name",
      "value",
      "sku",
      "price",
      "stockQuantity",
      "status",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        variant[field] = req.body[field];
      }
    });

    if (
      req.body.useVariantImages !==
      undefined
    ) {
      variant.useVariantImages =
        req.body.useVariantImages ===
        "true";
    }

    if (
      variant.useVariantImages &&
      req.files?.length > 0
    ) {
      variant.images = req.files.map(
        (file) => file.path
      );
    }

    if (!variant.useVariantImages) {
      variant.images = [];
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Variant updated",
      variant,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Variant update failed",
    });
  }
};

 const deleteVariant = async (
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

    variant.deleteOne();

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Variant deleted",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Variant delete failed",
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
export {createProduct,updateProduct,deleteProduct,addVariant,updateVariant,deleteVariant,getProductsByCategory,getProductsByDepartment,getSingleProduct,getSingleVariant}