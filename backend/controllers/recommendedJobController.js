// backend/controllers/recommendedJobController.js
import RecommendedJob from '../models/RecommendedJobs.js';

// Get all recommended jobs
export const getRecommendedJobs = async (req, res) => {
    try {
        const recommendedJobs = await RecommendedJob.find().populate('applicantId jobId');
        res.status(200).json(recommendedJobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new recommended job
export const addRecommendedJob = async (req, res) => {
    const { applicantId, jobId, recommendedScore } = req.body;

    try {
        const newRecommendedJob = new RecommendedJob({
            applicantId,
            jobId,
            recommendedScore,
        });
        await newRecommendedJob.save();
        res.status(201).json(newRecommendedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a recommended job
export const updateRecommendedJob = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedRecommendedJob = await RecommendedJob.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedRecommendedJob) return res.status(404).json({ message: 'Recommended job not found' });
        res.status(200).json(updatedRecommendedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a recommended job
export const deleteRecommendedJob = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRecommendedJob = await RecommendedJob.findByIdAndDelete(id);
        if (!deletedRecommendedJob) return res.status(404).json({ message: 'Recommended job not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
