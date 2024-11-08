import Job from '../models/Job.js';
import Application from '../models/Application.js';
import Leaderboard from '../models/Leaderboard.js';

// Define scores based on required degree
const degreeScores = {
    'None': { 'None': 1, 'High School': 0.6, 'Associate': 0, 'Bachelor': 0, 'Master': 0, 'Doctorate': 0 },
    'High School': { 'None': 0.2, 'High School': 1, 'Associate': 0.8, 'Bachelor': 0, 'Master': 0, 'Doctorate': 0 },
    'Associate': { 'None': 0, 'High School': 0.4, 'Associate': 1, 'Bachelor': 0.8, 'Master': 0, 'Doctorate': 0 },
    'Bachelor': { 'None': 0, 'High School': 0, 'Associate': 0.5, 'Bachelor': 1, 'Master': 1.3, 'Doctorate': 1.3 },
    'Master': { 'None': 0, 'High School': 0, 'Associate': 0, 'Bachelor': 0.6, 'Master': 1, 'Doctorate': 1.2 },
    'Doctorate': { 'None': 0, 'High School': 0, 'Associate': 0, 'Bachelor': 0, 'Master': 0.7, 'Doctorate': 1 }
};

// Helper function to calculate education score
const calculateEducationScore = (applicantDegrees, educationRequirement) => {
    const { degree: minDegree, requiredMajors, minGPA, degreeWeight } = educationRequirement;
    let score = 0;

    // Check if major matches
    const majorMatch = applicantDegrees.some(degree => requiredMajors.includes(degree.major));
    if (!majorMatch) return 0;

    const matchingDegree = applicantDegrees.find(degree => degree.degree === minDegree);
    let degreeCoefficient = matchingDegree ? degreeScores[minDegree][matchingDegree.degree] : degreeScores[minDegree]['None'];

    // GPA check
    const applicantGPA = matchingDegree ? matchingDegree.cgpa : 0;
    score = applicantGPA >= minGPA ? 20 : 20 + ((applicantGPA - minGPA) * 20);

    // Apply degree coefficient
    score *= degreeCoefficient;

    // Apply education weight
    if (typeof degreeWeight === 'number' && degreeWeight > 0) score *= degreeWeight;

    return Math.max(0, score);
};

// Helper function to calculate experience score
const calculateExperienceScore = (applicantExperience, experienceRequirement) => {
    const { experienceWeight, years: requiredYears } = experienceRequirement;
    let score = 0;

    const applicantYears = applicantExperience.length;

    if (applicantYears >= requiredYears) {
        score = 20 + Math.min(applicantYears - requiredYears, 5) / 5 * 10;
    } else {
        score = 20 - ((requiredYears - applicantYears) / requiredYears) * 20;
    }

    if (typeof experienceWeight === 'number' && experienceWeight > 0) score *= experienceWeight;

    return Math.max(0, score);
};

// Helper function to calculate skills score
const calculateSkillsScore = (applicantQualifications, skillsRequired) => {
    const { hardSkills, softSkills } = skillsRequired.skills;
    const { skillWeight } = skillsRequired;

    const hardSkillsMatch = hardSkills.filter(skill => applicantQualifications.hardSkills.includes(skill)).length;
    const softSkillsMatch = softSkills.filter(skill => applicantQualifications.softSkills.includes(skill)).length;

    let score = (hardSkillsMatch / hardSkills.length) * 10 + (softSkillsMatch / softSkills.length) * 10;
    score *= skillWeight;

    return { score, matchedHardSkills: hardSkillsMatch, matchedSoftSkills: softSkillsMatch };
};

// Function to calculate the total score for an applicant
const calculateScore = (applicantQualifications, jobRequirements) => {
    let totalScore = 0;

    // Education score
    totalScore += calculateEducationScore(applicantQualifications.education, jobRequirements.educationRequirement);

    // Skills score
    const { score: skillsScore } = calculateSkillsScore(applicantQualifications, jobRequirements.skillsRequired);
    totalScore += skillsScore;

    // Experience score
    totalScore += calculateExperienceScore(applicantQualifications.experience, jobRequirements.experienceRequirement);

    return { totalScore };
};

// Function to update leaderboard
export const updateLeaderboard = async (req, res) => {
    const { jobId } = req.body;

    if (!jobId) return res.status(400).json({ message: 'jobId is required' });

    try {
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        const applications = await Application.find({ jobId }).populate('applicantId');
        if (!applications.length) return res.status(404).json({ message: 'No applications found for this job' });

        // Clear previous leaderboard entries
        await Leaderboard.deleteMany({ jobId });

        const leaderboardEntries = applications.map(app => {
            const score = calculateScore(app.qualifications, job);

            const totalScore = score.totalScore;

            // Calculate matched skills
            const matchedHardSkills = app.qualifications.hardSkills.filter(skill => job.skillsRequired.skills.hardSkills.includes(skill));
            const matchedSoftSkills = app.qualifications.softSkills.filter(skill => job.skillsRequired.skills.softSkills.includes(skill));

            // Check major and degree match
            const majorMatch = app.qualifications.education.some(degree => job.educationRequirement.requiredMajors.includes(degree.major));
            const degreeMatch = app.qualifications.education.some(degree => degree.degree === job.educationRequirement.degree);

            return {
                jobId: job._id,
                applicantId: app.applicantId,
                score: totalScore,
                matchedHardSkills,
                matchedSoftSkills,
                majorMatch,
                degreeMatch,
                gpa: app.qualifications.education[0]?.cgpa || 0,
            };
        }).filter(entry => entry !== null);

        // Insert new leaderboard entries
        await Leaderboard.insertMany(leaderboardEntries);

        res.status(200).json(leaderboardEntries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Function to get leaderboard
export const getLeaderboard = async (req, res) => {
    const { jobId } = req.params;
    const { sortBy } = req.query;

    let leaderboard = await Leaderboard.find({ jobId })
        .populate('applicantId')
        .sort({ score: -1 });

    if (sortBy) {
        if (sortBy === 'gender') {
            leaderboard.sort((a, b) => a.gender.localeCompare(b.gender));
        } else if (sortBy === 'age') {
            leaderboard.sort((a, b) => a.age - b.age);
        }
    }

    res.json(leaderboard);
};
