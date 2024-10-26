import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, TextField, Button, CircularProgress, useTheme, LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaUser, FaGraduationCap, FaBriefcase, FaArrowRight, FaArrowLeft, FaPlus, FaUpload } from 'react-icons/fa';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { useAuth } from '../Contexts/AuthContext';
import Axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import MessagePopup from '../Components/MessagePopup';

// Styled components
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: 16,
  width: '100%',
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderWidth: 1, borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000' },
    '&:hover fieldset, &.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
  },
  '& .MuiInputBase-input, & .MuiFormLabel-root': { color: theme.palette.mode === 'dark' ? '#fff' : '#000' },
  '& .MuiFormHelperText-root': { color: 'red' },
  '& .MuiInputBase-input::placeholder': { color: theme.palette.mode === 'dark' ? '#aaa' : '#555' },
}));

const SwitchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#242424' : '#e0e0e0',
  borderRadius: 50,
  padding: 4,
  marginBottom: 16,
}));

const SwitchButton = styled('div')(({ selected, theme }) => ({
  padding: '16px',
  borderRadius: 20,
  cursor: 'pointer',
  margin: '0 2px',
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: selected ? (theme.palette.mode === 'dark' ? '#fff' : '#000') : 'transparent',
  color: selected ? (theme.palette.mode === 'dark' ? '#000' : '#fff') : 'inherit',
  fontSize: 24,
}));

const ButtonStyled = styled(Button)(({ theme, variant }) => ({
  backgroundColor: variant === 'nav' 
    ? (theme.palette.mode === 'dark' ? '#fff' : '#000')  // Background color for nav buttons
    : (theme.palette.mode === 'dark' ? '#fff' : '#000'),  // Background color for other buttons
  color: variant === 'nav' 
    ? (theme.palette.mode === 'dark' ? '#000' : '#fff')    // Text color for nav buttons
    : theme.palette.mode === 'dark' ? '#000' : '#fff',      // Text color for other buttons
  '&:hover': { 
    backgroundColor: variant === 'nav' 
      ? (theme.palette.mode === 'dark' ? '#666' : '#ccc') // Hover color for nav buttons
      : (theme.palette.mode === 'dark' ? '#e0e0e0' : '#333') 
  },
  ...(variant === 'nav' && { width: '120px' }),
}));


