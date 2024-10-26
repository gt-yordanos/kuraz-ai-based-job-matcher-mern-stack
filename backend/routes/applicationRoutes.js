import express from 'express';
import {
    createApplication,
    getAllApplications,
    getApplicationById,
    updateApplication,
    deleteApplication,
} from '../controllers/applicationController.js';
import { validateApplication } from '../middleware/validationMiddleware.js'; // Import the validation middleware

const router = express.Router();

// Define routes with validation middleware for createApplication
router.post('/', validateApplication, createApplication); // Create a new application
router.get('/', getAllApplications); // Get all applications
router.get('/:id', getApplicationById); // Get a specific application by ID
router.put('/:id', validateApplication, updateApplication); // Update an application
router.delete('/:id', deleteApplication); // Delete an application

export default router;
