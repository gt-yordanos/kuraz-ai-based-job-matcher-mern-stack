import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, CircularProgress, useTheme, LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaUser, FaGraduationCap, FaBriefcase, FaStar, FaArrowRight, FaArrowLeft, FaPlus } from 'react-icons/fa';
import { useAuth } from '../Contexts/AuthContext';
import Axios from 'axios';
import MessagePopup from '../Components/MessagePopup';
import { getDocument } from 'pdfjs-dist/build/pdf';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: 16,
  width: '100%',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderWidth: 1,
      borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
    '&:hover fieldset, &.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input, & .MuiFormLabel-root': {
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  },
  '& .MuiFormHelperText-root': {
    color: 'red',
  },
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

const AddButton = styled(Button)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
    color: theme.palette.mode === 'dark' ? '#000' : '#fff',
  },
}));

const Profile = () => {
  const { user } = useAuth();
  const theme = useTheme();

  const [profileData, setProfileData] = useState({
    firstName: '', lastName: '', email: '', phone: '', birthday: '',
    skills: [], experience: [{ jobTitle: '', company: '', startDate: '', endDate: '', description: '' }],
    education: [{ degree: '', institution: '', graduationYear: '' }], location: '', resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success');
  const [profileScore, setProfileScore] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const response = await Axios.get(`http://localhost:5000/api/applicants/${user}`);
        setProfileData(response.data);
        setProfileScore(response.data.profileCompletion);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setPopupMessage('Error fetching profile. Please try again.');
        setPopupType('error');
        setOpenPopup(true);
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    setProfileData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleExperienceChange = (index, { target: { name, value } }) => {
    const newExperience = [...profileData.experience];
    newExperience[index][name] = value;
    setProfileData(prevData => ({ ...prevData, experience: newExperience }));
  };

  const addExperience = () => {
    setProfileData(prevData => ({
      ...prevData,
      experience: [...prevData.experience, { jobTitle: '', company: '', startDate: '', endDate: '', description: '' }],
    }));
  };

  const handleEducationChange = (index, { target: { name, value } }) => {
    const newEducation = [...profileData.education];
    newEducation[index][name] = value;
    setProfileData(prevData => ({ ...prevData, education: newEducation }));
  };

  const addEducation = () => {
    setProfileData(prevData => ({
      ...prevData,
      education: [...prevData.education, { degree: '', institution: '', graduationYear: '' }],
    }));
  };

  const handleSkillChange = ({ target: { value } }) => {
    const skillsArray = value.split(',').map(skill => skill.trim());
    setProfileData(prevData => ({ ...prevData, skills: skillsArray }));
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setProfileData(prevData => ({ ...prevData, resume: file }));
      const text = await extractTextFromPDF(file);
      console.log('Extracted text from resume:', text);
    } else {
      setPopupMessage('Please upload a valid PDF file.');
      setPopupType('error');
      setOpenPopup(true);
    }
  };

  const extractTextFromPDF = async (file) => {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await getDocument(typedArray).promise;
        let text = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const pageText = await page.getTextContent();
          pageText.items.forEach(item => {
            text += item.str + ' ';
          });
        }
        resolve(text);
      };
      fileReader.onerror = reject;
      fileReader.readAsArrayBuffer(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(profileData).forEach(([key, value]) => formData.append(key, value));

    try {
      await Axios.put(`http://localhost:5000/api/applicants/${user}`, formData);
      setPopupMessage('Profile updated successfully!');
      setPopupType('success');
    } catch (error) {
      setPopupMessage('Error updating profile. Please try again.');
      setPopupType('error');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
      setOpenPopup(true);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const previousStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 0: return (
        <div>
          <h2><FaUser /> Personal Information</h2>
          <StyledTextField name="firstName" label="First Name" value={profileData.firstName} onChange={handleChange} required />
          <StyledTextField name="lastName" label="Last Name" value={profileData.lastName} onChange={handleChange} required />
          <StyledTextField name="email" label="Email" value={profileData.email} onChange={handleChange} disabled />
          <StyledTextField name="phone" label="Phone" value={profileData.phone} onChange={handleChange} />
          <StyledTextField name="location" label="Location" value={profileData.location} onChange={handleChange} required />
          <StyledTextField type="file" inputProps={{ accept: 'application/pdf' }} onChange={handleResumeChange} required label="Resume (PDF)" />
          <StyledTextField name="birthday" label="Birthday" type="date" value={profileData.birthday.split('T')[0]} onChange={handleChange} required InputLabelProps={{ shrink: true }} />
        </div>
      );
      case 1: return (
        <div>
          <h2><FaGraduationCap /> Education</h2>
          {profileData.education.map((edu, index) => (
            <div key={index}>
              <StyledTextField name="degree" label="Degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} required />
              <StyledTextField name="institution" label="Institution" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} required />
              <StyledTextField name="graduationYear" label="Graduation Year" type="number" value={edu.graduationYear} onChange={(e) => handleEducationChange(index, e)} required />
            </div>
          ))}
          <AddButton onClick={addEducation} startIcon={<FaPlus />}>Add Education</AddButton>
        </div>
      );
      case 2: return (
        <div>
          <h2><FaBriefcase /> Experience</h2>
          {profileData.experience.map((exp, index) => (
            <div key={index}>
              <StyledTextField name="jobTitle" label="Job Title" value={exp.jobTitle} onChange={(e) => handleExperienceChange(index, e)} required />
              <StyledTextField name="company" label="Company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} required />
              <StyledTextField name="startDate" label="Start Date" type="date" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} required InputLabelProps={{ shrink: true }} />
              <StyledTextField name="endDate" label="End Date" type="date" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} required InputLabelProps={{ shrink: true }} />
              <StyledTextField name="description" label="Description" value={exp.description} onChange={(e) => handleExperienceChange(index, e)} multiline rows={4} />
            </div>
          ))}
          <AddButton onClick={addExperience} startIcon={<FaPlus />}>Add Experience</AddButton>
        </div>
      );
      case 3: return (
        <div>
          <h2><FaStar /> Skills</h2>
          <StyledTextField name="skills" label="Skills (comma separated)" value={profileData.skills.join(', ')} onChange={handleSkillChange} />
        </div>
      );
      default: return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '30px auto', padding: 5, borderRadius: 4, border: `1px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}`, boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 0 10px rgba(0,0,0,0.1)' }}>
      <h1>Hi, {profileData.firstName}!</h1>
      <p>Finish filling your profile so that you match with jobs that fit you. Our AI assistant will help rank you top to employers!</p>
      <LinearProgress variant="determinate" value={profileScore} sx={{ marginBottom: 2 }} />
      <p style={{ textAlign: 'center' }}>{profileScore.toFixed(0)}%</p>
      <form onSubmit={handleSubmit}>
        <SwitchContainer>
          <SwitchButton selected={step === 0} onClick={() => setStep(0)}><FaUser /></SwitchButton>
          <SwitchButton selected={step === 1} onClick={() => setStep(1)}><FaGraduationCap /></SwitchButton>
          <SwitchButton selected={step === 2} onClick={() => setStep(2)}><FaBriefcase /></SwitchButton>
          <SwitchButton selected={step === 3} onClick={() => setStep(3)}><FaStar /></SwitchButton>
        </SwitchContainer>
        {renderStepContent()}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          {step > 0 && (
            <Button
              type="button"
              onClick={previousStep}
              variant="contained"
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
                color: theme.palette.mode === 'dark' ? '#000' : '#fff',
              }}
              startIcon={<FaArrowLeft />}
            >
              Previous
            </Button>
          )}
          <Button
            type="button"
            onClick={nextStep}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
              color: theme.palette.mode === 'dark' ? '#000' : '#fff',
            }}
            endIcon={step < 3 ? <FaArrowRight /> : null}
          >
            {step < 3 ? 'Next' : 'Finish'}
          </Button>
        </Box>
        {loading && <CircularProgress />}
      </form>
      <MessagePopup message={popupMessage} messageType={popupType} open={openPopup} onClose={() => setOpenPopup(false)} />
    </Box>
  );
};

export default Profile;
