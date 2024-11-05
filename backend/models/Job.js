import mongoose from 'mongoose';
import SoftSkills from '../data/SoftSkills.js';
import HardSkills from '../data/Hardskills.js';
import Majors from '../data/Majors.js';

// Define the Job Schema
const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    responsibilities: [{ type: String, required: true }],
    location: { type: String, required: true },
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
    deadline: { type: Date, required: true },
    hrStaffId: { type: mongoose.Schema.Types.ObjectId, ref: 'HrStaff', required: true },
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
            type: [String], // Change this line to accept an array of strings
            enum: Majors,
            validate: {
                validator: v => v.length <= 10,
                message: 'A maximum of 10 majors can be specified.'
            },
            default: []
        },
        minGPA: { type: Number, min: 0.0, max: 4.0 },
        degreeWeight: { 
            type: Number, 
            min: 0.5,   // Minimum weight for degree
            max: 3,     // Maximum weight for degree
            default: 1 
        }
    },

    // Skills requirements
    skillsRequired: {
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
        skillWeight: { 
            type: Number, 
            min: 0.5,   // Minimum weight for skills
            max: 3,     // Maximum weight for skills
            default: 1 
        }
    },
    
    // Experience requirements
    experienceRequirement: { 
        years: { type: Number, min: 0 }, 
        type: { type: String, enum: ['Required', 'Preferred'], default: 'Required' },
        experienceWeight: { 
            type: Number, 
            min: 0.0,   // Minimum weight for experience
            max: 3,     // Maximum weight for experience
            default: 1
        }
    },
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
