import express from 'express'; 
import mongoose from 'mongoose'; 
import dotenv from 'dotenv'; 
import cors from 'cors'; 
import applicantRoutes from './routes/applicantRoutes.js'; 
import jobRoutes from './routes/jobRoutes.js'; 
import applicationRoutes from './routes/applicationRoutes.js'; 
import hrStaffRoutes from './routes/hrStaffRoutes.js'; 
import leaderboardRoutes from './routes/leaderboardRoutes.js'; 
import analyticsRoutes from './routes/analyticsRoutes.js'; 
import recommendedJobRoutes from './routes/recommendedJobRoutes.js';
import skillsAndMajorsRoutes from './routes/skillsAndMajors.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Check for critical environment variables
const requiredEnvVars = ['MONGO_URI'];
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        console.error(`${varName} is not defined in .env`);
        process.exit(1); // Exit if critical variable is missing
    }
});

// Connect to MongoDB using connection string from environment variable
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

// Initialize the database connection
connectToDatabase();

// Define API routes
app.use('/api/applicants', applicantRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/hr', hrStaffRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/recommended-jobs', recommendedJobRoutes);
app.use('/api/skills-and-majors', skillsAndMajorsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message || err);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Graceful shutdown
const shutdown = () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
