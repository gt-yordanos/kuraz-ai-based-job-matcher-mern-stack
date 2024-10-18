// routes/authRoutes.js
import express from 'express';
import { loginUser } from '../controllers/authController.js';

const router = express.Router();

// User login route (for both applicants and HR)
router.post('/login', loginUser);

export default router;
