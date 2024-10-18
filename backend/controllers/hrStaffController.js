import HrStaff from '../models/HrStaff.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new HR staff member
export const registerHrStaff = async (req, res) => {
    try {
        const { name, email, phone, department, jobTitle, location, joinedDate, password } = req.body;
        const newHrStaff = new HrStaff({ name, email, phone, department, jobTitle, location, joinedDate, password });
        await newHrStaff.save();
        res.status(201).json({ message: 'HR staff registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login HR staff
export const loginHrStaff = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hrStaff = await HrStaff.findOne({ email });
        if (!hrStaff) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, hrStaff.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: hrStaff._id, email: hrStaff.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all HR staff members
export const getAllHrStaff = async (req, res) => {
    try {
        const hrStaffMembers = await HrStaff.find();
        res.status(200).json(hrStaffMembers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get HR staff by ID
export const getHrStaffById = async (req, res) => {
    try {
        const hrStaff = await HrStaff.findById(req.params.id);
        if (!hrStaff) return res.status(404).json({ message: 'HR staff not found' });
        res.status(200).json(hrStaff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update HR staff
export const updateHrStaff = async (req, res) => {
    try {
        const hrStaff = await HrStaff.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!hrStaff) return res.status(404).json({ message: 'HR staff not found' });
        res.status(200).json(hrStaff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete HR staff
export const deleteHrStaff = async (req, res) => {
    try {
        const hrStaff = await HrStaff.findByIdAndDelete(req.params.id);
        if (!hrStaff) return res.status(404).json({ message: 'HR staff not found' });
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
