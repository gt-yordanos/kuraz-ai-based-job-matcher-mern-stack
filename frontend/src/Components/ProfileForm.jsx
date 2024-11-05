import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fade,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaUser, FaGraduationCap, FaBriefcase, FaPlus, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useThemeContext } from '../Contexts/ThemeContext';
import { createTheme } from '@mui/material/styles';
import SkillSection from './SkillSection';
import { useSkillsAndMajors } from '../Contexts/SkillsAndMajorsContext';

// Styled components
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: 16,
  width: '100%',
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderWidth: 1, borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000' },
    '&:hover fieldset, &.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
  },
  '& .MuiInputBase-input, & .MuiFormLabel-root': { color: theme.palette.mode === 'dark' ? '#fff' : '#000' },
  '& .MuiFormHelperText-root': { color: 'red', fontSize: '0.75rem' },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
  color: theme.palette.mode === 'dark' ? '#000' : '#fff',
  transition: 'margin 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333',
  },
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


const ProfileForm = ({
  step,
  profileData,
  handleChange,
  handleArrayChange,
  addArrayItem,
  removeArrayItem,
  handleNextStep,
  handlePrevStep,
  setProfileData
}) => {
  const { darkMode } = useThemeContext();
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });
  const { hardSkillsOptions, softSkillsOptions, majorOptions, loading: skillsLoading, error: skillsError } = useSkillsAndMajors();
  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i); // Last 10 years

  const handleSkillSelect = (skillType, selectedOptions) => {
    const selectedSkills = selectedOptions ? selectedOptions.map(option => option.value) : [];
    handleArrayChange(0, skillType, selectedSkills, 'skills'); // Assuming single array for skills
  };
  
  // Validation functions
  const validateProfile = () => {
    const errors = {};
    const minAge = 18;
    const birthday = new Date(profileData.birthday);
    const age = new Date().getFullYear() - birthday.getFullYear();

    if (!profileData.firstName) errors.firstName = "First name is required.";
    if (!/^[a-zA-Z]+$/.test(profileData.firstName)) errors.firstName = "First name cannot contain numbers.";

    if (!profileData.lastName) errors.lastName = "Last name is required.";
    if (!/^[a-zA-Z]+$/.test(profileData.lastName)) errors.lastName = "Last name cannot contain numbers.";

    if (!profileData.email) errors.email = "Email is required.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (profileData.email && !emailPattern.test(profileData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!profileData.phone) errors.phone = "Phone number is required.";
    if (!/^\d{10}$/.test(profileData.phone)) errors.phone = "Phone number must be 10 digits.";

    if (!profileData.birthday) errors.birthday = "Birthday is required.";
    if (age < minAge) errors.birthday = `You must be at least ${minAge} years old.`;
    if (!profileData.gender) errors.gender = "Gender is required.";
    if (!profileData.location) errors.location = "Location is required.";

    // Education Validation
    if (step === 1) {
      profileData.education.forEach((edu, index) => {
        if (!edu.degree) errors[`eduDegree${index}`] = "Degree is required.";
        if (!edu.institution) errors[`eduInstitution${index}`] = "Institution is required.";
        if (!edu.major) errors[`eduMajor${index}`] = "Major is required.";
        if (!edu.graduationYear) errors[`eduYear${index}`] = "Graduation year is required.";
        if (edu.cgpa) {
          if (edu.cgpa < 0 || edu.cgpa > 4) {
            errors[`eduCgpa${index}`] = "CGPA must be between 0 and 4.";
          }
        }
      });
    }

    // Experience Validation
    if (step === 2) {
      profileData.experience.forEach((exp, index) => {
        if (!exp.jobTitle) errors[`expJobTitle${index}`] = "Job title is required.";
        if (!exp.company) errors[`expCompany${index}`] = "Company is required.";
        if (!exp.startDate) errors[`expStartDate${index}`] = "Start date is required.";
        if (!exp.jobType) errors[`expJobType${index}`] = "Job type is required.";
        if (!exp.description) errors[`expDescription${index}`] = "Description is required.";
        if (!exp.endDate) errors[`expEndDate${index}`] = "End date is required.";
        if (new Date(exp.startDate) > new Date(exp.endDate)) {
          errors[`expDate${index}`] = "Start date must be before end date.";
        }
      });
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };


  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2><FaUser /> Personal Information</h2>
            {['firstName', 'lastName'].map(name => (
              <div key={name}>
                <StyledTextField
                  name={name}
                  label={name.charAt(0).toUpperCase() + name.slice(1)}
                  value={profileData[name] || ''}
                  onChange={handleChange}
                  required
                  error={Boolean(errorMessages[name])}
                  helperText={errorMessages[name]}
                />
              </div>
            ))}
            <StyledTextField
              name="email"
              label="Email"
              value={profileData.email || ''}
              onChange={handleChange}
              required
              error={Boolean(errorMessages.email)}
              helperText={errorMessages.email}
              InputProps={{ readOnly: true }} // Make email uneditable
            />
            {['phone', 'location'].map(name => (
              <StyledTextField
                key={name}
                name={name}
                label={name.charAt(0).toUpperCase() + name.slice(1)}
                value={profileData[name] || ''}
                onChange={handleChange}
                required
                error={Boolean(errorMessages[name])}
                helperText={errorMessages[name]}
              />
            ))}
            <StyledTextField
              name="birthday"
              label="Birthday"
              type="date"
              value={profileData.birthday ? profileData.birthday.split('T')[0] : ''}
              onChange={handleChange}
              required
              error={Boolean(errorMessages.birthday)}
              helperText={errorMessages.birthday}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth variant="outlined" required sx={{ marginBottom: 2 }}>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={profileData.gender || ''}
                onChange={handleChange}
                label="Gender"
                error={Boolean(errorMessages.gender)}
              >
                <MenuItem value="">Select Gender</MenuItem>
                {['Male', 'Female', 'Other'].map(gender => (
                  <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                ))}
              </Select>
              {errorMessages.gender && <span style={{ color: 'red', fontSize: '0.75rem' }}>{errorMessages.gender}</span>}
            </FormControl>
          </div>
        );
      case 1:
        return (
          <div>
            <h2><FaGraduationCap /> Education</h2>
            {profileData.education.map((edu, index) => (
              <div key={index}>
                <FormControl fullWidth variant="outlined" required sx={{ marginBottom: 2 }}>
                  <InputLabel>Degree</InputLabel>
                  <Select
                    name="degree"
                    value={edu.degree || ''}
                    onChange={e => handleArrayChange(index, 'degree', e.target.value, 'education')}
                    label="Degree"
                    error={Boolean(errorMessages[`eduDegree${index}`])}
                  >
                    <MenuItem value="">Select Degree</MenuItem>
                    {['High School', 'Associate', 'Bachelor', 'Master', 'Doctorate', 'Diploma'].map(degree => (
                      <MenuItem key={degree} value={degree}>{degree}</MenuItem>
                    ))}
                  </Select>
                  {errorMessages[`eduDegree${index}`] && <span style={{ color: 'red', fontSize: '0.75rem' }}>{errorMessages[`eduDegree${index}`]}</span>}
                </FormControl>
                {['institution'].map(field => (
                <StyledTextField
                  key={field}
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={edu[field] || ''}
                  onChange={e => handleArrayChange(index, field, e.target.value, 'education')}
                  required
                  error={Boolean(errorMessages[`edu${field.charAt(0).toUpperCase() + field.slice(1)}${index}`])}
                  helperText={errorMessages[`edu${field.charAt(0).toUpperCase() + field.slice(1)}${index}`]}
                />
                ))}
              
                <FormControl fullWidth sx={{ mb: 5 }}>
                  <Autocomplete
                  options={majorOptions}
                  value={edu.major || null}
                  onChange={(event, value) => handleArrayChange(index, 'major', value, 'education')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Major"
                      placeholder="Select or search major..."
                      required
                      error={Boolean(errorMessages[`eduMajor${index}`])}
                      helperText={errorMessages[`eduMajor${index}`]}
                    />
                  )}
                  isOptionEqualToValue={(option, value) => option === value} // Ensure proper comparison
                />
              </FormControl>
                <FormControl fullWidth variant="outlined" required sx={{ marginBottom: 2 }}>
                  <InputLabel>Graduation Year</InputLabel>
                  <Select
                    name="graduationYear"
                    value={edu.graduationYear || ''}
                    onChange={e => handleArrayChange(index, 'graduationYear', e.target.value, 'education')}
                    label="Graduation Year"
                    error={Boolean(errorMessages[`eduYear${index}`])}
                  >
                    <MenuItem value="">Select Year</MenuItem>
                    {years.map(year => (
                      <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                  {errorMessages[`eduYear${index}`] && <span style={{ color: 'red', fontSize: '0.75rem' }}>{errorMessages[`eduYear${index}`]}</span>}
                </FormControl>
                <StyledTextField
                  name="cgpa"
                  label="CGPA"
                  type="number"
                  value={edu.cgpa || ''}
                  onChange={e => handleArrayChange(index, 'cgpa', e.target.value, 'education')}
                  required
                  error={Boolean(errorMessages[`eduCgpa${index}`])}
                  helperText={errorMessages[`eduCgpa${index}`]}
                />
                <RemoveButton onClick={() => removeArrayItem(index, 'education')} startIcon={<FaTrash />}>Remove</RemoveButton>
              </div>
            ))}
            <AddButton onClick={() => addArrayItem('education')} startIcon={<FaPlus />}>Add Education</AddButton>
          </div>
        );
      case 2:
        return (
          <div>
          <h2><FaBriefcase /> Experience</h2>
          {profileData.experience.map((exp, index) => (
            <div key={index}>
              <StyledTextField
                name="jobTitle"
                label="Job Title"
                value={exp.jobTitle || ''}
                onChange={e => handleArrayChange(index, 'jobTitle', e.target.value, 'experience')}
                required
                error={Boolean(errorMessages[`expJobTitle${index}`])}
                helperText={errorMessages[`expJobTitle${index}`]}
              />
              <FormControl fullWidth variant="outlined" required sx={{ marginBottom: 2 }}>
                <InputLabel>Job Type</InputLabel>
                <Select
                  name="jobType"
                  value={exp.jobType || ''}
                  onChange={e => handleArrayChange(index, 'jobType', e.target.value, 'experience')}
                  label="Job Type"
                  error={Boolean(errorMessages[`expJobType${index}`])}
                >
                  <MenuItem value="">Select Job Type</MenuItem>
                  {['Full-Time', 'Part-Time', 'Intern', 'Other', 'Research'].map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
                {errorMessages[`expJobType${index}`] && <span style={{ color: 'red', fontSize: '0.75rem' }}>{errorMessages[`expJobType${index}`]}</span>}
              </FormControl>
              <StyledTextField
                name="company"
                label="Company"
                value={exp.company || ''}
                onChange={e => handleArrayChange(index, 'company', e.target.value, 'experience')}
                required
                error={Boolean(errorMessages[`expCompany${index}`])}
                helperText={errorMessages[`expCompany${index}`]}
              />
              {['startDate', 'endDate', 'description'].map(field => (
              <StyledTextField
                key={field}
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                type={field.includes('Date') ? 'date' : 'text'}
                value={exp[field] ? exp[field].split('T')[0] : ''} // Convert to 'yyyy-MM-dd' format
                onChange={e => handleArrayChange(index, field, e.target.value, 'experience')}
                required
                error={Boolean(errorMessages[`exp${field.charAt(0).toUpperCase() + field.slice(1)}${index}`])}
                helperText={errorMessages[`exp${field.charAt(0).toUpperCase() + field.slice(1)}${index}`]}
                InputLabelProps={{ shrink: true }}
              />
            ))}
              <RemoveButton onClick={() => removeArrayItem(index, 'experience')} startIcon={<FaTrash />}>Remove</RemoveButton>
            </div>
          ))}
          <AddButton onClick={() => addArrayItem('experience')} startIcon={<FaPlus />}>Add Experience</AddButton>
        </div>        
        );
      case 3:
        return (
        <SkillSection 
        profileData={profileData}
        setProfileData={setProfileData}
        hardSkillsOptions = {hardSkillsOptions}
        softSkillsOptions={softSkillsOptions}
        />
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (validateProfile()) {
      
        handleNextStep();
    
      }
  };

  return (
    <Fade in>
      <Box
        sx={{
          maxWidth: '400px',
          width: '97%',
          margin: '30px auto',
          padding: 5,
          borderRadius: 4,
          border: `1px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
          boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 0 10px rgba(0,0,0,0.1)',
          transition: 'height 0.3s ease',
        }}
      >
        {renderStepContent()}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          {step === 0 ? null : (
            <ButtonStyled type="button" onClick={() => { if (validateProfile()) handlePrevStep(); }} startIcon={<FaArrowLeft />}>
              Previous
            </ButtonStyled>
          )}
          <ButtonStyled type="button" onClick={handleNext} endIcon={loading ? null : (step < 3 ? <FaArrowRight /> : null)}>
            {loading ? <CircularProgress size={24} sx={{ color: theme.palette.mode === 'dark' ? '#000' : '#fff' }} /> : (step < 3 ? 'Next' : 'Finish')}
          </ButtonStyled>
        </Box>
      </Box>
    </Fade>
  );
};

export default ProfileForm;
