import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
} from "../../controller/user/userController.js";
import { verifyToken } from "../../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyToken, logoutUser);   // protected
userRouter.route("/profile").get(verifyToken, getProfile);  // protected

export default userRouter;