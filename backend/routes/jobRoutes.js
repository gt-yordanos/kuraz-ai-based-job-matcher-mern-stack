import express from 'express';
import {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    deleteAllJobs, // Import the new controller method
    searchJobsByTitle,
    getJobsByHrStaffId,
} from '../controllers/jobController.js';

const router = express.Router();

// Define routes
router.post('/', createJob); // Create a new job
router.get('/', getAllJobs); // Get all jobs
router.get('/search', searchJobsByTitle); // Search jobs by title
router.get('/:id', getJobById); // Get a specific job by ID
router.put('/:id', updateJob); // Update a job
router.delete('/:id', deleteJob);
router.delete('/', deleteAllJobs); // Delete all jobs
router.get('/hrStaff/:hrStaffId', getJobsByHrStaffId); // Get jobs by HR staff ID

export default router;
