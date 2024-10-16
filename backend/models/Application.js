// backend/models/Application.js
import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    coverLetter: { type: String },
    status: {
        type: String,
        enum: ['Applied', 'Under Review', 'Interview', 'Rejected', 'Accepted'],
        default: 'Applied',
    },
    applicationDate: { type: Date, default: Date.now },
    feedback: { type: String },
    createdAt: { type: Date, default: Date.now },

    
    interviewDate: { type: Date },
    interviewers: [{ type: String }],
    interviewStatus: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Canceled'],
        default: 'Scheduled',
    },
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
