import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const superAdminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // hide password by default
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      default: "super_admin",
      enum: ["super_admin"],
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

// =====================================================
// HASH PASSWORD BEFORE SAVE
// =====================================================
superAdminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// =====================================================
// COMPARE PASSWORD METHOD
// =====================================================
superAdminSchema.methods.comparePassword = async function (
  enteredPassword
) {
  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};

// =====================================================
// GENERATE JWT TOKEN METHOD
// =====================================================
superAdminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    }
  );
};
superAdminSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    }
  );
};
// =====================================================
// REMOVE PASSWORD FROM RESPONSE
// =====================================================
superAdminSchema.methods.toJSON = function () {
  const adminObject = this.toObject();

  delete adminObject.password;

  return adminObject;
};

const SuperAdmin = mongoose.model(
  "SuperAdmin",
  superAdminSchema
);

export default SuperAdmin;