const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [profileData, setProfileData] = useState({
    firstName: '', lastName: '', email: '', phone: '', birthday: '',
    gender: '', skills: [], experience: [{}], education: [{}], location: '', resume: null,
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

  const fetchProfileData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { id: userId } = jwtDecode(token);
        const { data } = await Axios.get(`http://localhost:5000/api/applicants/${userId}`);
        setProfileData(data);
        setProfileScore(data.profileCompletion || 0);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setProfileData(prev => ({ ...prev, [name]: value || '' })); // Ensure value is always defined
  };

  const handleArrayChange = (index, name, value, array) => {
    const newArray = [...profileData[array]];
    newArray[index] = { ...newArray[index], [name]: value || '' }; // Ensure value is always defined
    setProfileData(prev => ({ ...prev, [array]: newArray }));
  };

  const addArrayItem = (array) => {
    setProfileData(prev => ({ ...prev, [array]: [...prev[array], {}] }));
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (file?.type === 'application/pdf') {
      setProfileData(prev => ({ ...prev, resume: file }));
      await saveProfileData();
    } else {
      setPopup({ open: true, message: 'Please upload a valid PDF file.', type: 'error' });
    }
  };

  const saveProfileData = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const { id: userId } = jwtDecode(token);
    
    const formData = new FormData();
    Object.entries(profileData).forEach(([key, value]) => {
      formData.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
    });
    
    try {
      const response = await Axios.put(`http://localhost:5000/api/applicants/${userId}`, formData);
      setProfileScore(response.data.profileCompletion);
      setPopup({ open: true, message: 'Profile saved successfully!', type: 'success' });
    } catch (error) {
      setPopup({ open: true, message: 'Error saving profile. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const validateCurrentStep = () => {
    switch (step) {
      case 0:
        return profileData.firstName && profileData.lastName && profileData.email && profileData.phone && profileData.gender && profileData.birthday;
      case 1:
        return profileData.education.every(edu => edu.degree && edu.institution && edu.graduationYear);
      case 2:
        return profileData.experience.every(exp => exp.jobTitle && exp.company && exp.jobType && exp.startDate);
      case 3:
        return profileData.skills.length > 0;
      default:
        return true;
    }
  };

  const nextStep = async () => {
    if (validateCurrentStep()) {
      await saveProfileData();
      setStep(prevStep => (prevStep < 3 ? prevStep + 1 : prevStep));
    } else {
      setPopup({ open: true, message: 'Please fill out all required fields before proceeding.', type: 'error' });
    }
  };

  const renderStepContent = () => {
    const stepContent = [
      <>
        <h2><FaUser /> Personal Information</h2>
        {['firstName', 'lastName', 'email', 'phone', 'location'].map(name => (
          <StyledTextField key={name} name={name} label={name.charAt(0).toUpperCase() + name.slice(1)} value={profileData[name]} onChange={handleChange} required />
        ))}
        <StyledTextField select name="gender" label="Gender" value={profileData.gender || ''} onChange={handleChange} SelectProps={{ native: true }} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </StyledTextField>
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <StyledTextField name="resume" label="Resume (PDF)" value={profileData.resume ? profileData.resume.name : ''} InputProps={{ readOnly: true }} fullWidth />
          <ButtonStyled variant="upload" component="label" sx={{ position: 'absolute', right: 0 }}>
            <FaUpload />
            <input type="file" hidden accept="application/pdf" onChange={handleResumeChange} />
          </ButtonStyled>
        </Box>
        <StyledTextField name="birthday" label="Birthday" type="date" value={profileData.birthday.split('T')[0]} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
      </>,
      <>
        <h2><FaGraduationCap /> Education</h2>
        {profileData.education.map((edu, index) => (
          <div key={index}>
            <StyledTextField select name="degree" label="Degree" value={edu.degree || ''} onChange={e => handleArrayChange(index, 'degree', e.target.value, 'education')} SelectProps={{ native: true }} required>
              <option value="">Select Degree</option>
              {['associate/diploma', 'bachelor', 'masters', 'phd'].map(deg => <option key={deg} value={deg}>{deg.charAt(0).toUpperCase() + deg.slice(1)}</option>)}
            </StyledTextField>
            {['institution', 'graduationYear'].map(field => (
              <StyledTextField key={field} name={field} label={field.charAt(0).toUpperCase() + field.slice(1)} value={edu[field] || ''} onChange={e => handleArrayChange(index, field, e.target.value, 'education')} required />
            ))}
          </div>
        ))}
        <ButtonStyled variant="upload" onClick={() => addArrayItem('education')} startIcon={<FaPlus />}>Add Education</ButtonStyled>
      </>,
      <>
        <h2><FaBriefcase /> Experience</h2>
        {profileData.experience.map((exp, index) => (
          <div key={index}>
            {['jobTitle', 'company'].map(field => (
              <StyledTextField key={field} name={field} label={field.charAt(0).toUpperCase() + field.slice(1)} value={exp[field] || ''} onChange={e => handleArrayChange(index, field, e.target.value, 'experience')} required />
            ))}
            <StyledTextField select name="jobType" label="Job Type" value={exp.jobType || ''} onChange={e => handleArrayChange(index, 'jobType', e.target.value, 'experience')} SelectProps={{ native: true }} required>
              <option value="">Select Job Type</option>
              {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => <option key={type} value={type}>{type}</option>)}
            </StyledTextField>
            {['startDate', 'endDate'].map(field => (
              <StyledTextField key={field} name={field} label={field.charAt(0).toUpperCase() + field.slice(1)} type="date" value={exp[field]?.split('T')[0] || ''} onChange={e => handleArrayChange(index, field, e.target.value, 'experience')} required InputLabelProps={{ shrink: true }} />
            ))}
            <StyledTextField name="description" label="Description" value={exp.description || ''} onChange={e => handleArrayChange(index, 'description', e.target.value, 'experience')} required multiline rows={4} />
          </div>
        ))}
        <ButtonStyled variant="upload" onClick={() => addArrayItem('experience')} startIcon={<FaPlus />}>Add Experience</ButtonStyled>
      </>,
      <>
        <h2><TipsAndUpdatesIcon /> Skills</h2>
        <StyledTextField name="skills" label="Skills (comma separated)" value={profileData.skills.join(', ')} onChange={e => handleChange({ target: { name: 'skills', value: e.target.value.split(', ') } })} />
      </>,
    ];
    return stepContent[step];
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
            <p>{profileData.firstName ? 'Finish filling your profile.' : 'Please complete your profile.'}</p>
            <p>Our AI assistant will help rank you top to employers!</p>
            <LinearProgress variant="determinate" value={profileScore} sx={{ marginBottom: 2 }} />
            <p>{profileScore.toFixed(0)}%</p>
            <SwitchContainer>
              {[FaUser, FaGraduationCap, FaBriefcase, TipsAndUpdatesIcon].map((Icon, index) => (
                <SwitchButton key={index} selected={step === index} onClick={() => setStep(index)}>
                  <Icon />
                </SwitchButton>
              ))}
            </SwitchContainer>
          </>
        )}
      </div>
      <Box sx={{
        maxWidth: '400px', width: '97%', margin: '30px auto', padding: 5,
        borderRadius: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
        boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 0 10px rgba(0,0,0,0.1)',
      }}>
        {renderStepContent()}
        <form onSubmit={e => { e.preventDefault(); saveProfileData(); }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            {step > 0 && (
              <ButtonStyled variant="nav" type="button" onClick={() => setStep(step - 1)} startIcon={<FaArrowLeft />}>
                Previous
              </ButtonStyled>
            )}
            <ButtonStyled variant="nav" type="button" onClick={nextStep} endIcon={step < 3 ? <FaArrowRight /> : null} disabled={loading}>
              {step < 3 ? 'Next' : 'Finish'}
            </ButtonStyled>
          </Box>
          {loading && <CircularProgress sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000', marginTop: 2 }} />}
        </form>
        <MessagePopup message={popup.message} messageType={popup.type} open={popup.open} onClose={() => setPopup({ ...popup, open: false })} />
      </Box>
    </>
  );
};

export default Profile;
