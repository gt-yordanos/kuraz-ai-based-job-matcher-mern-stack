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
    interviewDate: { type: Date },
    interviewers: [{ type: String }],
    interviewStatus: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Canceled'],
        default: 'Scheduled',
    },
    processedForRanking: { type: Boolean, default: false }, // Track if ranking has been processed

    // Matching scores based on applicant's profile and application data
    matchingScore: { type: Number, default: 0 }, // Total matching score
    qualifications: {
        education: { type: String }, // Specific education provided during application
        experience: { type: String }, // Specific experience provided during application
        majors: { type: [String] }, // Specific majors provided during application
        hardSkills: [{ 
            type: String, 
            enum: hardSkills, // Import hardSkills from appropriate module
        }],
        softSkills: [
            { 
                type: String, 
                enum: SoftSkills, // Import SoftSkills from appropriate module
            }
        ],
        educationScore: { type: Number, default: 0 }, // Score based on education
        experienceScore: { type: Number, default: 0 }, // Score based on relevant experience
        skillsScore: { type: Number, default: 0 }, // Score based on matching hard and soft skills
        preferencesScore: { type: Number, default: 0 }, // Score based on employer preferences (e.g., gender, age)
    },

    // Deadline for the job application
    jobDeadline: { type: Date, required: true }, // Store job deadline for initiating ranking

    // Optional: Store timestamps for each status change for auditing
    statusHistory: [
        {
            status: {
                type: String,
                enum: ['Applied', 'Under Review', 'Interview', 'Rejected', 'Accepted'],
            },
            date: { type: Date, default: Date.now },
        },
    ],
});

// Middleware to set job deadline and default values from applicant profile
ApplicationSchema.pre('save', function (next) {
    if (this.isNew) {
        mongoose.model('Job').findById(this.jobId).then(job => {
            if (job) {
                this.jobDeadline = job.deadline; // Set job deadline on application
                next();
            } else {
                next(new Error('Job not found.'));
            }
        }).catch(err => next(err));
    } else {
        next();
    }
});

// Static method to populate default qualifications from applicant's profile
ApplicationSchema.statics.populateDefaultsFromProfile = async function (applicationId, applicantProfile) {
    const application = await this.findById(applicationId);
    if (!application) throw new Error('Application not found.');

    application.qualifications.education = application.qualifications.education || applicantProfile.education.map(e => e.degree).join(', ');
    application.qualifications.experience = application.qualifications.experience || applicantProfile.experience.map(e => e.jobTitle).join(', ');
    application.qualifications.majors = application.qualifications.majors.length > 0 ? application.qualifications.majors : applicantProfile.education.map(e => e.major);
    application.qualifications.hardSkills = application.qualifications.hardSkills.length > 0 ? application.qualifications.hardSkills : applicantProfile.skills.hardSkills;
    application.qualifications.softSkills = application.qualifications.softSkills.length > 0 ? application.qualifications.softSkills : applicantProfile.skills.softSkills;

    await application.save();
};

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
