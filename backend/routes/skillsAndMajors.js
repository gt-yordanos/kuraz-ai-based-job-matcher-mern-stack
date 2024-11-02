// backend/routes/skillsAndMajors.js
import express from 'express';
import { getSkillsAndMajors } from '../controllers/skillsAndMajorsController.js';

const router = express.Router();

// Route to get soft skills, hard skills, and majors
router.get('/', getSkillsAndMajors);

export default router;
