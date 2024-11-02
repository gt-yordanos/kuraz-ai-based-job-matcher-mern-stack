import Application from '../models/Application.js';

// Create a new application
export const createApplication = async (req, res) => {
    try {
        const application = new Application(req.body);
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
        application.feedback = feedback || application.feedback; // Update feedback if provided
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
