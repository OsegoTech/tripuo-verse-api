import express from "express";
import {
  createService,
  deleteService,
  getServiceByUser,
  getServices,
  getSingleservice,
  latestServices,
  upload,
} from "../controllers/ServiceController.js";
import { protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), createService);
router.get("/", getServices);
router.get("/latest-services", latestServices).get("/services-by-user", protect, getServiceByUser);
router
  .get("/:id", getSingleservice)
  .delete("/:id", protect, restrictTo("seller", "admin"), deleteService);

export default router;
