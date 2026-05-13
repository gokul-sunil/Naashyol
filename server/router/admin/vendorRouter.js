import {Router} from "express";
import {createVendor,updateVendor,toggleVendorVerification,toggleVendorSuspension,deleteVendor} from "../../controller/admin/vendorController.js";  
const vendorRouter=Router();
vendorRouter.route("/create").post(createVendor);
vendorRouter.route("/update/:id").patch(updateVendor);
vendorRouter.route("/verify/:id").patch(toggleVendorVerification);
vendorRouter.route("/suspend/:id").patch(toggleVendorSuspension);
vendorRouter.route("/delete/:id").delete(deleteVendor); 

export default vendorRouter;