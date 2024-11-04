import mongoose from 'mongoose';

const LeaderboardSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant', required: true },
    score: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', LeaderboardSchema);
