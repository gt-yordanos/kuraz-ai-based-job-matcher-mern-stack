import express from 'express';
import { updateLeaderboard, getLeaderboard } from '../controllers/leaderboardController.js';

const router = express.Router();

// Route to update the leaderboard for a specific job
router.post('/update/:jobId', updateLeaderboard);

// Route to get the leaderboard for a specific job
router.get('/:jobId', getLeaderboard);

export default router;
