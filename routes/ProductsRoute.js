import express from "express";
import { verifyTokenAndAdmin } from "../config/verifyToken.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  upload,
  resizeProductPhoto,
} from "../controllers/ProductController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(protect, getProducts);
router.post(
  "/",
  upload.single("image"),
  resizeProductPhoto,
  verifyTokenAndAdmin,
  createProduct
);

router
  .route("/:id")
  .get(getProductById)
  .delete(verifyTokenAndAdmin, deleteProduct)
  .put(verifyTokenAndAdmin, updateProduct);

export default router;
