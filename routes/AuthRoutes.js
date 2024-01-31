import express from "express";
import { signup, login, resetPassword, forgotPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.route("/resetPassword", resetPassword)

router.post("/forgotPassword", forgotPassword); 

export default router;
