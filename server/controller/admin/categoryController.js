import Category from "../../model/admin/categoryModel.js";

const createCategory = async (req, res) => {
  try {
    let {
      name,
      slug,
      description,
      department,
      icon,
      status,
      suggestedVariantAttributes,
      suggestedSpecifications,
    } = req.body;
    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Name and slug are required",
      });
    }
    slug = slug
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const existingCategory =
      await Category.findOne({
        $or: [
          { name: name.trim() },
          { slug },
        ],
      });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message:
          "Category name or slug already exists",
      });
    }
    if (
      !Array.isArray(
        suggestedVariantAttributes
      )
    ) {
      suggestedVariantAttributes = [];
    }

    const uniqueAttributes = [];

    const attributeNames = new Set();

    for (const attr of suggestedVariantAttributes) {
      if (
        attr?.name &&
        !attributeNames.has(
          attr.name.toLowerCase()
        )
      ) {
        attributeNames.add(
          attr.name.toLowerCase()
        );

        uniqueAttributes.push({
          name: attr.name.trim(),
          values:
            attr.values?.map((v) =>
              v.trim()
            ) || [],
        });
      }
    }
    if (
      !Array.isArray(
        suggestedSpecifications
      )
    ) {
      suggestedSpecifications = [];
    }

    suggestedSpecifications = [
      ...new Set(
        suggestedSpecifications.map((spec) =>
          spec.trim()
        )
      ),
    ];

    const category =
      await Category.create({
        name: name.trim(),
        slug,
        description:
          description?.trim() || "",
        department,
        icon: icon || "",
        status,

        suggestedVariantAttributes:
          uniqueAttributes,

        suggestedSpecifications,
      });

    return res.status(201).json({
      success: true,
      message:
        "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(
      "CREATE CATEGORY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create category",
    });
  }
};

const getAllCategories = async (
  req,
  res
) => {
  try {
    const categories =
      await Category.find().sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.log(
      "GET CATEGORY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch categories",
    });
  }
};

const getSingleCategory = async (
  req,
  res
) => {
  try {
    const { id: categoryId } =
      req.params;

    const category =
      await Category.findById(
        categoryId
      );

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
    console.log(
      "GET SINGLE CATEGORY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch category",
    });
  }
};

const updateCategory = async (
  req,
  res
) => {
  try {
    const { id: categoryId } =
      req.params;

    const category =
      await Category.findById(
        categoryId
      );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    let {
      name,
      slug,
      description,
      department,
      icon,
      status,
      suggestedVariantAttributes,
      suggestedSpecifications,
    } = req.body;

    if (slug) {
      slug = slug
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

      const existingSlug =
        await Category.findOne({
          slug,
          _id: {
            $ne: categoryId,
          },
        });

      if (existingSlug) {
        return res.status(400).json({
          success: false,
          message:
            "Slug already exists",
        });
      }
    }
    if (name)
      category.name = name.trim();

    if (slug)
      category.slug = slug;

    if (description !== undefined) {
      category.description =
        description.trim();
    }

    if (department) {
      category.department =
        department;
    }

    if (icon !== undefined) {
      category.icon = icon;
    }

    if (status) {
      category.status = status;
    }
    if (
      Array.isArray(
        suggestedVariantAttributes
      )
    ) {
      const uniqueAttributes = [];

      const attributeNames =
        new Set();

      for (const attr of suggestedVariantAttributes) {
        if (
          attr?.name &&
          !attributeNames.has(
            attr.name.toLowerCase()
          )
        ) {
          attributeNames.add(
            attr.name.toLowerCase()
          );

          uniqueAttributes.push({
            name: attr.name.trim(),

            values:
              attr.values?.map((v) =>
                v.trim()
              ) || [],
          });
        }
      }

      category.suggestedVariantAttributes =
        uniqueAttributes;
    }
    if (
      Array.isArray(
        suggestedSpecifications
      )
    ) {
      category.suggestedSpecifications =
        [
          ...new Set(
            suggestedSpecifications.map(
              (spec) =>
                spec.trim()
            )
          ),
        ];
    }

    await category.save();

    return res.status(200).json({
      success: true,
      message:
        "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(
      "UPDATE CATEGORY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update category",
    });
  }
};

const deleteCategory = async (
  req,
  res
) => {
  try {
    const { id: categoryId } =
      req.params;

    const category =
      await Category.findById(
        categoryId
      );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await category.deleteOne();

    return res.status(200).json({
      success: true,
      message:
        "Category deleted successfully",
    });
  } catch (error) {
    console.log(
      "DELETE CATEGORY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete category",
    });
  }
};

export {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};