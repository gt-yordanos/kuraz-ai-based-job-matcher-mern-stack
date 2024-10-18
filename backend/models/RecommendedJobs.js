// backend/models/RecommendedJob.js
import mongoose from 'mongoose';

const RecommendedJobSchema = new mongoose.Schema({
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    recommendedScore: { type: Number, default: 0 }, // Score specific to each applicant
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.RecommendedJob || mongoose.model('RecommendedJob', RecommendedJobSchema);
