// backend/routes/analyticsRoutes.js
import express from 'express';
import {
    getAnalyticsData,
    updateAnalyticsData,
} from '../controllers/analyticsController.js';

const router = express.Router();

// Define routes
router.get('/', getAnalyticsData); // Get analytics data
router.put('/', updateAnalyticsData); // Update analytics data

export default router;
