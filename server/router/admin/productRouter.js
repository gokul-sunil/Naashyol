// router/admin/productRouter.js

import { Router } from "express";

import {
  createProduct,
  updateProduct,
  deleteProduct,
  addVariant,
  updateVariant,
  deleteVariant,
  getProductsByCategory,
  getProductsByDepartment,
  getSingleProduct,
  getSingleVariant,
} from "../../controller/admin/productController.js";

import uploadProductImages from "../../middleware/admin/uploadProductImages.js";

const productRouter = Router();

// =====================================================
// PRODUCT
// =====================================================

productRouter.post(
  "/create",
  uploadProductImages.array("images", 5),
  createProduct
);

productRouter.put(
  "/update/:productId",
  uploadProductImages.array("images", 5),
  updateProduct
);

productRouter.delete(
  "/delete/:productId",
  deleteProduct
);

// =====================================================
// VARIANTS
// =====================================================

productRouter.post(
  "/variant/add/:productId",
  uploadProductImages.array("images", 5),
  addVariant
);

productRouter.put(
  "/variant/update/:productId/:variantId",
  uploadProductImages.array("images", 5),
  updateVariant
);

productRouter.delete(
  "/variant/delete/:productId/:variantId",
  deleteVariant
);

// =====================================================
// GET PRODUCTS
// =====================================================

productRouter.get(
  "/category/:categoryId",
  getProductsByCategory
);

productRouter.get(
  "/department/:department",
  getProductsByDepartment
);

productRouter.get(
  "/single/:productId",
  getSingleProduct
);

productRouter.get(
  "/variant/:productId/:variantId",
  getSingleVariant
);

export default productRouter;