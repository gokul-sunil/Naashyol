// authentication controller

import SuperAdmin from "../../model/admin/superAdminModel.js";

import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../utils/validator.js";

const registerSuperAdmin = async (req, res) => {
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

    const existingAdmin = await SuperAdmin.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Super admin already exists",
      });
    }

    const superAdmin = await SuperAdmin.create({
      fullName,
      email,
      password,
      phoneNumber,
    });
   const accessToken = superAdmin.generateAccessToken();

const refreshToken = superAdmin.generateRefreshToken();

    return res.status(201).json({
      success: true,
      message: "Super admin registered successfully",
     tokens: {
    accessToken,
    refreshToken,
  },
      data: superAdmin,
    });
  } catch (error) {
    console.error("REGISTER SUPER ADMIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    
    const superAdmin = await SuperAdmin.findOne({
      email,
    }).select("+password");

    if (!superAdmin) {
      return res.status(404).json({
        success: false,
        message: "Super admin not found",
      });
    }


    const isPasswordMatched =
      await superAdmin.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

 
    const token = superAdmin.generateAuthToken();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: superAdmin._id,
        fullName: superAdmin.fullName,
        email: superAdmin.email,
        phoneNumber: superAdmin.phoneNumber,
        role: superAdmin.role,
      },
    });
  } catch (error) {
    console.error("LOGIN SUPER ADMIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

 const deleteSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAdmin =
      await SuperAdmin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Super admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Super admin deleted successfully",
    });
  } catch (error) {
    console.error("DELETE SUPER ADMIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export {registerSuperAdmin,loginSuperAdmin,deleteSuperAdmin};