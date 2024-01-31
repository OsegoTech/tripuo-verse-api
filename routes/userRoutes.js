import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  getUserStats,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.route("/:id").put(updateUser).delete(deleteUser).get(getUserById);


export default router;
