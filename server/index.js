import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./mongoDb/connectDb.js";
import superAdminRouter from "./router/admin/superAdminRouter.js";

dotenv.config();
connectDB();
const app=express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Api is running...");
})
app.use("/api/v1/super-admin",superAdminRouter);
const PORT=process.env.PORT || 8000
app.listen(PORT,()=>{
  console.log(`✅ Server running on port:${PORT}`);
})

export default app;