import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, CircularProgress, useTheme, LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaUser, FaGraduationCap, FaBriefcase, FaArrowRight, FaArrowLeft, FaPlus, FaUpload } from 'react-icons/fa';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { useAuth } from '../Contexts/AuthContext';
import Axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Updated import for jwt-decode
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
}));

const SwitchContainer = styled(Box)(({ theme }) => ({
  display: 'flex', justifyContent: 'center', backgroundColor: theme.palette.mode === 'dark' ? '#242424' : '#e0e0e0', borderRadius: 50, padding: 4, marginBottom: 16,
}));

const SwitchButton = styled('div')(({ selected, theme }) => ({
  padding: '16px', borderRadius: 20, cursor: 'pointer', margin: '0 2px', flexGrow: 1,
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  backgroundColor: selected ? (theme.palette.mode === 'dark' ? '#fff' : '#000') : 'transparent',
  color: selected ? (theme.palette.mode === 'dark' ? '#000' : '#fff') : 'inherit', fontSize: 24,
}));

const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#fff' : '#000', backgroundColor: 'transparent',
  '&:hover': { backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000', color: theme.palette.mode === 'dark' ? '#000' : '#fff' },
}));

const UploadButton = styled(Button)(({ theme }) => ({
  position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', height: '36px',
  backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
  color: theme.palette.mode === 'dark' ? '#000' : '#fff',
  '&:hover': { backgroundColor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333' },
}));

const NavButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
  color: theme.palette.mode === 'dark' ? '#000' : '#fff',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333',
  },
}));

