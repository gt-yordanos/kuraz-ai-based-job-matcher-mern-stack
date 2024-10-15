// backend/models/HrStaff.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const HrStaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    department: { type: String, required: true }, // e.g., HR, Recruitment
    jobTitle: { type: String, required: true },
    location: { type: String, required: true }, // City or area of work
    joinedDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    password: { type: String, required: true }, // Add password field
});

// Hash password before saving
HrStaffSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.models.HrStaff || mongoose.model('HrStaff', HrStaffSchema);
