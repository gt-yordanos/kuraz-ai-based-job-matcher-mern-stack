import dbConnect from '../dbConnect.js';
import Job from '../models/Job.js';

export const createJob = async (req, res) => {
    await dbConnect();
    const { title, description, requirements, responsibilities, location, employmentType, salaryRange, deadline, hrStaffId } = req.body;

    try {
        const job = new Job({ title, description, requirements, responsibilities, location, employmentType, salaryRange, deadline, hrStaffId });
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getJobs = async (req, res) => {
    await dbConnect();
    try {
        const jobs = await Job.find().populate('hrStaffId', 'name email'); // Populate HR Staff info
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getJobById = async (req, res) => {
    await dbConnect();
    const { id } = req.query;

    try {
        const job = await Job.findById(id).populate('hrStaffId', 'name email');
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateJob = async (req, res) => {
    await dbConnect();
    const { id } = req.query;

    try {
        const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteJob = async (req, res) => {
    await dbConnect();
    const { id } = req.query;

    try {
        const job = await Job.findByIdAndDelete(id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
