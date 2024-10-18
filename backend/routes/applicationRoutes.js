import express from 'express';
import {
    createApplication,
    getAllApplications,
    getApplicationById,
    updateApplication,
    deleteApplication,
} from '../controllers/applicationController.js';

const router = express.Router();

// Define routes
router.post('/', createApplication); // Create a new application
router.get('/', getAllApplications); // Get all applications
router.get('/:id', getApplicationById); // Get a specific application by ID
router.put('/:id', updateApplication); // Update an application
router.delete('/:id', deleteApplication); // Delete an application

export default router;
