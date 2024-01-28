import Product from "../models/ProductsModel.js";
import asyncHandler from "express-async-handler";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";

const storage = multer.diskStorage({});
export const upload = multer({ storage });

export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price } = (req.body);
  console.log(req.file);
  const image = req.file.path;
  try {
    // upload image to cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "products",
      width: 400,
      height: 300,
      crop: "fill",
    });
    const newProduct = await Product.create({
      title,
      description,
      price,
      image: result.secure_url,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

export const updateProduct = asyncHandler(async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

export const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

export const getProducts = asyncHandler(async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});
