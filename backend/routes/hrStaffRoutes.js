import express from 'express';
import {
    registerHrStaff,
    loginHrStaff,
    getAllHrStaff,
    getHrStaffById,
    updateHrStaff,
    deleteHrStaff,
} from '../controllers/hrStaffController.js';

const router = express.Router();

// Define routes
router.post('/register', registerHrStaff); // Register a new HR staff member
router.post('/login', loginHrStaff); // Login HR staff
router.get('/', getAllHrStaff); // Get all HR staff members
router.get('/:id', getHrStaffById); // Get HR staff by ID
router.put('/:id', updateHrStaff); // Update HR staff
router.delete('/:id', deleteHrStaff); // Delete HR staff

export default router;
