import express from 'express';
import {
    createLeaderboardEntry,
    getAllLeaderboardEntries,
    getLeaderboardEntryById,
    updateLeaderboardEntry,
    deleteLeaderboardEntry,
} from '../controllers/leaderboardController.js';

const router = express.Router();

// Define routes
router.post('/', createLeaderboardEntry); // Create a new leaderboard entry
router.get('/', getAllLeaderboardEntries); // Get all leaderboard entries
router.get('/:id', getLeaderboardEntryById); // Get a specific leaderboard entry by ID
router.put('/:id', updateLeaderboardEntry); // Update a leaderboard entry
router.delete('/:id', deleteLeaderboardEntry); // Delete a leaderboard entry

export default router;
