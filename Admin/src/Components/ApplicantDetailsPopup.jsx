import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Divider, useTheme,
    IconButton, Card, CardContent, CardHeader
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CloseIcon from '@mui/icons-material/Close';
import InterviewIcon from '@mui/icons-material/HowToReg';
import SchoolIcon from '@mui/icons-material/School';
const ApplicantDetailsPopup = ({ selectedRow, setSelectedRow }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [applicantData, setApplicantData] = useState(null);
    const [applicationData, setApplicationData] = useState(null);
    const [leaderboardData, setLeaderboardData] = useState(null);
    const [interviewDate, setInterviewDate] = useState('');
    const [interviewers, setInterviewers] = useState('');
    const theme = useTheme();

    const fetchApplicantData = async (applicantId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/applicants/${applicantId}`);
            setApplicantData(response.data);
        } catch (error) {
            console.error('Error fetching applicant data:', error);
        }
    };

    const fetchApplicationData = async (applicationId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/applications/${applicationId}`);
            setApplicationData(response.data);
        } catch (error) {
            console.error('Error fetching application data:', error);
        }
    };

    const fetchLeaderboardData = async (applicationId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/leaderboards/${applicationId}`);
            setLeaderboardData(response.data);
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
        }
    };

    useEffect(() => {
        if (selectedRow) {
            setIsOpen(true);
            if (selectedRow.applicantId) {
                fetchApplicantData(selectedRow.applicantId?._id);
            }
            if (selectedRow.applicationId) {
                fetchApplicationData(selectedRow.applicationId);
                fetchLeaderboardData(selectedRow.applicationId);
            }
        }
    }, [selectedRow]);

    const handleInterviewSubmit = (e) => {
        e.preventDefault();
        if (!interviewDate || !interviewers) {
            alert("Please fill in all fields to schedule an interview.");
            return;
        }
        console.log("Interview scheduled on:", interviewDate, "with interviewers:", interviewers);
    };

    const handleClose = () => {
        setIsOpen(false);
        setSelectedRow(null);
    };

    const calculateAge = (birthdate) => {
        const birthDate = new Date(birthdate);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        const month = currentDate.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && currentDate.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontWeight: 600, position: 'relative', backgroundColor: theme.palette.mode === 'dark' ? '#242424' : '#e0e0e0' }}>
                Applicant Details
                <IconButton
                    onClick={handleClose}
                    edge="end"
                    color="inherit"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: '20px',
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#242424' : '#e0e0e0' }}>
                {/* Applicant Information */}
                {applicantData && (
                    <Card sx={{ mb: 2, backgroundColor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#c0c0c0' }}>
                        <CardHeader title="Personal Information" avatar={<PersonIcon />} />
                        <CardContent>
                            <div><strong>Name:</strong> {applicantData?.firstName} {applicantData?.lastName}</div>
                            <div><strong>Email:</strong> {applicantData?.email}</div>
                            <div><strong>Phone:</strong> {applicantData?.phone}</div>
                            <div><strong>Location:</strong> {applicantData?.location}</div>
                            <div><strong>Gender:</strong> {applicantData?.gender}</div>
                            <div><strong>Age:</strong> {applicantData?.birthday ? calculateAge(applicantData.birthday) : 'N/A'}</div>
                        </CardContent>
                    </Card>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Education Section */}
                {applicationData?.qualifications?.education && (
                    <Card sx={{ mb: 2, backgroundColor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#c0c0c0' }}>
                        <CardHeader title="Education" avatar={<SchoolIcon />} />
                        <CardContent>
                            {applicationData?.qualifications?.education.map((edu, index) => (
                                <div key={index}>
                                    <div><strong>Degree:</strong> {edu.degree}</div>
                                    <div><strong>Institution:</strong> {edu.institution}</div>
                                    <div><strong>Major:</strong> {edu.major}</div>
                                    <div><strong>Graduation Year:</strong> {edu.graduationYear}</div>
                                    <div><strong>CGPA:</strong> {edu.cgpa || 'N/A'}</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Experience Section */}
                {applicationData?.qualifications?.experience && (
                    <Card sx={{ mb: 2, backgroundColor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#c0c0c0' }}>
                        <CardHeader title="Experience" avatar={<WorkIcon />} />
                        <CardContent>
                            {applicationData?.qualifications?.experience.map((exp, index) => (
                                <div key={index}>
                                    <div><strong>Job Title:</strong> {exp.jobTitle}</div>
                                    <div><strong>Company:</strong> {exp.company}</div>
                                    <div><strong>Start Date:</strong> {new Date(exp.startDate).toLocaleDateString()}</div>
                                    <div><strong>End Date:</strong> {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</div>
                                    <div><strong>Job Type:</strong> {exp.jobType}</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Leaderboard Data Section */}
                <Card sx={{ mb: 2, backgroundColor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#c0c0c0' }}>
                    <CardHeader title="Leaderboard Information" avatar={<LeaderboardIcon />} />
                    <CardContent>
                        <div><strong>Score:</strong> {selectedRow?.score}</div>
                        <div><strong>Matched Hard Skills:</strong> {selectedRow?.matchedHardSkills?.join(', ') || 'N/A'}</div>
                        <div><strong>Matched Soft Skills:</strong> {selectedRow?.matchedSoftSkills?.join(', ') || 'N/A'}</div>
                        <div><strong>Major Match:</strong> {selectedRow?.majorMatch ? 'Yes' : 'No'}</div>
                        <div><strong>Degree Match:</strong> {selectedRow?.degreeMatch ? 'Yes' : 'No'}</div>
                        <div><strong>GPA:</strong> {selectedRow?.gpa || 'N/A'}</div>
                        <div><strong>Meets GPA Requirement:</strong> {selectedRow?.meetsGpa ? 'Yes' : 'No'}</div>
                        <div><strong>Experience:</strong> {selectedRow?.experienceYears} years</div>
                        <div><strong>Has Minimum Experience:</strong> {selectedRow?.hasMinimumExperience ? 'Yes' : 'No'}</div>
                        <div><strong>Skill Match Percentage:</strong> {selectedRow?.skillMatchPercentage}%</div>
                        <div><strong>Hard Skill Match Percentage:</strong> {selectedRow?.hardSkillMatchPercentage}%</div>
                        <div><strong>Soft Skill Match Percentage:</strong> {selectedRow?.softSkillMatchPercentage}%</div>
                    </CardContent>
                </Card>

                <Divider sx={{ my: 2 }} />

                {/* Application Details Section */}
                {applicationData && (
                    <Card sx={{ mb: 2, backgroundColor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#c0c0c0' }}>
                        <CardHeader title="Application Details" avatar={<WorkIcon />} />
                        <CardContent>
                            <div><strong>Application Status:</strong> {applicationData?.status}</div>
                            <div><strong>Job Title:</strong> {applicationData?.jobTitle}</div>
                            <div><strong>Job Type:</strong> {applicationData?.jobType}</div>
                            <div><strong>Location:</strong> {applicationData?.location}</div>
                            <div><strong>Application Date:</strong> {new Date(applicationData?.applicationDate).toLocaleDateString()}</div>
                            <div><strong>Applied By:</strong> {applicationData?.appliedBy}</div>
                        </CardContent>
                    </Card>
                )}

                <Divider sx={{ my: 2 }} />

               {/* Schedule Interview Section */}
<Card sx={{ mb: 2, backgroundColor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#c0c0c0' }}>
    <CardHeader title="Schedule Interview" avatar={<InterviewIcon />} />
    <CardContent>
        <TextField
            label="Interview Date"
            type="date"
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // Border color based on theme
                    },
                    '&:hover fieldset': {
                        borderColor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333333', // Hover color for a subtle effect
                    },
                },
            }}
        />
        <TextField
            label="Interviewers"
            value={interviewers}
            onChange={(e) => setInterviewers(e.target.value)}
            fullWidth
            sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000', // Border color based on theme
                    },
                    '&:hover fieldset': {
                        borderColor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333333', // Hover color for a subtle effect
                    },
                },
            }}
        />
        <Button
            onClick={handleInterviewSubmit}
            variant="contained"
            color="primary"
            fullWidth
            sx={{
                height: '56px', // Adjust the height as desired
            }}
        >
            Schedule Interview
        </Button>
    </CardContent>
</Card>

            </DialogContent>
        </Dialog>
    );
};

export default ApplicantDetailsPopup;
