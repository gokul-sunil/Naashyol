

import Admin from "../../model/admin/adminModel.js";

import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../utils/validator.js";

const registerAdmin = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      role,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !password ||
      !phoneNumber ||
      !role
    ) {
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
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists",
      });
    }
    const admin = await Admin.create({
      fullName,
      email,
      password,
      phoneNumber,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: admin,
    });
  } catch (error) {
    console.error("REGISTER ADMIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email,
    }).select("+password +emailOTP +otpExpiresAt");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (!admin.isLoginAllowed) {
      return res.status(403).json({
        success: false,
        message:
          "Login disabled by Super Admin",
      });
    }


    const isPasswordMatched =
      await admin.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    admin.lastActiveAt = new Date();


    if (admin.isTwoFactorEnabled) {
      const otp = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      admin.emailOTP = otp;

      admin.otpExpiresAt = new Date(
        Date.now() + 5 * 60 * 1000
      );

      await admin.save();



      return res.status(200).json({
        success: true,
        twoFactorRequired: true,
        message:
          "OTP sent to registered email",
      });
    }

    await admin.save();


    const accessToken =
      admin.generateAccessToken();

    const refreshToken =
      admin.generateRefreshToken();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      tokens: {
        accessToken,
        refreshToken,
      },
      data: admin,
    });
  } catch (error) {
    console.error("LOGIN ADMIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const verifyAdmin2FA = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const admin = await Admin.findOne({
      email,
    }).select("+emailOTP +otpExpiresAt");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    if (
      admin.emailOTP !== otp ||
      admin.otpExpiresAt < new Date()
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }
    admin.emailOTP = null;
    admin.otpExpiresAt = null;

    admin.lastActiveAt = new Date();

    await admin.save();

    const accessToken =
      admin.generateAccessToken();

    const refreshToken =
      admin.generateRefreshToken();

    return res.status(200).json({
      success: true,
      message: "2FA verification successful",
      tokens: {
        accessToken,
        refreshToken,
      },
      data: admin,
    });
  } catch (error) {
    console.error("VERIFY 2FA ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const toggleAdminLogin = async (req, res) => {
  try {
    const { id } = req.params;

    const { isLoginAllowed } = req.body;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    admin.isLoginAllowed =
      isLoginAllowed;

    await admin.save();

    return res.status(200).json({
      success: true,
      message:
        isLoginAllowed
          ? "Admin login enabled"
          : "Admin login disabled",
      data: admin,
    });
  } catch (error) {
    console.error(
      "TOGGLE ADMIN LOGIN ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const toggleAdmin2FA = async (req, res) => {
  try {
    const { id } = req.params;

    const { isTwoFactorEnabled } =
      req.body;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    admin.isTwoFactorEnabled =
      isTwoFactorEnabled;

    await admin.save();

    return res.status(200).json({
      success: true,
      message:
        isTwoFactorEnabled
          ? "2FA enabled successfully"
          : "2FA disabled successfully",
      data: admin,
    });
  } catch (error) {
    console.error(
      "TOGGLE ADMIN 2FA ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAdminLastSeen = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(
      id
    ).select(
      "fullName email role lastActiveAt"
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
        lastSeen:
          admin.lastActiveAt,
      },
    });
  } catch (error) {
    console.error(
      "GET ADMIN LAST SEEN ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAdmin =
      await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Admin deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE ADMIN ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  registerAdmin,
  loginAdmin,
  verifyAdmin2FA,
  toggleAdminLogin,
  toggleAdmin2FA,
  getAdminLastSeen,
  deleteAdmin,
};