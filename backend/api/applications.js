import dbConnect from '../dbConnect.js';
import Application from '../models/Application.js';

export const createApplication = async (req, res) => {
    await dbConnect();
    const { applicantId, jobId, coverLetter } = req.body;

    try {
        const application = new Application({ applicantId, jobId, coverLetter });
        await application.save();
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getApplications = async (req, res) => {
    await dbConnect();
    try {
        const applications = await Application.find().populate('applicantId jobId');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateApplicationStatus = async (req, res) => {
    await dbConnect();
    const { id } = req.query;
    const { status } = req.body;

    try {
        const application = await Application.findByIdAndUpdate(id, { status }, { new: true });
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.status(200).json(application);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getApplicationById = async (req, res) => {
    await dbConnect();
    const { id } = req.query;

    try {
        const application = await Application.findById(id).populate('applicantId jobId');
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteApplication = async (req, res) => {
    await dbConnect();
    const { id } = req.query;

    try {
        const application = await Application.findByIdAndDelete(id);
        if (!application) return res.status(404).json({ message: 'Application not found' });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
