// backend/models/Leaderboard.js
import mongoose from 'mongoose';

const LeaderboardSchema = new mongoose.Schema({
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    score: { type: Number, required: true }, // Score based on criteria (e.g., skills match)
    rank: { type: Number }, // Ranking based on score
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', LeaderboardSchema);
