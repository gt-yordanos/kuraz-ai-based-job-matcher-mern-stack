import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  useTheme,
  LinearProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaUser, FaGraduationCap, FaBriefcase, FaArrowRight, FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { useAuth } from '../Contexts/AuthContext';
import Axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import MessagePopup from '../Components/MessagePopup';
import ProfileSwitch from '../Components/profileSwitch';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: 16,
  width: '100%',
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderWidth: 1, borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000' },
    '&:hover fieldset, &.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
  },
  '& .MuiInputBase-input, & .MuiFormLabel-root': { color: theme.palette.mode === 'dark' ? '#fff' : '#000' },
  '& .MuiFormHelperText-root': { color: 'red' },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000', color: theme.palette.mode === 'dark' ? '#000' : '#fff',
  '&:hover': { backgroundColor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333' },
}));

const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'smoothgreen',
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  '&:hover': { backgroundColor: '#03E198', filter: 'brightness(1)' },
}));

const RemoveButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'smoothred',
  marginBottom: '8px',
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  '&:hover': { backgroundColor: '#ff6b6b', filter: 'brightness(1.1)' },
}));

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [profileData, setProfileData] = useState({
    firstName: '', lastName: '', email: '', phone: '', birthday: '', gender: '',
    skills: [], experience: [{}], education: [{}], location: '', resume: null,
  });
  const [savedData, setSavedData] = useState({
    firstName: '', lastName: '', email: '', phone: '', birthday: '', gender: '',
    skills: [], experience: [{}], education: [{}], location: '', resume: null,
  });
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [popup, setPopup] = useState({ open: false, message: '', type: 'success' });
  const [profileScore, setProfileScore] = useState(0);

  useEffect(() => {
    if (user) fetchProfileData();
    else {
      const timer = setTimeout(() => navigate('/login'), 3000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);


  const calculateProfileCompletion = (profileData) => {
    let completion = 0;
  
    // Check if personal information fields are filled
    const personalInfoFilled = profileData.firstName && profileData.lastName && profileData.email && 
                               profileData.phone && profileData.birthday && profileData.gender && 
                               profileData.location;
    if (personalInfoFilled) {
      completion += 30; // Personal information is worth 30%
    }
  
    // Check if at least one education entry is filled
    const hasEducation = profileData.education.length > 0;
    const educationFilled = hasEducation && profileData.education.every(edu => edu.degree && edu.institution && 
                                                       edu.major && edu.graduationYear && edu.cgpa);
    if (educationFilled) {
      completion += 25; // Education is worth 25%
    }

    // Check if at least one experience entry is filled
    const hasExperience = profileData.experience.length > 0;
    const experienceFilled = hasExperience && profileData.experience.every(exp => exp.jobTitle && exp.company && 
                                                          exp.startDate && exp.jobType && 
                                                          exp.description && exp.endDate);
    if (experienceFilled) {
      completion += 25; // Experience is worth 25%
    }
  
    // Check if skills array is not empty
    if (profileData.skills && profileData.skills.length > 1) {
      completion += 20; // Skills are worth 20%
    }
  
    return completion; // Return the total completion score
  };
  

  
  const fetchProfileData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { id: userId } = jwtDecode(token);
        const { data } = await Axios.get(`http://localhost:5000/api/applicants/${userId}`);
        setProfileData(data);
        setSavedData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

   // Update profile score whenever the profile data changes
   useEffect(() => {
    const newProfileScore = calculateProfileCompletion(savedData);
    setProfileScore(newProfileScore);
  }, [savedData]);



  const handleChange = ({ target: { name, value } }) => {
    setProfileData(prev => ({ ...prev, [name]: value || '' }));
  };

  const handleArrayChange = (index, name, value, array) => {
    const newArray = [...profileData[array]];
    newArray[index] = { ...newArray[index], [name]: value || '' };
    setProfileData(prev => ({ ...prev, [array]: newArray }));
  };

  const addArrayItem = (array) => {
    setProfileData(prev => ({ ...prev, [array]: [...prev[array], {}] }));
  };

  const removeArrayItem = (index, array) => {
    const newArray = profileData[array].filter((_, i) => i !== index);
    setProfileData(prev => ({ ...prev, [array]: newArray }));
  };

  const saveProfileData = async (section) => {
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).id;
    const payload = section === 'personal' ? {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
      birthday: profileData.birthday,
      gender: profileData.gender,
      location: profileData.location,
      resume: profileData.resume,
    } : section === 'education' ? { education: profileData.education } : section === 'experience' ? { experience: profileData.experience } : { skills: profileData.skills };
  
    try {
      await Axios.put(`http://localhost:5000/api/applicants/${userId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPopup({ open: true, message: `${section.charAt(0).toUpperCase() + section.slice(1)} info saved successfully!`, type: 'success' });
  
      // Update the savedData state to trigger the profile score calculation
      setSavedData(prevSavedData => ({
        ...prevSavedData,
        ...payload,
      }));
  
      return true; // Indicate success
    } catch (error) {
      setPopup({ open: true, message: 'Error saving data. Please try again.', type: 'error' });
      return false; // Indicate failure
    }
  };
  

  const handleNextStep = async () => {
    let isValid = true;
    
    if (step === 0) {
      isValid = profileData.firstName && profileData.lastName && profileData.email && profileData.phone && profileData.birthday && profileData.gender && profileData.location;
    } else if (step === 1) {
      isValid = profileData.education.every(edu => edu.degree && edu.institution && edu.major && edu.graduationYear & edu.cgpa);
    } else if (step === 2) {
      isValid = profileData.experience.every(exp => exp.jobTitle && exp.company && exp.startDate && exp.jobType && exp.description && exp.endDate);
    } else if (step === 3) {
      isValid = profileData.skills.length > 0;
    }

    if (isValid) {
      const sectionNames = ['personal', 'education', 'experience', 'skills'];
      const isSaved = await saveProfileData(sectionNames[step]);
      if (isSaved) {
        setStep(prev => Math.min(prev + 1, 3));
      }
    } else {
      setPopup({ open: true, message: 'Please fill all required fields!', type: 'error' });
    }
  };

  const renderStepContent = () => {
    const stepContent = [
      <div>
        <h2><FaUser /> Personal Information</h2>
        {['firstName', 'lastName', 'email', 'phone', 'location'].map(name => (
          <StyledTextField key={name} name={name} label={name.charAt(0).toUpperCase() + name.slice(1)} value={profileData[name]} onChange={handleChange} required />
        ))}
        <FormControl fullWidth variant="outlined" required sx={{ marginBottom: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select name="gender" value={profileData.gender || ''} onChange={handleChange} label="Gender">
            <MenuItem value="">Select Gender</MenuItem>
            {['Male', 'Female', 'Other'].map(gender => <MenuItem key={gender} value={gender}>{gender}</MenuItem>)}
          </Select>
        </FormControl>
        <StyledTextField name="birthday" label="Birthday" type="date" value={profileData.birthday.split('T')[0]} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
      </div>,
     <div>
     <h2><FaGraduationCap /> Education</h2>
     {profileData.education.map((edu, index) => (
       <div key={index}>
         <FormControl fullWidth variant="outlined" required sx={{ marginBottom: 2 }}>
           <InputLabel>Degree</InputLabel>
           <Select name="degree" value={edu.degree || ''} onChange={e => handleArrayChange(index, 'degree', e.target.value, 'education')} label="Degree">
             <MenuItem value="">Select Degree</MenuItem>
             {['Bachelor', 'Master', 'Doctorate', 'Diploma', 'Certification'].map(degree => <MenuItem key={degree} value={degree}>{degree}</MenuItem>)}
           </Select>
         </FormControl>
         <StyledTextField name="institution" label="Institution" value={edu.institution || ''} onChange={e => handleArrayChange(index, 'institution', e.target.value, 'education')} required />
         <StyledTextField name="major" label="Major" value={edu.major || ''} onChange={e => handleArrayChange(index, 'major', e.target.value, 'education')} required />
         <StyledTextField name="graduationYear" label="Graduation Year" type="number" value={edu.graduationYear || ''} onChange={e => handleArrayChange(index, 'graduationYear', e.target.value, 'education')} required />
         <StyledTextField name="cgpa" label="CGPA" type="number" step="0.01" value={edu.cgpa || ''} onChange={e => handleArrayChange(index, 'cgpa', e.target.value, 'education')} required />
         <RemoveButton onClick={() => removeArrayItem(index, 'education')} startIcon={<FaTrash />}>Remove</RemoveButton>
       </div>
     ))}
     <AddButton onClick={() => addArrayItem('education')} startIcon={<FaPlus />}>Add Education</AddButton>
   </div>,   
      <div>
        <h2><FaBriefcase /> Experience</h2>
        {profileData.experience.map((exp, index) => (
          <div key={index}>
            <StyledTextField name="jobTitle" label="Job Title" value={exp.jobTitle || ''} onChange={e => handleArrayChange(index, 'jobTitle', e.target.value, 'experience')} required />
            <FormControl fullWidth variant="outlined" required sx={{ marginBottom: 2 }}>
              <InputLabel>Job Type</InputLabel>
              <Select name="jobType" value={exp.jobType || ''} onChange={e => handleArrayChange(index, 'jobType', e.target.value, 'experience')} label="Job Type">
                <MenuItem value="">Select Job Type</MenuItem>
                {['Full-Time', 'Part-Time', 'Intern', 'Other', 'Research'].map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
              </Select>
            </FormControl>
            <StyledTextField name="company" label="Company" value={exp.company || ''} onChange={e => handleArrayChange(index, 'company', e.target.value, 'experience')} required />
            <StyledTextField name="startDate" label="Start Date" type="date" value={exp.startDate || ''} onChange={e => handleArrayChange(index, 'startDate', e.target.value, 'experience')} required InputLabelProps={{ shrink: true }} />
            <StyledTextField name="endDate" label="End Date" type="date" value={exp.endDate || ''} onChange={e => handleArrayChange(index, 'endDate', e.target.value, 'experience')} required InputLabelProps={{ shrink: true }} />
            <StyledTextField name="description" label="Job Description" multiline rows={4} value={exp.description || ''} onChange={e => handleArrayChange(index, 'description', e.target.value, 'experience')} required />
            <RemoveButton onClick={() => removeArrayItem(index, 'experience')} startIcon={<FaTrash />}>Remove</RemoveButton>
          </div>
        ))}
        <AddButton onClick={() => addArrayItem('experience')} startIcon={<FaPlus />}>Add Experience</AddButton>
      </div>,
      <div>
        <h2><TipsAndUpdatesIcon /> Skills</h2>
        <StyledTextField name="skills" label="Skills (comma separated)" value={profileData.skills.join(', ')} onChange={e => handleChange({ target: { name: 'skills', value: e.target.value.split(', ') } })} />
      </div>,
    ];

    return stepContent[step];
  };

  const getStatusMessage = () => {
    if (profileScore < 30) {
      return "You have a lot to fill in. Adding your personal details, education, and work experience will help Kuraz AI match you to suitable job opportunities.";
    } 
    if (profileScore < 50) {
      return "Your profile is getting started, but there's still some work to do. Completing your education and experience sections will significantly boost your chances of being ranked higher in job searches by Kuraz AI.";
    }
    if (profileScore < 75) {
      return "You're almost there! Fill in any missing details, especially in your work experience and skills. A complete profile will make you stand out and increase the likelihood of Kuraz AI recommending you for your dream job.";
    }
    if (profileScore < 100) {
      return "Great job! Your profile is nearly complete. Double-check to ensure all details are accurate and add any recent skills or experiences. A perfect profile helps Kuraz AI present you as a top candidate to employers.";
    }
    return "Excellent work! Your profile is fully complete. Kuraz AI will rank you among the top candidates for relevant job matches, increasing your chances of landing your ideal job.";
  };
  


  return (
    <>
      <div style={{ maxWidth: '400px', width: '97%', margin: '0 auto', textAlign: 'center' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }} />
          </Box>
        ) : (
          <>
            <h1>Hi, {profileData.firstName}!</h1>
            <p>{getStatusMessage()}</p>
            <LinearProgress variant="determinate" value={profileScore} sx={{ marginBottom: 2 }} />
            <p>{profileScore.toFixed(0)}%</p>
            <ProfileSwitch
              steps={[FaUser, FaGraduationCap, FaBriefcase, TipsAndUpdatesIcon]}
              currentStep={step}
              onChange={setStep}
            />
          </>
        )}
      </div>
      <Box sx={{
        maxWidth: '400px', width: '97%', margin: '30px auto', padding: 5,
        borderRadius: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
        boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 0 10px rgba(0,0,0,0.1)',
      }}>
        {renderStepContent()}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          {step > 0 && (
            <ButtonStyled type="button" onClick={() => setStep(step - 1)} startIcon={<FaArrowLeft />}>
              Previous
            </ButtonStyled>
          )}
          <ButtonStyled type="button" onClick={handleNextStep} endIcon={step < 3 ? <FaArrowRight /> : null} disabled={loading}>
            {step < 3 ? 'Next' : 'Finish'}
          </ButtonStyled>
        </Box>
        {loading && <CircularProgress sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000', marginTop: 2 }} />}
        <MessagePopup message={popup.message} messageType={popup.type} open={popup.open} onClose={() => setPopup({ ...popup, open: false })} />
      </Box>
    </>
  );
};

export default Profile;
