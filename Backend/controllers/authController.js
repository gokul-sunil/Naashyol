import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import { generateToken } from "../utils/generateToken.js";

export const register = asyncHandler(async (req, res) => {

  await Promise.all([
    body("name").trim().notEmpty().withMessage("Name is required").run(req),
    body("email").isEmail().normalizeEmail().withMessage("Valid email required").run(req),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });

  if (exists) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const user = await User.create({
    name,
    email,
    password,
    role: "user",
  });

  const token = generateToken(user._id);

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });

});


export const login = asyncHandler(async (req, res) => {

  await Promise.all([
    body("email").isEmail().normalizeEmail().run(req),
    body("password").notEmpty().run(req),
  ]);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (user.isBlocked) {
    return res.status(403).json({ message: "Account blocked" });
  }

  const bcrypt = await import("bcryptjs");

  const match = await bcrypt.default.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user._id);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });

});


export const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
});