import Applicant from '../models/Applicant.js'; 
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

// Create a new applicant
export const createApplicant = async (req, res) => {
    const applicantData = req.body;
    try {
        const applicant = new Applicant(applicantData);
        applicant.calculateProfileCompletion(); // Calculate profile completion
        await applicant.save();
        res.status(201).json(applicant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login an applicant
export const loginApplicant = async (req, res) => {
    const { email, password } = req.body;
    try {
        const applicant = await Applicant.findOne({ email });
        if (!applicant) return res.status(401).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, applicant.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

        const token = generateToken(applicant._id);
        res.status(200).json({ token, applicantId: applicant._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all applicants
export const getAllApplicants = async (req, res) => {
    try {
        const applicants = await Applicant.find();
        res.status(200).json(applicants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific applicant by ID
export const getApplicantById = async (req, res) => {
    const { id } = req.params;
    try {
        const applicant = await Applicant.findById(id);
        if (!applicant) return res.status(404).json({ message: 'Applicant not found' });
        res.status(200).json(applicant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an applicant
export const updateApplicant = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (updates.password) {
        const hashedPassword = await bcrypt.hash(updates.password, 10);
        updates.password = hashedPassword;
    }

    try {
        const applicant = await Applicant.findByIdAndUpdate(id, updates, { new: true });
        if (!applicant) return res.status(404).json({ message: 'Applicant not found' });
        
        // Recalculate profile completion after updates
        applicant.calculateProfileCompletion();
        await applicant.save();

        res.status(200).json(applicant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an applicant
export const deleteApplicant = async (req, res) => {
    const { id } = req.params;
    try {
        const applicant = await Applicant.findByIdAndDelete(id);
        if (!applicant) return res.status(404).json({ message: 'Applicant not found' });
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search applicants by name
export const searchApplicantsByName = async (req, res) => {
    const { name } = req.query;
    try {
        const applicants = await Applicant.find({
            $or: [
                { firstName: { $regex: name, $options: 'i' } },
                { lastName: { $regex: name, $options: 'i' } }
            ]
        });
        
        res.status(200).json(applicants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export all functions
export default {
    createApplicant,
    loginApplicant,
    getAllApplicants,
    getApplicantById,
    updateApplicant,
    deleteApplicant,
    searchApplicantsByName,
};
