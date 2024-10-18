// backend/controllers/jobController.js
import Job from '../models/Job.js';

// Create a new job posting
export const createJob = async (req, res) => {
    const jobData = req.body;
    try {
        const job = new Job(jobData);
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all job postings
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific job posting by ID
export const getJobById = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a job posting
export const updateJob = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const job = await Job.findByIdAndUpdate(id, updates, { new: true });
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a job posting
export const deleteJob = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findByIdAndDelete(id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search job postings by title
export const searchJobsByTitle = async (req, res) => {
    const { title } = req.query; // Get the title from query parameters
    try {
        const jobs = await Job.find({ title: { $regex: title, $options: 'i' } }); // Case-insensitive search
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
