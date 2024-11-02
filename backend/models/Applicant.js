import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import SoftSkills from '../data/SoftSkills.js';
import HardSkills from '../data/Hardskills.js';
import Majors from '../data/Majors.js';

// Define the Applicant Schema
const ApplicantSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    resume: { type: String },
    skills: {
        hardSkills: [{ 
            type: String, 
            enum: HardSkills,
        }],
        softSkills: [
            { 
                type: String, 
                enum: SoftSkills,
            }
        ],
    },
    experience: [
        {
            jobTitle: { type: String },
            company: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            description: { type: String },
            jobType: { type: String, enum: ['Full-Time', 'Part-Time', 'Intern', 'Other', 'Research'] },
        },
    ],
    education: [
        {
            degree: { 
                type: String,
                enum: ['Bachelor', 'Master', 'Doctorate', 'Diploma', 'Certification'],
            },
            institution: { type: String },
            major: { type: String, enum : Majors },
            graduationYear: { type: Number },
            cgpa: { type: Number },
        },
    ],
    location: { type: String},
    birthday: { type: Date, required: true},
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    createdAt: { type: Date, default: Date.now },
    password: { type: String, required: true },
});

// Hash password before saving
ApplicantSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Export the model
const Applicant = mongoose.models.Applicant || mongoose.model('Applicant', ApplicantSchema);
export default Applicant;
