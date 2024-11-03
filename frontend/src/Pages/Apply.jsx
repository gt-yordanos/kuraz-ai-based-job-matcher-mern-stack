import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  Button,
  Divider,
  CircularProgress,
  Box,
  useTheme,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuth } from '../Contexts/AuthContext';
import { styled } from '@mui/system';
import StorageIcon from '@mui/icons-material/Storage';
import MessagePopup from '../Components/MessagePopup';
import JobDetails from '../Components/JobDetails';
import ApplicationForm from '../Components/ApplicationForm';

const hardSkillsOptions = ['JavaScript', 'Python', 'Java', 'C++'];
const softSkillsOptions = ['Communication', 'Teamwork', 'Problem-Solving'];
const majorOptions = ['Computer Science', 'Engineering', 'Business', 'Biology'];

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? 'black' : 'white',
  color: theme.palette.mode === 'light' ? 'white' : 'black',
  mx: 'auto',
  height: 50,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 'bold',
  position: 'relative',
  transition: 'none',
  '& .arrow-icon': {
    transition: 'transform 0.2s',
  },
  '&:hover .arrow-icon': {
    transform: 'translateX(5px)', // Move arrow on hover
  },
}));

const ApplyButton = ({ isApplicationProcessing, onClick }) => (
  <StyledButton onClick={onClick} disabled={isApplicationProcessing}>
    {isApplicationProcessing ? (
      <CircularProgress size={24} color="inherit" sx={{ position: 'absolute' }} />
    ) : (
      <>
        Submit Application
        <ArrowForwardIcon sx={{ marginLeft: 1 }} className="arrow-icon" />
      </>
    )}
  </StyledButton>
);

