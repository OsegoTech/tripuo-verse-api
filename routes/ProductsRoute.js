import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  upload,
  // resizeProductPhoto,
} from "../controllers/ProductController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(getProducts);
router.post(
  "/",
  protect,
  upload.single("image"),
  // resizeProductPhoto,

  createProduct
);

router
  .route("/:id")
  .get(getProductById)
  .delete(deleteProduct)
  .put(updateProduct);

export default router;
