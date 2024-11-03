import express from 'express';
import {
    createApplication,
    getAllApplications,
    getApplicationById,
    updateApplication,
    deleteApplication,
    updateApplicationStatus,
    scheduleInterview,
    completeInterview,
    cancelInterview,
    deleteAllApplications
} from '../controllers/applicationController.js';

const router = express.Router();

// Routes for application
router.post('/', createApplication); // Create a new application
router.get('/', getAllApplications); // Get all applications
router.get('/:id', getApplicationById); // Get an application by ID
router.put('/:id', updateApplication); // Update an application
router.delete('/:id', deleteApplication); // Delete an application
router.delete('/', deleteAllApplications); //
// Update application status (Accepted, Rejected, etc.)
router.patch('/:id/status', updateApplicationStatus); // Update application status
// Schedule an interview
router.patch('/:id/interview/schedule', scheduleInterview); // Schedule an interview
// Complete an interview
router.patch('/:id/interview/complete', completeInterview); // Mark interview as completed
// Cancel an interview
router.patch('/:id/interview/cancel', cancelInterview); // Cancel an interview
 
export default router;
