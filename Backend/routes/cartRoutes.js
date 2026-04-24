import express from "express";
import { getCart, addToCart, updateQuantity, removeFromCart } from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(protect);
router.get("/", getCart);
router.post("/", addToCart);
router.put("/", updateQuantity);
router.delete("/:productId", removeFromCart);

export default router;
