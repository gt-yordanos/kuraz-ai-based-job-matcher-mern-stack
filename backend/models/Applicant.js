// backend/models/Applicant.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const ApplicantSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    phone: { type: String }, 
    resume: { type: String }, 
    skills: [{ type: String }],
    experience: [
        {
            jobTitle: { type: String},
            company: { type: String},
            startDate: { type: Date},
            endDate: { type: Date},
            description: { type: String },
        },
    ],
    education: [
        {
            degree: { type: String},
            institution: { type: String},
            graduationYear: { type: Number},
        },
    ],
    location: { type: String },
    birthday: { type: Date },
    createdAt: { type: Date, default: Date.now },
    rank: { type: Number, default: 0 },
    password: { type: String, required: true },
});

// Hash password before saving
ApplicantSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.models.Applicant || mongoose.model('Applicant', ApplicantSchema);
