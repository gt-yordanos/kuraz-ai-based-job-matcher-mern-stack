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
            jobTitle: { type: String },
            company: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            description: { type: String },
            jobType: { type: String, enum: ['Full-Time', 'Part-Time', 'Intern', 'Other', 'Research'], required: true },
        },
    ],
    education: [
        {
            degree: { 
                type: String,
                enum: ['Bachelor', 'Master', 'Doctorate', 'Diploma', 'Certification'],
            },
            institution: { type: String },
            major: { type: String },
            graduationYear: { type: Number },
            cgpa: { type: Number } // Add CGPA field here
        },
    ],
    location: { type: String },
    birthday: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    createdAt: { type: Date, default: Date.now },
    password: { type: String, required: true },
    profileCompletion: { type: Number, default: 0 },
});

// Hash password before saving
ApplicantSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    this.profileCompletion = this.calculateProfileCompletion(); // Calculate and set profile completion
    next();
});

// Method to calculate the applicant's profile completeness score
ApplicantSchema.methods.calculateProfileCompletion = function () {
    let score = 0;

    // Scoring for base fields
    score += this.firstName ? 10 : 0;
    score += this.lastName ? 10 : 0;
    score += this.email ? 10 : 0;
    score += this.phone ? 10 : 0;
    score += this.resume ? 10 : 0;
    score += this.skills && this.skills.length > 0 ? 10 : 0; // 10 points if skills exist
    score += this.location ? 10 : 0;
    score += this.birthday ? 10 : 0;
    score += this.gender ? 10 : 0;

    // Experience scoring
    const experiencePoints = this.experience.reduce((total, exp) => {
        return total + (exp.jobTitle ? 5 : 0) + (exp.company ? 5 : 0); // 5 points for each job title and company
    }, 0);
    
    // Education scoring
    const educationPoints = this.education.reduce((total, edu) => {
        return total + (edu.degree ? 5 : 0) + (edu.institution ? 5 : 0) + (edu.major ? 5 : 0) + (edu.cgpa ? 5 : 0); // Add CGPA points
    }, 0);
    
    // Add experience and education points
    score += experiencePoints;
    score += educationPoints;

    // Total possible points
    const totalPoints = 10 * 8 + (this.experience.length * 10) + (this.education.length * 20); // Updated to include CGPA points

    // Calculate and return the profile completion percentage
    return Math.min((score / totalPoints) * 100, 100);
};

// Optional: Separate method for explicit updates
ApplicantSchema.methods.updateProfileCompletion = function () {
    this.profileCompletion = this.calculateProfileCompletion();
    return this.save();
};

// Export the model
const Applicant = mongoose.models.Applicant || mongoose.model('Applicant', ApplicantSchema);
export default Applicant;
