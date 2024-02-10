import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  upload,
  latestProducts,
  // resizeProductPhoto,
} from "../controllers/ProductController.js";

const router = express.Router();

router.route("/").get(getProducts);
router.get("/latest-products", latestProducts);
router.post("/", upload.single("image"), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .delete(deleteProduct)
  .put(updateProduct);

export default router;
