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
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    createdAt: { type: Date, default: Date.now },
    password: { type: String, required: true },
    profileCompletion: { type: Number, default: 0 }, // Calculate how complete the profile is (0-100)
});

// Hash password before saving
ApplicantSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to calculate the applicant's profile completeness score
ApplicantSchema.methods.calculateProfileCompletion = function () {
    let score = 0;
    const totalFields = 10; // Total fields considered for completeness scoring

    if (this.firstName) score += 10;
    if (this.lastName) score += 10;
    if (this.email) score += 10;
    if (this.phone) score += 10; // Consider phone if provided
    if (this.resume) score += 10; // Consider resume if provided
    if (this.skills && this.skills.length > 0) score += 10;
    if (this.experience && this.experience.length > 0) score += 10;
    if (this.education && this.education.length > 0) score += 10;
    if (this.location) score += 10; // Consider location if provided
    if (this.birthday) score += 10; // Consider birthday if provided
    if (this.gender) score += 10; // Consider gender if provided

    this.profileCompletion = (score / totalFields) * 100; // Calculate percentage score
    return this.profileCompletion;
};

export default mongoose.models.Applicant || mongoose.model('Applicant', ApplicantSchema);
