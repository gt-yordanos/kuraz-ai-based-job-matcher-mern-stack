// backend/index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import applicantRoutes from './routes/applicantRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import hrStaffRoutes from './routes/hrStaffRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import recommendedJobRoutes from './routes/recommendedJobRoutes.js'; // Import recommended job routes

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB using connection string from environment variable
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

// Initialize the database connection
connectToDatabase();

// Define API routes
app.use('/api/applicants', applicantRoutes); // Applicant management routes
app.use('/api/jobs', jobRoutes);             // Job postings routes
app.use('/api/applications', applicationRoutes); // Job applications routes
app.use('/api/hr', hrStaffRoutes);           // HR staff management routes
app.use('/api/leaderboard', leaderboardRoutes); // Leaderboard routes
app.use('/api/analytics', analyticsRoutes);   // Analytics routes
app.use('/api/recommended-jobs', recommendedJobRoutes); // Recommended jobs routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
