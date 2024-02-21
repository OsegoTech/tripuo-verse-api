import express from "express";
import { updateMe, deleteMe, getAllUsers, getUser, getUsersCount } from "../controllers/userController.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.patch("/updateMe", protect, updateMe);
router.delete("/deleteMe", protect, deleteMe);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.get("/usersCount", getUsersCount);

export default router;
