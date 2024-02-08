import express from "express";
import { updateMe, deleteMe, getAllUsers } from "../controllers/userController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.patch("/updateMe", protect, updateMe);
router.delete("/deleteMe", protect, deleteMe);
router.get("/", getAllUsers);

export default router;
