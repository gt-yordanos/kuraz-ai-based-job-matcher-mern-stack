import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const HrStaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    jobTitle: { type: String, required: true },
    location: { type: String, required: true },
    joinedDate: { type: Date, required: true },
    password: { type: String, required: true }, // Password field
}, { timestamps: true });

// Hash password before saving
HrStaffSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.models.HrStaff || mongoose.model('HrStaff', HrStaffSchema);
