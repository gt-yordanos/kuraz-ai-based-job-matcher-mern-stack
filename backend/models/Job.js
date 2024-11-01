import mongoose from 'mongoose';

// Define the Job Schema
const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    responsibilities: [{ type: String, required: true }], // Array of responsibilities
    location: { type: String, required: true }, // Job location
    employmentType: { 
        type: String, 
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], 
        required: true 
    },
    salaryRange: { 
        type: String, // e.g., "50000-70000"
        required: true 
    },
    postedDate: { type: Date, default: Date.now },
    deadline: { type: Date, required: true }, // Deadline for applications
    hrStaffId: { type: mongoose.Schema.Types.ObjectId, ref: 'HrStaff', required: true }, // Reference to HR Staff
    createdAt: { type: Date, default: Date.now },

    // Enhanced job requirements
    ageLimit: { 
        min: { type: Number }, 
        max: { type: Number } 
    },
    genderPreference: {
        type: String, 
        enum: ['Male', 'Female', 'Other', 'Any'],
        default: 'Any'
    },
    jobType: { 
        type: String, 
        enum: ['Remote', 'On-site', 'Hybrid'], 
        default: 'On-site' 
    },
    
    // Education requirements
    educationRequirement: {
        degree: { 
            type: String,
            enum: ['None', 'High School', 'Associate', 'Bachelor', 'Master', 'Doctorate'],
            default: 'None'
        },
        requiredMajors: {
            type: [String], // Array of required majors
            validate: {
                validator: function(v) {
                    return v.length <= 10; // Limit to 10 majors
                },
                message: 'A maximum of 10 majors can be specified.'
            }
        },
        minGPA: { type: Number, min: 0.0, max: 4.0 }
    },

    // Skills requirements
    skillsRequired: {
        hardSkills: [{ 
            type: String,
            // No enum here, assuming you'll handle this in the frontend
        }],
        softSkills: [{ 
            type: String,
            // No enum here, assuming you'll handle this in the frontend
        }]
    },
    
    // Experience requirements
    experienceRequirement: { 
        years: { type: Number, min: 0 } 
    },

    // Weights for different criteria
    weights: {
        age: { type: Number, default: 10 }, 
        gender: { type: Number, default: 10 },
        experience: { type: Number, default: 20 },
        education: { type: Number, default: 20 },
        gpa: { type: Number, default: 20 },
        skills: { type: Number, default: 20 },
        majorWeights: [{
            major: { type: String },
            weight: { type: Number, default: 1 }, // Weight for each major type
        }],
        degreeWeights: [{
            degree: { 
                type: String,
                enum: ['None', 'High School', 'Associate', 'Bachelor', 'Master', 'Doctorate'],
            },
            weight: { type: Number, default: 1 }, // Weight for each degree type
        }]
    }
});

// Export the model
export default mongoose.models.Job || mongoose.model('Job', JobSchema);
