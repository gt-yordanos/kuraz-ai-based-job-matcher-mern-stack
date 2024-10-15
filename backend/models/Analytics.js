// backend/models/Analytics.js
import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
    totalApplicants: { type: Number, default: 0 },
    totalJobs: { type: Number, default: 0 },
    totalApplications: { type: Number, default: 0 },
    applicationsByStatus: {
        applied: { type: Number, default: 0 },
        underReview: { type: Number, default: 0 },
        interview: { type: Number, default: 0 },
        rejected: { type: Number, default: 0 },
        accepted: { type: Number, default: 0 },
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);
