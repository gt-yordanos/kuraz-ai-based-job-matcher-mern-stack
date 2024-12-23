import express from 'express';
import {
    createApplicant,
    loginApplicant,
    getAllApplicants,
    getApplicantById,
    updateApplicant,
    deleteApplicant,
    searchApplicantsByName,
} from '../controllers/applicantController.js';

const router = express.Router();

// Define routes
router.post('/', createApplicant); // Create a new applicant
router.post('/login', loginApplicant); // Login an applicant
router.get('/', getAllApplicants); // Get all applicants
router.get('/search', searchApplicantsByName); // Search applicants by name
router.get('/:id', getApplicantById); // Get a specific applicant by ID
router.put('/:id', updateApplicant); // Update an applicant
router.delete('/:id', deleteApplicant); // Delete an applicant

export default router;
