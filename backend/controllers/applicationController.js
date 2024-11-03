import Application from '../models/Application.js';
import Job from '../models/Job.js';
import Applicant from '../models/Applicant.js'; // Import the Applicant model

// Create a new application
export const createApplication = async (req, res) => {
    const { applicantId, jobId, qualifications } = req.body;

    try {
        // Check for missing fields
        if (!applicantId) {
            return res.status(400).json({ message: 'Applicant ID is required.' });
        }
        if (!jobId) {
            return res.status(400).json({ message: 'Job ID is required.' });
        }

        // Check if the applicant has already applied for this job
        const existingApplication = await Application.findOne({ applicantId, jobId });
        if (existingApplication) {
            return res.status(400).json({ message: 'Already applied for this job.' });
        }

        // Fetch the job to get the job deadline and requirements
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Invalid job.' });
        }

        // Fetch applicant data to fill in missing qualifications
        const applicant = await Applicant.findById(applicantId);
        if (!applicant) {
            return res.status(404).json({ message: 'Applicant not found.' });
        }

        // Check if qualifications are provided and applicant data is empty
        const qualificationsProvided = qualifications && (
            qualifications.education && qualifications.education.length > 0 ||
            qualifications.experience && qualifications.experience.length > 0 ||
            qualifications.hardSkills && qualifications.hardSkills.length > 0 ||
            qualifications.softSkills && qualifications.softSkills.length > 0
        );

        if (!qualificationsProvided && (!applicant.education || !applicant.skills.hardSkills || !applicant.skills.softSkills || !applicant.experience)) {
            return res.status(400).json({ message: 'Either fill the form or complete your application.' });
        }

        // Populate qualifications if not provided
        const finalQualifications = {
            education: qualifications.education && qualifications.education.length > 0 
                ? qualifications.education 
                : applicant.education,
            experience: qualifications.experience && qualifications.experience.length > 0 
                ? qualifications.experience 
                : applicant.experience,
            hardSkills: qualifications.hardSkills && qualifications.hardSkills.length > 0 
                ? qualifications.hardSkills 
                : applicant.skills.hardSkills,
            softSkills: qualifications.softSkills && qualifications.softSkills.length > 0 
                ? qualifications.softSkills 
                : applicant.skills.softSkills,
        };

        // Create a new application with the job deadline
        const applicationData = {
            applicantId,
            jobId,
            qualifications: finalQualifications,
            jobDeadline: job.deadline,
        };

        const application = new Application(applicationData);
        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all applications
export const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find().populate('applicantId jobId');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get applications by HR staff ID
export const getApplicationsByHrStaffId = async (req, res) => {
    const { hrStaffId } = req.params; 
    try {
        const applications = await Application.find({ hrStaffId }).populate('applicantId jobId');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific application by ID
export const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id).populate('applicantId jobId');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an application
export const updateApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an application
export const deleteApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update the status of the application (for interview, rejection, acceptance)
export const updateApplicationStatus = async (req, res) => {
    const { status, feedback } = req.body;
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = status;
        application.feedback = feedback || application.feedback;
        application.statusHistory.push({
            status: status,
            date: new Date(),
        });

        await application.save();
        res.status(200).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Schedule an interview
export const scheduleInterview = async (req, res) => {
    const { interviewDate, interviewers } = req.body;
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.interviewDate = interviewDate;
        application.interviewers = interviewers;
        application.interviewStatus = 'Scheduled';

        await application.save();
        res.status(200).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Complete an interview
export const completeInterview = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.interviewStatus = 'Completed';
        await application.save();
        res.status(200).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cancel an interview
export const cancelInterview = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.interviewStatus = 'Canceled';
        await application.save();
        res.status(200).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Delete all applications
export const deleteAllApplications = async (req, res) => {
    try {
        // Attempt to delete all applications
        const result = await Application.deleteMany(); // Deletes all applications
        res.status(204).send(); // No content to send back
    } catch (error) {
        // Handle any errors that occur during the deletion process
        res.status(500).json({ message: error.message });
    }
};