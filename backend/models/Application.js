import mongoose from 'mongoose';
import SoftSkills from '../data/SoftSkills.js';
import HardSkills from '../data/Hardskills.js';
import Majors from '../data/Majors.js'; // Import Majors

// Define the Application Schema
const ApplicationSchema = new mongoose.Schema({
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant', required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    coverLetter: { type: String },
    status: {
        type: String,
        enum: ['Applied', 'Under Review', 'Interview', 'Rejected', 'Accepted', 'Deadline Passed'],
        default: 'Applied',
    },
    applicationDate: { type: Date, default: Date.now },
    feedback: { type: String },
    interviewDate: { type: Date },
    interviewers: [{ type: String }],
    interviewStatus: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Canceled'],
        default: null,
    },
    processedForRanking: { type: Boolean, default: false },
    qualifications: {
        education: [{
            degree: { 
                type: String,
                enum: ['Bachelor', 'Master', 'Doctorate', 'Diploma', 'Certification'],
                required: true,
            },
            institution: { type: String, required: true },
            major: { type: String, enum: Majors, required: true },
            graduationYear: { type: Number, required: true },
            cgpa: { type: Number },
        }],
        experience: [{
            jobTitle: { type: String, required: true },
            company: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date },
            description: { type: String },
            jobType: { type: String, enum: ['Full-Time', 'Part-Time', 'Intern', 'Other', 'Research'] },
        }],
        hardSkills: [{
            type: String,
            enum: HardSkills,
            required: true,
        }],
        softSkills: [{
            type: String,
            enum: SoftSkills,
            required: true,
        }],
    },
    statusHistory: [
        {
            status: {
                type: String,
                enum: ['Applied', 'Under Review', 'Interview', 'Rejected', 'Accepted', 'Deadline Passed'],
            },
            date: { type: Date, default: Date.now },
        },
    ],
});

// Middleware to set job deadline
ApplicationSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const job = await mongoose.model('Job').findById(this.jobId);
            if (job) {
                this.jobDeadline = job.deadline;
                next();
            } else {
                next(new Error('Job not found.'));
            }
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

// Method to check if the deadline has passed
ApplicationSchema.methods.checkDeadline = function () {
    const now = new Date();
    if (this.jobDeadline < now) {
        this.status = 'Deadline Passed';
        this.statusHistory.push({
            status: 'Deadline Passed',
            date: now,
        });
        return 'The application deadline has passed.';
    }
    return 'The deadline is still valid.';
};

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