const Profile = () => {
  const { user } = useAuth(); // Get user from Auth context
  const theme = useTheme();

  const [profileData, setProfileData] = useState({
    firstName: '', lastName: '', email: '', phone: '', birthday: '',
    gender: '', skills: [], experience: [{}], education: [{}], location: '', resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success');
  const [profileScore, setProfileScore] = useState(0);

  // Function to fetch profile data
  const fetchProfileData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Use jwtDecode directly
        const userId = decodedToken.id; // Adjust this based on your token structure
        const { data } = await Axios.get(`http://localhost:5000/api/applicants/${userId}`);
        setProfileData(data);
        setProfileScore(data.profileCompletion);
      } catch (error) {
        console.error('Token decoding failed or fetching profile failed:', error);
      }
    }
  };

  // Call fetchProfileData when component is mounted
  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleChange = ({ target: { name, value } }) => setProfileData(prev => ({ ...prev, [name]: value }));

  const handleArrayChange = (index, name, value, array) => {
    const newArray = [...profileData[array]];
    newArray[index][name] = value;
    setProfileData(prev => ({ ...prev, [array]: newArray }));
    saveProfileData();
  };

  const addArrayItem = (array) => {
    setProfileData(prev => ({ ...prev, [array]: [...prev[array], {}] }));
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setProfileData(prev => ({ ...prev, resume: file }));
      await saveProfileData(); // Save profile data after resume change
    } else {
      setPopupMessage('Please upload a valid PDF file.');
      setPopupType('error');
      setOpenPopup(true);
    }
  };

  const saveProfileData = async () => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(profileData).forEach(([key, value]) => formData.append(key, value));
    try {
      await Axios.put(`http://localhost:5000/api/applicants/${profileData._id}`, formData);
      setPopupMessage('Profile saved successfully!');
    } catch (error) {
      setPopupMessage('Error saving profile. Please try again.');
      setPopupType('error');
    } finally {
      setLoading(false);
      setOpenPopup(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveProfileData();
  };

  const nextStep = async () => {
    await saveProfileData();
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const renderStepContent = () => {
    const stepContent = [
      <>
        <h2><FaUser /> Personal Information</h2>
        {['firstName', 'lastName', 'email', 'phone', 'location', 'gender'].map(name => (
          <StyledTextField key={name} name={name} label={name.charAt(0).toUpperCase() + name.slice(1)} value={profileData[name]} onChange={handleChange} required />
        ))}
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <StyledTextField
            name="resume"
            label="Resume (PDF)"
            value={profileData.resume ? profileData.resume.name : ''}
            InputProps={{ readOnly: true }} fullWidth
          />
          <UploadButton component="label">
            <FaUpload />
            <input type="file" hidden accept="application/pdf" onChange={handleResumeChange} />
          </UploadButton>
        </Box>
        <StyledTextField name="birthday" label="Birthday" type="date" value={profileData.birthday.split('T')[0]} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
      </>,
      <>
        <h2><FaGraduationCap /> Education</h2>
        {profileData.education.map((edu, index) => (
          <div key={index}>
            {['degree', 'institution', 'graduationYear'].map(field => (
              <StyledTextField key={field} name={field} label={field.charAt(0).toUpperCase() + field.slice(1)} value={edu[field]} onChange={e => handleArrayChange(index, field, e.target.value, 'education')} required />
            ))}
          </div>
        ))}
        <AddButton onClick={() => addArrayItem('education')} startIcon={<FaPlus />}>Add Education</AddButton>
      </>,
      <>
        <h2><FaBriefcase /> Experience</h2>
        {profileData.experience.map((exp, index) => (
          <div key={index}>
            {['jobTitle', 'company', 'startDate', 'endDate', 'description'].map(field => (
              <StyledTextField key={field} name={field} label={field.charAt(0).toUpperCase() + field.slice(1)} value={exp[field]} onChange={e => handleArrayChange(index, field, e.target.value, 'experience')} required={field !== 'description'} multiline={field === 'description'} rows={field === 'description' ? 4 : 1} />
            ))}
          </div>
        ))}
        <AddButton onClick={() => addArrayItem('experience')} startIcon={<FaPlus />}>Add Experience</AddButton>
      </>,
      <>
        <h2><TipsAndUpdatesIcon /> Skills</h2>
        <StyledTextField name="skills" label="Skills (comma separated)" value={profileData.skills.join(', ')} onChange={e => handleChange({ target: { name: 'skills', value: e.target.value.split(',').map(skill => skill.trim()) } })} />
      </>
    ];
    return stepContent[step];
  };

  return (
    <>
      <div style={{ maxWidth: '400px', width: '97%', margin: '0 auto', textAlign: 'center' }}>
        <h1>Hi, {profileData.firstName || 'User'}!</h1>
        <p>{profileData.firstName ? 'Finish filling your profile.' : 'Please complete your profile.'}</p>
        <p>Our AI assistant will help rank you top to employers!</p>
        <LinearProgress variant="determinate" value={profileScore} sx={{ marginBottom: 2 }} />
        <p>{profileScore.toFixed(0)}%</p>
        <SwitchContainer>
          {[FaUser, FaGraduationCap, FaBriefcase, TipsAndUpdatesIcon].map((Icon, index) => (
            <SwitchButton key={index} selected={step === index} onClick={() => setStep(index)}><Icon /></SwitchButton>
          ))}
        </SwitchContainer>
      </div>
      <Box sx={{ maxWidth: '400px', width: '97%', margin: '30px auto', padding: 5, borderRadius: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}`, boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 0 10px rgba(0,0,0,0.1)' }}>
        {renderStepContent()}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            {step > 0 && <NavButton type="button" onClick={() => setStep(step - 1)} startIcon={<FaArrowLeft />}>Previous</NavButton>}
            <NavButton type="button" onClick={nextStep} endIcon={step < 3 ? <FaArrowRight /> : null} disabled={loading}>
              {step < 3 ? 'Next' : 'Finish'}
            </NavButton>
          </Box>
          {loading && <CircularProgress />}
        </form>
        <MessagePopup message={popupMessage} messageType={popupType} open={openPopup} onClose={() => setOpenPopup(false)} />
      </Box>
    </>
  );
};

export default Profile;
