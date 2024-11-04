import Job from '../models/Job.js';
import Application from '../models/Application.js';
import Leaderboard from '../models/Leaderboard.js';

// Define scores based on required degree
const degreeScores = {
    'None': {
        'None': 1,
        'High School': 0.6,
        'Associate': 0,
        'Bachelor': 0,
        'Master': 0,
        'Doctorate': 0,
    },
    'High School': {
        'None': 0.4,
        'High School': 1,
        'Associate': 0.8,
        'Bachelor': 0,
        'Master': 0,
        'Doctorate': 0,
    },
    'Associate': {
        'None': 0,
        'High School': 0.4,
        'Associate': 1,
        'Bachelor': 0.8,
        'Master': 0,
        'Doctorate': 0,
    },
    'Bachelor': {
        'None': 0,
        'High School': 0,
        'Associate': 0,
        'Bachelor': 1,
        'Master': 1.3,
        'Doctorate': 1.3,
    },
    'Master': {
        'None': 0,
        'High School': 0,
        'Associate': 0,
        'Bachelor': 0.6,
        'Master': 1,
        'Doctorate': 1.2,
    },
    'Doctorate': {
        'None': 0,
        'High School': 0,
        'Associate': 0,
        'Bachelor': 0,
        'Master': 0.7,
        'Doctorate': 1,
    },
};

// Function to calculate the score for each applicant
const calculateScore = (applicantQualifications, jobRequirements) => {
    let totalScore = 0;

    // Education Score Calculation
    const educationScore = calculateEducationScore(applicantQualifications.education, jobRequirements.educationRequirement);
    totalScore += educationScore;

    // Skills Score Calculation
    const skillsScore = calculateSkillsScore(applicantQualifications, jobRequirements.skillsRequired);
    totalScore += skillsScore;

    // Experience Score Calculation
    const experienceScore = calculateExperienceScore(applicantQualifications.experience, jobRequirements.experienceRequirement);
    totalScore += experienceScore;

    return totalScore;
};

// Function to calculate the education score with weight
const calculateEducationScore = (applicantDegrees, educationRequirement) => {
    let score = 0;
    const { degree: minDegree, requiredMajors, minGPA, educationWeight } = educationRequirement;

    // Calculate score based on degree hierarchy
    applicantDegrees.forEach(degree => {
        const majorMatch = requiredMajors.includes(degree.major);
        const degreeScore = degreeScores[minDegree][degree.degree];

        if (degreeScore !== undefined) {
            score += degreeScore * educationWeight; // Apply education weight
            if (majorMatch) {
                score += 1; // Bonus for major match
            }
        }
    });

    // GPA consideration
    applicantDegrees.forEach(degree => {
        if (degree.cgpa >= minGPA) {
            score += (degree.cgpa / 4) * 2; // Scale GPA contribution
        }
    });

    return score;
};

// Function to calculate the skills score
const calculateSkillsScore = (applicantQualifications, skillsRequired) => {
    let score = 0;
    const skillWeight = skillsRequired.skillWeight;
    const requiredHardSkills = skillsRequired.skills.hardSkills;
    const requiredSoftSkills = skillsRequired.skills.softSkills;
    const applicantHardSkills = applicantQualifications.hardSkills;
    const applicantSoftSkills = applicantQualifications.softSkills;

    const hardSkillsMatch = requiredHardSkills.filter(skill => applicantHardSkills.includes(skill)).length;
    const softSkillsMatch = requiredSoftSkills.filter(skill => applicantSoftSkills.includes(skill)).length;

    // Skill contribution based on match count
    if (hardSkillsMatch > 0) {
        score += (hardSkillsMatch * skillWeight) * (1 + (hardSkillsMatch - 1) * 0.1);
    }

    if (softSkillsMatch > 0) {
        score += (softSkillsMatch * skillWeight) * (1 + (softSkillsMatch - 1) * 0.1);
    }

    return score;
};

// Function to calculate the experience score
const calculateExperienceScore = (applicantExperience, experienceRequirement) => {
    let score = 0;
    const experienceWeight = experienceRequirement.experienceWeight;
    const requiredExperience = experienceRequirement.years;
    const applicantYears = applicantExperience.length; // Assume each experience entry counts as a year.

    if (applicantYears > requiredExperience) {
        score += experienceWeight + ((applicantYears - requiredExperience) * experienceWeight * 0.5);
    } else if (applicantYears === requiredExperience) {
        score += experienceWeight; // Exact match
    }

    return score;
};

// Function to update the leaderboard
export const updateLeaderboard = async (jobId) => {
    const applications = await Application.find({ jobId }).populate('applicantId');
    const job = await Job.findById(jobId);

    await Leaderboard.deleteMany({ jobId }); // Clear previous leaderboard entries

    const leaderboardEntries = applications.map(app => {
        const score = calculateScore(app.qualifications, job);
        return {
            jobId: job._id,
            applicantId: app.applicantId,
            score,
            gender: app.applicantId.gender, // Assuming applicantId has a gender field
            age: app.applicantId.age, // Assuming applicantId has an age field
        };
    });

    await Leaderboard.insertMany(leaderboardEntries);
};

// Function to get the leaderboard
export const getLeaderboard = async (req, res) => {
    const { jobId } = req.params;
    const { sortBy } = req.query; // New parameter for sorting by gender or age

    let leaderboard = await Leaderboard.find({ jobId })
        .populate('applicantId')
        .sort({ score: -1 }); // Default sort by score descending

    // Additional sorting logic
    if (sortBy) {
        if (sortBy === 'gender') {
            leaderboard.sort((a, b) => a.gender.localeCompare(b.gender));
        } else if (sortBy === 'age') {
            leaderboard.sort((a, b) => a.age - b.age);
        }
    }

    res.json(leaderboard);
};
