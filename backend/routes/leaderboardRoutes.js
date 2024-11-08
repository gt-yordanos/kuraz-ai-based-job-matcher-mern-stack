import express from 'express';
import { updateLeaderboard, getLeaderboard } from '../controllers/leaderboardController.js';

const router = express.Router();

// Route to update the leaderboard for a specific job
router.post('/update', updateLeaderboard);  // Now uses POST without jobId in the URL

// Route to get the leaderboard for a specific job (unchanged)
router.get('/:jobId', getLeaderboard);

export default router;
