import { Router } from "express";
import{createCategory,getAllCategories,getSingleCategory,updateCategory,deleteCategory} from "../../controller/admin/categoryController.js";
const categoryRouter = Router();
categoryRouter.route("/create").post(createCategory);
categoryRouter.route("/all-categories").get(getAllCategories);
categoryRouter.route("/category/:id").get(getSingleCategory);
categoryRouter.route("/update/:id").patch(updateCategory);
categoryRouter.route("/delete/:id").delete(deleteCategory);
export default categoryRouter;