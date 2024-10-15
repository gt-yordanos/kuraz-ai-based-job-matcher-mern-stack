import dbConnect from '../dbConnect.js';
import Analytics from '../models/Analytics.js';

export const getAnalytics = async (req, res) => {
    await dbConnect();
    try {
        const analytics = await Analytics.findOne() || new Analytics();
        res.status(200).json(analytics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateAnalytics = async (req, res) => {
    await dbConnect();
    const { id } = req.query;

    try {
        const analytics = await Analytics.findByIdAndUpdate(id, req.body, { new: true });
        if (!analytics) return res.status(404).json({ message: 'Analytics not found' });
        res.status(200).json(analytics);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
