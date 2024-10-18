// backend/controllers/analyticsController.js
import Analytics from '../models/Analytics.js';

// Get analytics data
export const getAnalyticsData = async (req, res) => {
    try {
        const analyticsData = await Analytics.findOne(); // Assuming you only have one analytics document
        if (!analyticsData) return res.status(404).json({ message: 'Analytics data not found' });
        res.status(200).json(analyticsData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update analytics data
export const updateAnalyticsData = async (req, res) => {
    const updates = req.body;

    try {
        // You might want to create an analytics document if it doesn't exist
        const analyticsData = await Analytics.findOneAndUpdate({}, updates, { new: true, upsert: true });
        res.status(200).json(analyticsData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
