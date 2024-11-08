import mongoose from 'mongoose';

const LeaderboardSchema = new mongoose.Schema({
    jobId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Job', 
        required: true 
    },
    applicantId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Applicant', 
        required: true 
    },
    score: { 
        type: Number, 
        required: true 
    },
    matchedHardSkills: { 
        type: [String],  // Array of hard skills that match
        default: [] 
    },
    matchedSoftSkills: { 
        type: [String],  // Array of soft skills that match
        default: [] 
    },
    majorMatch: { 
        type: Boolean, 
        default: false 
    },
    degreeMatch: { 
        type: Boolean, 
        default: false 
    },
    gpa: { 
        type: Number, 
        required: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', LeaderboardSchema);
