import { Router } from "express";
import { registerSuperAdmin,loginSuperAdmin,deleteSuperAdmin } from "../../controller/admin/superAdminController.js";
const superAdminRouter=Router();
superAdminRouter.route("/register").post(registerSuperAdmin);
superAdminRouter.route("/login").post(loginSuperAdmin);
superAdminRouter.route("/delete/:id").delete(deleteSuperAdmin)
export default superAdminRouter;