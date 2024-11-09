import express from 'express';
import {
    createApplication,
    getAllApplications,
    getApplicationById,
    updateApplication,
    deleteApplication,
    deleteAllApplications,
    updateApplicationStatus,
    scheduleInterview,
    getApplicationsByHrStaffId, // Added this import for HR-specific route
    completeInterview,
    cancelInterview
} from '../controllers/applicationController.js';

const router = express.Router();

// Application Routes
router.post('/', createApplication); // Create a new application
router.get('/', getAllApplications); // Get all applications
router.get('/:id', getApplicationById); // Get a specific application by ID
router.put('/:id', updateApplication); // Update an application
router.delete('/:id', deleteApplication); // Delete an application
router.delete('/', deleteAllApplications); // Delete all applications

// Application Status Update
router.patch('/:id/status', updateApplicationStatus); // Update application status

// Interview Scheduling and Status
router.patch('/:id/interview/schedule', scheduleInterview); // Schedule an interview
router.patch('/:id/interview/complete', completeInterview); // Mark interview as completed
router.patch('/:id/interview/cancel', cancelInterview); // Cancel an interview

// HR-Specific Route
router.get('/hr/:hrStaffId/scheduled-interviews', getApplicationsByHrStaffId); // Get scheduled interviews for a specific HR staff

export default router;
