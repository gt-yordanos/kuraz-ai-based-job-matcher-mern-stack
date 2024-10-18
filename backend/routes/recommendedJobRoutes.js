// backend/routes/recommendedJobRoutes.js
import express from 'express';
import {
    getRecommendedJobs,
    addRecommendedJob,
    updateRecommendedJob,
    deleteRecommendedJob,
} from '../controllers/recommendedJobController.js';

const router = express.Router();

// Define routes
router.get('/', getRecommendedJobs); // Get all recommended jobs
router.post('/', addRecommendedJob); // Add a new recommended job
router.put('/:id', updateRecommendedJob); // Update a recommended job
router.delete('/:id', deleteRecommendedJob); // Delete a recommended job

export default router;
