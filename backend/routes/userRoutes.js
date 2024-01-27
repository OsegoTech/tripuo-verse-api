import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  getUserStats,
  updateUser,
} from "../controllers/userController.js";
import {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from "../config/verifyToken.js"

const router = express.Router();

router.get("/", getAllUsers);
router
  .route("/:id")
  .put(verifyTokenAndAuthorization, updateUser)
  .delete(verifyTokenAndAdmin, deleteUser)
  .get(verifyTokenAndAdmin, getUserById);

router.get("/stats", verifyTokenAndAdmin, getUserStats);

export default router;
