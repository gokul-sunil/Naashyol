import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import attributeRoutes from "./routes/attributeRoutes.js";
import vendorStockRoutes from "./routes/vendorStockRoutes.js";
import referralRoutes from "./routes/referralRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import supportTicketRoutes from "./routes/supportTicketRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import Vendor from "./routes/vendorRoutes.js";

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:3000", // client
      "http://localhost:5173", // admin
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend Running Successfully 🚀" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/attributes", attributeRoutes);
app.use("/api/vendor", Vendor);
app.use("/api/vendor-stock", vendorStockRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/support-tickets", supportTicketRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;