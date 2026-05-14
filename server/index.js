import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./mongoDb/connectDb.js";
import superAdminRouter from "./router/admin/superAdminRouter.js";
import adminRouter from "./router/admin/adminRouter.js";
import vendorRouter from "./router/admin/vendorRouter.js";
import categoryRouter from "./router/admin/categoryRouter.js";
import productRouter from "./router/admin/productRouter.js";

dotenv.config();
connectDB();
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
    res.send("Api is running...");
})
app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);
app.use("/api/v1/super-admin",superAdminRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/vendor",vendorRouter);
app.use("/api/v1/category",categoryRouter);
app.use("/api/v1/product",productRouter)

const PORT=process.env.PORT || 8000
app.listen(PORT,()=>{
  console.log(`✅ Server running on port:${PORT}`);
})

export default app;