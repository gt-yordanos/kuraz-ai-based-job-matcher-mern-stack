// backend/api/auth.js
import dbConnect from '../dbConnect.js';
import Applicant from '../models/Applicant.js';
import HrStaff from '../models/HrStaff.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key'; // Use an environment variable in a real app

// Sign up Applicant
export const applicantSignUp = async (req, res) => {
    await dbConnect();
    const { name, email, phone, resume, skills, experience, education, location, password } = req.body;

    try {
        const applicant = new Applicant({ name, email, phone, resume, skills, experience, education, location, password });
        await applicant.save();
        res.status(201).json(applicant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login Applicant
export const applicantLogin = async (req, res) => {
    await dbConnect();
    const { email, password } = req.body;

    try {
        const applicant = await Applicant.findOne({ email });
        if (!applicant) return res.status(404).json({ message: 'Applicant not found' });

        const isMatch = await bcrypt.compare(password, applicant.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: applicant._id }, JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Sign up HR Staff
export const hrStaffSignUp = async (req, res) => {
    await dbConnect();
    const { name, email, phone, department, jobTitle, location, joinedDate, password } = req.body;

    try {
        const hrStaff = new HrStaff({ name, email, phone, department, jobTitle, location, joinedDate, password });
        await hrStaff.save();
        res.status(201).json(hrStaff);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login HR Staff
export const hrStaffLogin = async (req, res) => {
    await dbConnect();
    const { email, password } = req.body;

    try {
        const hrStaff = await HrStaff.findOne({ email });
        if (!hrStaff) return res.status(404).json({ message: 'HR Staff not found' });

        const isMatch = await bcrypt.compare(password, hrStaff.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: hrStaff._id }, JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