const Apply = () => {
  const { id } = useParams();
  const theme = useTheme();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [profileData, setProfileData] = useState({
    education: [],
    experience: [],
    skills: {
      hardSkills: [],
      softSkills: [],
    },
  });
  const [userInput, setUserInput] = useState({
    education: [],
    experience: [],
    hardSkills: [],
    softSkills: [],
  });
  const [errorMessages, setErrorMessages] = useState({});
  const currentYear = new Date().getFullYear();
  const [years] = useState(Array.from({ length: 56 }, (_, i) => currentYear - 50 + i));
  const [useProfileData, setUseProfileData] = useState({
    education: false,
    experience: false,
    skills: false,
  });
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success');
  const [popupOpen, setPopupOpen] = useState(false);
  const [isApplicationProcessing, setIsApplicationProcessing] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    const fetchApplicantData = async () => {
      if (user?.id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/applicants/${user.id}`);
          setProfileData(response.data);
        } catch (err) {
          console.error(err);
          setError('Failed to fetch applicant data');
        }
      }
    };

    fetchJobDetails();
    fetchApplicantData();
  }, [id, user]);

  const handleApply = async () => {
    setIsApplicationProcessing(true);
    let errors = {};
  
    // Check the cover letter word count
    if (coverLetter.split(' ').length < 200 || coverLetter.split(' ').length > 400) {
      setPopupMessage('Cover letter must be between 200 and 400 words.');
      setPopupType('error');
      setPopupOpen(true);
      setIsApplicationProcessing(false);
      return;
    }
  
    // Validate user input for experience
    userInput.experience.forEach((exp, index) => {
      if (!exp.jobTitle) errors[`expJobTitle${index}`] = 'Job Title is required.';
      if (!exp.company) errors[`expCompany${index}`] = 'Company is required.';
      if (!exp.jobType) errors[`expJobType${index}`] = 'Job Type is required.';
      if (!exp.startDate) errors[`expStartDate${index}`] = 'Start Date is required.';
      if (!exp.endDate) errors[`expEndDate${index}`] = 'End Date is required.';
      if (!exp.description) errors[`expDescription${index}`] = 'Description is required.';
    });
  
    // Validate user input for education
    userInput.education.forEach((edu, index) => {
      if (!edu.degree) errors[`eduDegree${index}`] = 'Degree is required.';
      if (!edu.institution) errors[`eduInstitution${index}`] = 'Institution is required.';
      if (!edu.major) errors[`eduMajor${index}`] = 'Major is required.';
      if (!edu.graduationYear) errors[`eduYear${index}`] = 'Graduation Year is required.';
      if (!edu.cgpa) errors[`eduCgpa${index}`] = 'CGPA is required.';
    });
  
    // Check for validation errors
    if (Object.keys(errors).length) {
      setErrorMessages(errors);
      setIsApplicationProcessing(false);
      return;
    }
  
    // Set useProfileData based on userInput
    setUseProfileData({
      education: userInput.education.length === 0,
      experience: userInput.experience.length === 0,
      skills: userInput.hardSkills.length === 0 && userInput.softSkills.length === 0,
    });
  
    try {
      const applicationData = {
        applicantId: user?.id,
        jobId: id,
        coverLetter,
        qualifications: {
          education: useProfileData.education ? 
            (profileData.education.length ? profileData.education : userInput.education) : 
            userInput.education,
          experience: useProfileData.experience ? 
            (profileData.experience.length ? profileData.experience : userInput.experience) : 
            userInput.experience,
          hardSkills: useProfileData.skills ? 
            (profileData.skills.hardSkills.length ? profileData.skills.hardSkills : userInput.hardSkills) : 
            userInput.hardSkills,
          softSkills: useProfileData.skills ? 
            (profileData.skills.softSkills.length ? profileData.skills.softSkills : userInput.softSkills) : 
            userInput.softSkills,
        },
      };
      console.log('Application Data:', applicationData);

  
      await axios.post('http://localhost:5000/api/applications', applicationData);
      setPopupMessage('Application submitted successfully!');
      setPopupType('success');
      setPopupOpen(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      
      // Check if the error has a response and log the server's message
      if (error.response) {
        setPopupMessage(`Failed to submit application: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        setPopupMessage('Failed to submit application: No response received from the server.');
      } else {
        setPopupMessage(`Error: ${error.message}`);
      }
      
      setPopupType('error');
      setPopupOpen(true);
    } finally {
      setIsApplicationProcessing(false);
    }
  };
  
  

  const addArrayItem = (type) => {
    const defaultExperience = { jobTitle: '', company: '', startDate: '', endDate: '', description: '', jobType: '' };
    const defaultEducation = { degree: '', institution: '', major: '', graduationYear: '', cgpa: '' };
    
    setUserInput(prev => ({
      ...prev,
      [type]: [...prev[type], type === 'education' ? defaultEducation : defaultExperience]
    }));
  };
  
  const handleArrayChange = (index, field, value, type) => {
    setUserInput(prev => {
      const updatedArray = prev[type].map((item, i) => (i === index ? { ...item, [field]: value } : item));
      return { ...prev, [type]: updatedArray };
    });
  };

  const removeArrayItem = (index, type) => {
    setUserInput(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };


  const handlePopupClose = () => {
    setPopupOpen(false);
  };


  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#000' : '#fff'),
        }}
      >
        <CircularProgress color={theme.palette.mode === 'dark' ? '#fff' : '#000'} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
          flexDirection: 'column',
        }}
      >
        <StorageIcon color="error" style={{ fontSize: 80 }} />
        <div style={{ color: 'gray', fontSize: '20px' }}>{error}</div>
      </Box>
    );
  }

  if (!job) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          flexDirection: 'column',
        }}
      >
        <StorageIcon color="error" style={{ fontSize: 80 }} />
        <div style={{ color: 'gray', fontSize: '20px' }}>No job found.</div>
      </Box>
    );
  }

  return (
    <>
      <MessagePopup 
        message={popupMessage} 
        messageType={popupType} 
        open={popupOpen} 
        onClose={handlePopupClose} 
      />

      <Card
        sx={{
          width: { xs: '95%', sm: '80%', md: '60%' },
          backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
          margin: '20px auto',
          borderRadius: '16px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        }}
      >
        <CardContent>
          <JobDetails job={job} />
          <Divider sx={{ margin: '20px 0' }} />
          <ApplicationForm
            userInput={userInput}
            setUserInput={setUserInput}
            handleArrayChange={handleArrayChange}
            errorMessages={errorMessages}
            removeArrayItem={removeArrayItem}
            addArrayItem={addArrayItem}
            years={years}
            coverLetter={coverLetter}
            setCoverLetter={setCoverLetter}
            hardSkillsOptions={hardSkillsOptions}
            softSkillsOptions={softSkillsOptions}
            majorOptions={majorOptions}
          />
          <Divider sx={{ margin: '20px 0' }} />
          <ApplyButton isApplicationProcessing={isApplicationProcessing} onClick={handleApply} />
        </CardContent>
      </Card>
    </>
  );
};

export default Apply;
