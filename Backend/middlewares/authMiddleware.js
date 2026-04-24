// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// /** Verify JWT and set req.user. Use for protected routes. */
// export const protect = async (req, res, next) => {
//   let token = null;
//   if (req.headers.authorization?.startsWith("Bearer ")) {
//     token = req.headers.authorization.split(" ")[1];
//   }
//   console.log(req.headers.authorization);
//   if (!token) {
//     return res.status(401).json({ message: "Not authorized" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) return res.status(401).json({ message: "User not found" });
//     if (user.isBlocked) return res.status(403).json({ message: "Account blocked" });
//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Not authorized" });
//   }
// };

// /** Optional auth: set req.user if token present, else req.user = null. */
// export const optionalAuth = async (req, res, next) => {
//   let token = null;
//   if (req.headers.authorization?.startsWith("Bearer ")) {
//     token = req.headers.authorization.split(" ")[1];
//   }
//   if (!token) {
//     req.user = null;
//     return next();
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select("-password");
//     req.user = user && !user.isBlocked ? user : null;
//   } catch {
//     req.user = null;
//   }
//   next();
// };

// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!req.user || !roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied" });
//     }
//     next();
//   };
// };


import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {

  let token;

  if (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")) {

    token = req.headers.authorization.split(" ")[1];

  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();

  } catch (error) {

    return res.status(401).json({ message: "Token invalid" });

  }

};

export const authorize = (...roles) => {

  return (req, res, next) => {

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();

  };

};