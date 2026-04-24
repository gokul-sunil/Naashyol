import asyncHandler from "express-async-handler";
import Banner from "../models/Banner.js";

export const getBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({ isActive: true }).sort({ sortOrder: 1 });
  res.json(banners);
});
