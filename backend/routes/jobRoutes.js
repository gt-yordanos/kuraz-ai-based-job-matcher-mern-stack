// backend/routes/jobRoutes.js
import express from 'express';
import {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    searchJobsByTitle,
} from '../controllers/jobController.js';

const router = express.Router();

// Define routes
router.post('/', createJob); // Create a new job
router.get('/', getAllJobs); // Get all jobs
router.get('/search', searchJobsByTitle); // Search jobs by title
router.get('/:id', getJobById); // Get a specific job by ID
router.put('/:id', updateJob); // Update a job
router.delete('/:id', deleteJob); // Delete a job

export default router;
