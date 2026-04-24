import Vendor from "../models/Vendor.js";

// ─────────────────────────────────────────
//  VENDOR SELF-SERVICE
// ─────────────────────────────────────────

/**
 * POST /api/vendors/register
 * Create a vendor profile for the logged-in user.
 */
export const registerVendor = async (req, res) => {
  try {
    const existing = await Vendor.findOne({ owner: req.user._id });
    if (existing) {
      return res.status(400).json({ message: "Vendor profile already exists." });
    }

    const { storeName, description, phone, email, address } = req.body;

    const vendor = await Vendor.create({
      owner: req.user._id,
      storeName,
      description,
      phone,
      email,
      address,
    });

    res.status(201).json({ message: "Vendor registered successfully.", vendor });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/**
 * GET /api/vendors/my-profile
 * Get the logged-in vendor's own profile.
 */
export const getMyVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ owner: req.user._id }).populate(
      "owner",
      "name email"
    );

    if (!vendor) {
      return res.status(404).json({ message: "Vendor profile not found." });
    }

    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/**
 * PUT /api/vendors/my-profile
 * Update the logged-in vendor's own profile.
 */
export const updateMyVendorProfile = async (req, res) => {
  try {
    const allowedFields = ["storeName", "description", "phone", "email", "address"];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const vendor = await Vendor.findOneAndUpdate(
      { owner: req.user._id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: "Vendor profile not found." });
    }

    res.status(200).json({ message: "Profile updated.", vendor });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// ─────────────────────────────────────────
//  PUBLIC
// ─────────────────────────────────────────

/**
 * GET /api/vendors
 * List all approved vendors (public).
 */
export const getAllApprovedVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({ approvalStatus: "approved" })
      .select("storeName description phone email address totalRevenue createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/**
 * GET /api/vendors/:id
 * Get a single approved vendor by ID (public).
 */
export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      _id: req.params.id,
      approvalStatus: "approved",
    }).populate("owner", "name email");

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found." });
    }

    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// ─────────────────────────────────────────
//  ADMIN ONLY
// ─────────────────────────────────────────

/**
 * GET /api/vendors/admin/all
 * Get all vendors with any approval status (admin only).
 */
export const adminGetAllVendors = async (req, res) => {
  try {
    const { status } = req.query; // optional filter: ?status=pending
    const filter = status ? { approvalStatus: status } : {};

    const vendors = await Vendor.find(filter)
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/**
 * PATCH /api/vendors/admin/:id/approval
 * Approve or reject a vendor (admin only).
 * Body: { status: "approved" | "rejected" }
 */
export const adminUpdateApprovalStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { approvalStatus: status },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found." });
    }

    res.status(200).json({ message: `Vendor ${status}.`, vendor });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/**
 * DELETE /api/vendors/admin/:id
 * Delete a vendor profile (admin only).
 */
export const adminDeleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found." });
    }

    res.status(200).json({ message: "Vendor deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

/**
 * PATCH /api/vendors/admin/:id/revenue
 * Manually update totalRevenue for a vendor (admin only).
 * Body: { amount: Number }
 */
export const adminUpdateRevenue = async (req, res) => {
  try {
    const { amount } = req.body;

    if (typeof amount !== "number") {
      return res.status(400).json({ message: "Amount must be a number." });
    }

    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { $inc: { totalRevenue: amount } },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found." });
    }

    res.status(200).json({ message: "Revenue updated.", vendor });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};



