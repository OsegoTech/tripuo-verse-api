import Category from "../models/CategoriesModel.js";
import expressAsyncHandler from "express-async-handler";
// import cloudinary from "../utils/cloudinary.js";
import multer from "multer";

const storage = multer.diskStorage({});
const upload = multer({ storage });

const createCategory = expressAsyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  const image = req.file.path;
  try {
    
  } catch (error) {
    
  }
});

const getCategories = expressAsyncHandler(async (req, res, next) => {
  const categories = await Category.find({});
  res.json(categories);
});

const getCategoryById = expressAsyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
});

const updateCategory = expressAsyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    category.name = req.body.name || category.name;
    category.image = req.body.image || category.image;
    category.description = req.body.description || category.description;
    const updatedCategory = await category.save();
    res.json({
      _id: updatedCategory._id,
      name: updatedCategory.name,
      image: updatedCategory.image,
      description: updatedCategory.description,
    });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

const deleteCategory = expressAsyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await category.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
