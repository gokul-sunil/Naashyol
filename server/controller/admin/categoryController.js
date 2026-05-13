import Category from "../../model/admin/categoryModel.js";

 const createCategory = async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      department,
      icon,
      status,
    } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Name and slug are required",
      });
    }

    const existingCategory = await Category.findOne({
      $or: [{ name }, { slug }],
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name,
      slug,
      description,
      department,
      icon,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log("CREATE CATEGORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create category",
    });
  }
};

 const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.log("GET CATEGORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

 const getSingleCategory = async (req, res) => {
  try {
    const { id:categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.log("GET SINGLE CATEGORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch category",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const {id:categoryId } = req.params;

    const {
      name,
      slug,
      description,
      department,
      icon,
      status,
    } = req.body;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // prevent duplicate slug
    if (slug) {
      const existingSlug = await Category.findOne({
        slug,
        _id: { $ne: categoryId },
      });

      if (existingSlug) {
        return res.status(400).json({
          success: false,
          message: "Slug already exists",
        });
      }
    }

    category.name = name || category.name;
    category.slug = slug || category.slug;
    category.description =
      description !== undefined
        ? description
        : category.description;

    category.department =
      department || category.department;

    category.icon =
      icon !== undefined ? icon : category.icon;

    category.status =
      status || category.status;

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log("UPDATE CATEGORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update category",
    });
  }
};

 const deleteCategory = async (req, res) => {
  try {
    const { id:categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await category.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("DELETE CATEGORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
    });
  }
};
 export {createCategory,getAllCategories,getSingleCategory,updateCategory,deleteCategory}