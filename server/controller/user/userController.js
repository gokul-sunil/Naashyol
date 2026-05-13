import User from "../../model/user/userModel.js";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../utils/validator.js";

// =====================================================
// REGISTER
// =====================================================
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body;

    if (!fullName || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain uppercase, lowercase, number and special character",
      });
    }

    if (!validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email or phone number",
      });
    }

    const user = await User.create({ fullName, email, password, phoneNumber });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      tokens: { accessToken, refreshToken },
      data: user,
    });
  } catch (error) {
    console.error("REGISTER USER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// =====================================================
// LOGIN
// =====================================================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      tokens: { accessToken, refreshToken },
      data: user,
    });
  } catch (error) {
    console.error("LOGIN USER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// =====================================================
// LOGOUT
// =====================================================
const logoutUser = async (req, res) => {
  try {
    // req.user is set by your auth middleware after token verification
    // Logout is handled client-side by discarding the tokens.
    // If you implement a token blacklist or store refresh tokens in DB,
    // invalidate them here.

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("LOGOUT USER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// =====================================================
// GET PROFILE  (protected — requires auth middleware)
// =====================================================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { registerUser, loginUser, logoutUser, getProfile };