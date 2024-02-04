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

const router = express.Router();

router.route("/").get(getProducts);
router.post(
  "/",
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
