import express from 'express';
import {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    searchJobsByTitle,
    getJobsByHrStaffId, // Import the new controller method
} from '../controllers/jobController.js';

const router = express.Router();

// Define routes
router.post('/', createJob); // Create a new job
router.get('/', getAllJobs); // Get all jobs
router.get('/search', searchJobsByTitle); // Search jobs by title
router.get('/:id', getJobById); // Get a specific job by ID
router.put('/:id', updateJob); // Update a job
router.delete('/:id', deleteJob); // Delete a job
router.get('/hrStaff/:hrStaffId', getJobsByHrStaffId); // Get jobs by HR staff ID

export default router;
