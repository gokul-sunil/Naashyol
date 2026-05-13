import {Router} from "express";
import {registerAdmin,loginAdmin,verifyAdmin2FA,toggleAdminLogin,toggleAdmin2FA,getAdminLastSeen,deleteAdmin} from "../../controller/admin/adminController.js";
const adminRouter=Router();
adminRouter.route("/register").post(registerAdmin);
adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/verify-2fa").post(verifyAdmin2FA);
adminRouter.route("/toggle-login/:id").patch(toggleAdminLogin);//admin id
adminRouter.route("/toggle-2fa/:id").patch(toggleAdmin2FA);//admin id
adminRouter.route("/last-seen/:id").get(getAdminLastSeen);//admin id
adminRouter.route("/delete/:id").delete(deleteAdmin);

export default adminRouter;