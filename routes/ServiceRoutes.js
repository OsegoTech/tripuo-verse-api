import express from "express";
import {
  createService,
  deleteService,
  getServices,
  upload,
} from "../controllers/ServiceController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.post("/", upload.single("image"),  createService);
router.get("/", getServices);
router.get("/:id", getServices).delete("/:id", protect, restrictTo('seller', 'admin'),deleteService);

export default router;
