import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  upload,
  latestProducts,
  getProductsCount,
  getProductsByUser,
  // resizeProductPhoto,
} from "../controllers/ProductController.js";
import {protect} from "../controllers/authController.js"

const router = express.Router();

router.route("/").get(getProducts);
router.get("/latest-products", latestProducts);
router.post("/", protect, upload.single("image"), createProduct);
router.get("/get-products-count", getProductsCount).get("/products-by-user", protect, getProductsByUser);


router
  .route("/:id")
  .get(getProductById)
  .delete(deleteProduct)
  .put(updateProduct);

export default router;
