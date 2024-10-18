import Application from '../models/Application';
import Job from '../models/Job';
import { sendToGeminiAI } from '../utils/geminiAI'; // Utility function to send data to Gemini AI
import RecommendedJob from '../models/RecommendedJob';

// Function to process applications once the job deadline is reached
export const processJobApplications = async (jobId) => {
    const job = await Job.findById(jobId).populate('applicants.applicantId'); // Populate to get applicant data
    if (new Date() > job.deadline) {
        const applications = await Application.find({ jobId });
        const applicantData = applications.map(application => ({
            applicantId: application.applicantId,
            score: application.score, // Include any other data required
            coverLetter: application.coverLetter,
        }));

        // Send applicant data to Gemini AI for ranking
        const rankings = await sendToGeminiAI(applicantData, job.requirements);

        // Update the applications with the rankings
        for (const ranking of rankings) {
            const application = await Application.findById(ranking.applicationId);
            application.rank = ranking.rank; // Update the rank
            application.processedForRanking = true; // Mark as processed
            await application.save();
        }
    }
};

// Function to recommend jobs based on applicant profile
export const recommendJobs = async (applicantId) => {
    const applications = await Application.find({ applicantId });
    const jobs = await Job.find({ deadline: { $gt: new Date() } }); // Get jobs that are still open
    const recommendedJobs = [];

    for (const job of jobs) {
        const score = calculateRecommendationScore(applicantId, job); // Implement scoring logic based on profile
        if (score > 0) {
            recommendedJobs.push({
                applicantId,
                jobId: job._id,
                recommendedScore: score,
            });
        }
    }

    // Save recommendations
    await RecommendedJob.deleteMany({ applicantId }); // Clear previous recommendations
    await RecommendedJob.insertMany(recommendedJobs);
};

// Dummy function to calculate recommendation score
const calculateRecommendationScore = (applicantId, job) => {
    // Implement your logic for scoring based on applicant's profile and job requirements
    return Math.random() * 100; // Replace with real scoring logic
};
