import asyncHandler from "express-async-handler";
import Address from "../models/Address.js";

export const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find({ user: req.user._id }).sort({ isDefault: -1, createdAt: -1 });
  res.json(addresses);
});

export const addAddress = asyncHandler(async (req, res) => {
  const { fullName, phone, street, city, state, pincode, isDefault } = req.body;
  if (!fullName || !phone || !street || !city || !state || !pincode) {
    res.status(400);
    throw new Error("All address fields are required");
  }
  if (isDefault) {
    await Address.updateMany({ user: req.user._id }, { isDefault: false });
  }
  const address = await Address.create({
    user: req.user._id,
    fullName,
    phone,
    street,
    city,
    state,
    pincode,
    isDefault: !!isDefault,
  });
  res.status(201).json(address);
});

export const updateAddress = asyncHandler(async (req, res) => {
  const address = await Address.findOne({ _id: req.params.id, user: req.user._id });
  if (!address) {
    res.status(404);
    throw new Error("Address not found");
  }
  const { fullName, phone, street, city, state, pincode, isDefault } = req.body;
  if (fullName != null) address.fullName = fullName;
  if (phone != null) address.phone = phone;
  if (street != null) address.street = street;
  if (city != null) address.city = city;
  if (state != null) address.state = state;
  if (pincode != null) address.pincode = pincode;
  if (isDefault === true) {
    await Address.updateMany({ user: req.user._id }, { isDefault: false });
    address.isDefault = true;
  }
  await address.save();
  res.json(address);
});

export const deleteAddress = asyncHandler(async (req, res) => {
  const deleted = await Address.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!deleted) {
    res.status(404);
    throw new Error("Address not found");
  }
  res.json({ message: "Address deleted" });
});
