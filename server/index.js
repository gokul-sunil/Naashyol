import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./mongoDb/connectDb.js";

dotenv.config();
connectDB();
const app=express();
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Api is running...");
})
const PORT=process.env.PORT || 8000
app.listen(PORT,()=>{
  console.log(`✅ Server running on port:${PORT}`);
})

export default app;