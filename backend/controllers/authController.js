// authController.js
import Applicant from '../models/Applicant.js';
import HrStaff from '../models/HrStaff.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

// Login function for both applicants and HR staff
export const loginUser = async (req, res) => {
    const { email, password, role } = req.body; // Accept role to differentiate

    try {
        let user;
        if (role === 'applicant') {
            user = await Applicant.findOne({ email });
        } else if (role === 'hr') {
            user = await HrStaff.findOne({ email });
        }

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate JWT token with role included
        const token = generateToken(user._id, role);
        res.status(200).json({ token, userId: user._id, role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
