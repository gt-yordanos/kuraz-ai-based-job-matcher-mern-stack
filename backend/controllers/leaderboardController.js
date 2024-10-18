import Leaderboard from '../models/Leaderboard.js';

// Create a new leaderboard entry
export const createLeaderboardEntry = async (req, res) => {
    const { applicantId, jobId, score, rank } = req.body;

    try {
        const leaderboardEntry = new Leaderboard({
            applicantId,
            jobId,
            score,
            rank,
        });
        await leaderboardEntry.save();
        res.status(201).json(leaderboardEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all leaderboard entries
export const getAllLeaderboardEntries = async (req, res) => {
    try {
        const leaderboardEntries = await Leaderboard.find()
            .populate('applicantId', 'firstName lastName') // Optionally populate applicant details
            .populate('jobId', 'title'); // Optionally populate job details
        res.status(200).json(leaderboardEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific leaderboard entry by ID
export const getLeaderboardEntryById = async (req, res) => {
    const { id } = req.params;

    try {
        const entry = await Leaderboard.findById(id)
            .populate('applicantId', 'firstName lastName') // Populate applicant details
            .populate('jobId', 'title'); // Populate job details
        if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a leaderboard entry
export const updateLeaderboardEntry = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const entry = await Leaderboard.findByIdAndUpdate(id, updates, { new: true });
        if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
        res.status(200).json(entry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a leaderboard entry
export const deleteLeaderboardEntry = async (req, res) => {
    const { id } = req.params;

    try {
        const entry = await Leaderboard.findByIdAndDelete(id);
        if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
