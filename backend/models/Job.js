// backend/models/Job.js
import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String, required: true }], // Array of requirements
    responsibilities: [{ type: String, required: true }], // Array of responsibilities
    location: { type: String, required: true }, // Job location
    employmentType: { type: String, enum: ['Full-time', 'Part-time', 'Contract'], required: true },
    salaryRange: { type: String }, // e.g., "50000-70000"
    postedDate: { type: Date, default: Date.now },
    deadline: { type: Date, required: true }, // Deadline for applications
    hrStaffId: { type: mongoose.Schema.Types.ObjectId, ref: 'HrStaff', required: true }, // Reference to HR Staff
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
