import Application from '../models/Application.js';
import Applicant from '../models/Applicant.js';
import Job from '../models/Job.js'; // Import the Job model

// Create a new application
export const createApplication = async (req, res) => {
    try {
        const { applicantId, jobId, coverLetter } = req.body;

        // Get the existing applicant's data
        const applicant = await Applicant.findById(applicantId);
        if (!applicant) {
            return res.status(404).json({ message: 'Applicant not found' });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Create a new application
        const application = new Application({
            applicantId,
            jobId,
            coverLetter,
        });

        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all applications
export const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('applicantId')
            .populate('jobId');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an application by ID
export const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('applicantId')
            .populate('jobId');
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an application
export const updateApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!application) return res.status(404).json({ message: 'Application not found' });
        
        // Optionally, populate relevant fields after update
        await application.populate('applicantId').populate('jobId');
        res.status(200).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an application
export const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Populate defaults from applicant's profile
export const populateDefaults = async (req, res) => {
    try {
        const { applicationId, applicantId } = req.body;

        const applicantProfile = await Applicant.findById(applicantId);
        if (!applicantProfile) {
            return res.status(404).json({ message: 'Applicant profile not found' });
        }

        await Application.populateDefaultsFromProfile(applicationId, applicantProfile);
        res.status(200).json({ message: 'Defaults populated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
