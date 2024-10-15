// backend/models/Applicant.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const ApplicantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    resume: { type: String, required: true }, // URL to the resume
    skills: [{ type: String, required: true }], // Array of skills
    experience: [
        {
            jobTitle: { type: String, required: true },
            company: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            description: { type: String },
        },
    ],
    education: [
        {
            degree: { type: String, required: true },
            institution: { type: String, required: true },
            graduationYear: { type: Number, required: true },
        },
    ],
    location: { type: String, required: true }, // City or area of residence
    createdAt: { type: Date, default: Date.now },
    rank: { type: Number, default: 0 }, // Add rank field
    password: { type: String, required: true }, // Add password field
});

// Hash password before saving
ApplicantSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.models.Applicant || mongoose.model('Applicant', ApplicantSchema);

