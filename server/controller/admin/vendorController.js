
import mongoose from "mongoose";
import Vendor from "../../model/admin/vendorModel.js";

import {
  validateEmail,
  validatePhoneNumber,
} from "../../utils/validator.js";

const createVendor = async (req, res) => {
  try {
    const {
      storeName,
      ownerName,
      email,
      phoneNumber,
      businessLicenseNumber,
      address,
      notes,
    } = req.body;
    if (
      !storeName ||
      !ownerName ||
      !email ||
      !phoneNumber ||
      !businessLicenseNumber ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All required fields must be provided",
      });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (!validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    const existingVendor =
      await Vendor.findOne({
        $or: [
          { email },
          { phoneNumber },
          { businessLicenseNumber },
        ],
      });

    if (existingVendor) {
      return res.status(409).json({
        success: false,
        message:
          "Vendor already exists",
      });
    }
    const vendor = await Vendor.create({
      storeName,
      ownerName,
      email,
      phoneNumber,
      businessLicenseNumber,
      address,
      notes,
    });

    return res.status(201).json({
      success: true,
      message:
        "Vendor created successfully",
      data: vendor,
    });
  } catch (error) {
    console.error(
      "CREATE VENDOR ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
};

const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid vendor ID",
      });
    }

    const vendor =
      await Vendor.findById(id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    const {
      storeName,
      ownerName,
      email,
      phoneNumber,
      businessLicenseNumber,
      address,
      notes,
    } = req.body;

    if (storeName)
      vendor.storeName = storeName;

    if (ownerName)
      vendor.ownerName = ownerName;

    if (email) {
      if (!validateEmail(email)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid email format",
        });
      }

      vendor.email = email;
    }

    if (phoneNumber) {
      if (
        !validatePhoneNumber(
          phoneNumber
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid phone number",
        });
      }

      vendor.phoneNumber =
        phoneNumber;
    }

    if (businessLicenseNumber)
      vendor.businessLicenseNumber =
        businessLicenseNumber;

    if (address)
      vendor.address = address;

    if (notes !== undefined)
      vendor.notes = notes;

    await vendor.save();

    return res.status(200).json({
      success: true,
      message:
        "Vendor updated successfully",
      data: vendor,
    });
  } catch (error) {
    console.error(
      "UPDATE VENDOR ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
};

const toggleVendorVerification =
  async (req, res) => {
    try {
      const { id } = req.params;
      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid vendor ID",
        });
      }

      const { isVerified } =
        req.body;

      const vendor =
        await Vendor.findById(id);

      if (!vendor) {
        return res.status(404).json({
          success: false,
          message:
            "Vendor not found",
        });
      }

      vendor.isVerified =
        isVerified;

      await vendor.save();

      return res.status(200).json({
        success: true,
        message: isVerified
          ? "Vendor verified successfully"
          : "Vendor unverified successfully",
        data: vendor,
      });
    } catch (error) {
      console.error(
        "VERIFY VENDOR ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Internal server error",
      });
    }
  };

const toggleVendorSuspension =
  async (req, res) => {
    try {
      const { id } = req.params;
      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid vendor ID",
        });
      }

      const { isSuspended } =
        req.body;

      const vendor =
        await Vendor.findById(id);

      if (!vendor) {
        return res.status(404).json({
          success: false,
          message:
            "Vendor not found",
        });
      }

      vendor.isSuspended =
        isSuspended;

      await vendor.save();

      return res.status(200).json({
        success: true,
        message: isSuspended
          ? "Vendor suspended successfully"
          : "Vendor unsuspended successfully",
        data: vendor,
      });
    } catch (error) {
      console.error(
        "SUSPEND VENDOR ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Internal server error",
      });
    }
  };

const deleteVendor = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid vendor ID",
      });
    }

    const deletedVendor =
      await Vendor.findByIdAndDelete(id);

    if (!deletedVendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Vendor deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE VENDOR ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
};

export {
  createVendor,
  updateVendor,
  toggleVendorVerification,
  toggleVendorSuspension,
  deleteVendor,
};