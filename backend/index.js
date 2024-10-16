import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import applicantRoutes from './routes/applicantRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/applicants', applicantRoutes); // Use applicant routes

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Kuraz AI Job Hiring API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
