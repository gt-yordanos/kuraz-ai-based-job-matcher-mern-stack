import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Divider, useTheme, IconButton, CardContent, Card } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import InterviewIcon from '@mui/icons-material/HowToReg';
import CloseIcon from '@mui/icons-material/Close';
import MessagePopup from './MessagePopup';

const ApplicantDetailsPopup = ({ selectedRow, setSelectedRow }) => {
   const [isOpen, setIsOpen] = useState(false);
    const [applicantData, setApplicantData] = useState(null);
    const [applicationData, setApplicationData] = useState(null);
    const [interviewDate, setInterviewDate] = useState('');
    const [interviewers, setInterviewers] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success'); // success or error
    const [openMessage, setOpenMessage] = useState(false);
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

    const handleInterviewSubmit = async (e) => {
        e.preventDefault();
        
        // Check if any field is empty
        if (!interviewDate || !interviewers) {
            setMessage("Please fill in all fields to schedule an interview.");
            setMessageType("error");
            setOpenMessage(true);  // Open the message popup when fields are empty
            return;
        }
    
        // Construct the payload for the API
        const interviewData = {
            interviewDate,
            interviewers,
            hrStaffId: "HR_Staff_ID",  // Replace with actual HR staff ID
        };
    
        try {
            // API Call to schedule interview
            const response = await axios.patch(
                `http://localhost:5000/api/applications/${selectedRow.applicationId}/interview/schedule`,
                interviewData
            );
            
            if (response.status === 200) {
                setMessage('Interview successfully scheduled!');
                setMessageType('success');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error scheduling interview.');
            setMessageType('error');
        }
    
        // Open the message popup
        setOpenMessage(true);
    };
    

    const handleCloseMessage = () => {
        setOpenMessage(false);  // Close message popup after timeout
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

    const getCardStyles = () => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#212121' : '#f2f2f2',
        border: `2px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
    });

    const buttonStyles = {
        height: '50px',
        backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
        color: theme.palette.mode === 'dark' ? '#000' : '#fff',
        '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333',
        },
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    };

    return (
        <>
        <div
            className='modal'
            style={{
                display: isOpen ? 'block' : 'none',
                position: 'fixed',
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                maxWidth: '800px',
                backgroundColor: theme.palette.mode === 'dark' ? '#212121' : '#f2f2f2',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                overflowY: 'auto',
                maxHeight: '80vh',
                boxShadow: '0 1px 15px rgba(0, 0, 0, 0.6)',
            }}
        >
            {/* Fixed Title and Close Icon */}
            <div style={{ position: 'sticky', top: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.palette.mode === 'dark' ? '#212121' : '#f2f2f2', marginBottom: '5px' }}>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, marginLeft: '20px' }}>Applicant Details</h2>
                <IconButton onClick={handleClose} color="inherit" style={{ marginRight: '20px' }}>
                    <CloseIcon />
                </IconButton>
            </div>

            {/* Applicant Details Content */}
            <div style={{
                  padding: '0 20px 20px 20px',
            }}>
                {/* Applicant Information */}
                {applicantData && (
                    <div style={getCardStyles()}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <PersonIcon style={{ marginRight: '10px' }} />
                            <h3 style={{ fontFamily: 'Poppins, sans-serif' }}>Personal Information</h3>
                        </div>
                        <CardContent>
                            <div><strong>Name:</strong> {applicantData?.firstName} {applicantData?.lastName}</div>
                            <div><strong>Email:</strong> {applicantData?.email}</div>
                            <div><strong>Phone:</strong> {applicantData?.phone}</div>
                            <div><strong>Location:</strong> {applicantData?.location}</div>
                            <div><strong>Gender:</strong> {applicantData?.gender}</div>
                            <div><strong>Age:</strong> {applicantData?.birthday ? calculateAge(applicantData.birthday) : 'N/A'}</div>
                        </CardContent>
                    </div>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Education Section */}
                {applicationData?.qualifications?.education && (
                    <div style={getCardStyles()}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <SchoolIcon style={{ marginRight: '10px' }} />
                            <h3 style={{ fontFamily: 'Poppins, sans-serif' }}>Education</h3>
                        </div>
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
                    </div>
                )}

                {/* Experience Section */}
                {applicationData?.qualifications?.experience && (
                    <div style={getCardStyles()}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <WorkIcon style={{ marginRight: '10px' }} />
                            <h3 style={{ fontFamily: 'Poppins, sans-serif' }}>Experience</h3>
                        </div>
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
                    </div>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Leaderboard Data Section */}
                <div style={getCardStyles()}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <LeaderboardIcon style={{ marginRight: '10px' }} />
                        <h3 style={{ fontFamily: 'Poppins, sans-serif' }}>Leaderboard Information</h3>
                    </div>
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
                    </CardContent>
                </div>

                <Divider sx={{ my: 2 }} />

                {/* Schedule Interview Section */}
                <div style={getCardStyles()}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <InterviewIcon style={{ marginRight: '10px' }} />
                        <h3 style={{ fontFamily: 'Poppins, sans-serif' }}>Schedule Interview</h3>
                    </div>
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
                                        borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333',
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
                                        borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333',
                                    },
                                },
                            }}
                        />
                        <Button
                            onClick={handleInterviewSubmit}
                            variant="contained"
                            sx={buttonStyles}
                        >
                            Schedule Interview
                        </Button>
                    </CardContent>
                </div>
            </div>
           
        </div>
         <MessagePopup
         message={message}
         messageType={messageType}
         open={openMessage}
         onClose={handleCloseMessage}
     />
    </>
    );
};

export default ApplicantDetailsPopup;
