import mongoose from 'mongoose';

const LeaderboardSchema = new mongoose.Schema({
    jobId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Job', 
        required: true 
    },
    applicationId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Application', 
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
        type: [String],
        default: [] 
    },
    matchedSoftSkills: { 
        type: [String],
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
        type: Number
    },
    meetsGpa: { 
        type: Boolean, 
        required: true 
    },
    experienceYears: { 
        type: Number, 
        required: true 
    },
    hasMinimumExperience: { 
        type: Boolean, 
        required: true 
    },
    skillMatchPercentage: { 
        type: Number, 
        required: true 
    },
    hardSkillMatchPercentage: { 
        type: Number, 
        required: true 
    },
    softSkillMatchPercentage: { 
        type: Number, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', LeaderboardSchema);
