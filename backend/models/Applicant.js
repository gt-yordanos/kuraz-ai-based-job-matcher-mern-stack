import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const ApplicantSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    resume: { type: String }, // URL or file path to the resume
    skills: [{ type: String }], // List of skills
    experience: [
        {
            jobTitle: { type: String },
            company: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            description: { type: String },
        },
    ],
    education: [
        {
            degree: { type: String },
            institution: { type: String },
            graduationYear: { type: Number },
        },
    ],
    location: { type: String }, // Applicant's location
    birthday: { type: Date },
    createdAt: { type: Date, default: Date.now },
    password: { type: String, required: true },
    profileCompletion: { type: Number, default: 0 }, // Optional: Calculate how complete the profile is (0-100)
});

// Hash password before saving
ApplicantSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to calculate the applicant's profile completeness score (optional)
ApplicantSchema.methods.calculateProfileCompletion = function () {
    let score = 0;
    if (this.firstName && this.lastName) score += 20;
    if (this.email) score += 20;
    if (this.skills && this.skills.length > 0) score += 20;
    if (this.experience && this.experience.length > 0) score += 20;
    if (this.education && this.education.length > 0) score += 20;
    this.profileCompletion = score;
    return score;
};

export default mongoose.models.Applicant || mongoose.model('Applicant', ApplicantSchema);
