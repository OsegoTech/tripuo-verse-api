import express from 'express';
import { updateMe } from '../controllers/userController.js';
import { protect } from '../controllers/authController.js';

const router = express.Router();

router.patch('/updateMe', protect, updateMe);

export default router;


