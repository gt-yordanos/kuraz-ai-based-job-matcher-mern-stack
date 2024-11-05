import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  FormControl,
  Autocomplete,
  Chip,
  Slider,
  useTheme,
} from '@mui/material';
import {
  Person,
  LocationOn,
  AttachMoney,
  School,
  Work,
  TipsAndUpdates,
  AccountBox,
  Description,
} from '@mui/icons-material'; // Material UI icons
import axios from 'axios';
import { styled } from '@mui/material/styles';
import MessagePopup from '../Components/MessagePopup';
import { useHrAuth } from '../Contexts/HrAuthContext';
import { useSkillsAndMajors } from '../Contexts/SkillsAndMajorsContext';

// Styled Box for consistent font
const StyledBox = styled(Box)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  p: 3,
  bgcolor: theme.palette.background.default,
}));

const JobPost = () => {
  const theme = useTheme();
  const { hrStaff } = useHrAuth();
  const [profileData, setProfileData] = useState({
    title: '',
    description: '',
    responsibilities: '',
    location: '',
    employmentType: 'Full-time',
    salaryRange: '',
    deadline: '',
    hrStaffId: hrStaff ? hrStaff.id : '',
    ageLimit: {
      min: '',
      max: '',
    },
    genderPreference: 'Any',
    jobType: 'On-site',
    educationRequirement: {
      degree: 'None',
      requiredMajors: [],
      minGPA: '',
      degreeWeight: 1,
    },
    skillsRequired: {
      skills:{
        hardSkills: [],
        softSkills: [],
      },
      skillWeight: 1,
    },
    experienceRequirement: {
      years: '',
      type: 'Required',
      experienceWeight: 1,
    },
  });
  const { hardSkillsOptions, softSkillsOptions, majorOptions, loading: skillsLoading, error: skillsError } = useSkillsAndMajors();
  const [messagePopup, setMessagePopup] = useState({
    message: '',
    messageType: 'success',
    open: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAgeLimitChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      ageLimit: { ...prev.ageLimit, [name]: value },
    }));
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      educationRequirement: { ...prev.educationRequirement, [name]: value },
    }));
  };

  const handleSkillsChange = (type) => (event, newValue) => {
    setProfileData((prev) => ({
      ...prev,
      skillsRequired: { 
        ...prev.skillsRequired, 
        [type]: newValue 
      },
    }));
  };

  const handlePopupClose = () => {
    setMessagePopup({ ...messagePopup, open: false });
  };

  const validateForm = () => {
    if (!profileData.title) return 'Job Title is required.';
    if (!profileData.description) return 'Description is required.';
    if (!profileData.responsibilities) return 'Responsibilities are required.';
    if (!profileData.location) return 'Location is required.';
    if (!profileData.salaryRange) return 'Salary Range is required.';
    if (!profileData.deadline) return 'Deadline is required.';
    if (!profileData.ageLimit.min) return 'Minimum Age is required.';
    if (!profileData.ageLimit.max) return 'Maximum Age is required.';
    if (!profileData.educationRequirement.degree) return 'Degree is required.';
    if (profileData.educationRequirement.minGPA === '') return 'Minimum GPA is required.';
    if (profileData.educationRequirement.minGPA < 0 || profileData.educationRequirement.minGPA > 4) {
      return 'GPA must be between 0 and 4.';
    }
    if (!profileData.educationRequirement.requiredMajors[0]) return 'Major is required';
    if (!profileData.skillsRequired.skills.hardSkills[0]) return 'Hard Skills are required';
    if (!profileData.skillsRequired.skills.softSkills[0]) return 'Soft Skills are required';
    if (!profileData.experienceRequirement.years) return 'Years of Experience are required.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setMessagePopup({ message: validationError, messageType: 'error', open: true });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/jobs', {
        ...profileData,
        skillsRequired: {
          skills:{
            hardSkills: profileData.skillsRequired.skills.hardSkills,
            softSkills: profileData.skillsRequired.skills.softSkills
          },
          skillWeight: profileData.skillsRequired.skillWeight, // Ensure skillWeight is included
        },
      });
      console.log(response.data);
      setMessagePopup({ message: 'Job posted successfully!', messageType: 'success', open: true });
    } catch (error) {
      console.error('Error posting job:', error);
      setMessagePopup({ message: 'Failed to post job. Please try again.', messageType: 'error', open: true });
    }
  };
   

  return (
    <StyledBox>
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        {/* Job Details Section */}
        <Box sx={{ border: '1px solid', borderRadius: 1, p: 2, mb: 3 }}>
          <h3 style={{ display: 'flex', alignItems: 'center' }}>
            <Description sx={{ mr: 1 }} /> About the Job
          </h3>
          <TextField
            fullWidth
            variant="outlined"
            label="Job Title"
            name="title"
            value={profileData.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Description"
            name="description"
            multiline
            rows={4}
            value={profileData.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Responsibilities (comma-separated)"
            name="responsibilities"
            value={profileData.responsibilities}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Location"
            name="location"
            value={profileData.location}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <LocationOn style={{ marginRight: 8 }} />
              ),
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Employment Type"
            name="employmentType"
            select
            SelectProps={{ native: true }}
            value={profileData.employmentType}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            {['Full-time', 'Part-time', 'Contract', 'Internship'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            variant="outlined"
            label="Salary Range (ETB)"
            name="salaryRange"
            value={profileData.salaryRange}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <AttachMoney style={{ marginRight: 8 }} />
              ),
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Deadline"
            type="date"
            name="deadline"
            value={profileData.deadline}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
        </Box>

        {/* Applicant Type Section */}
        <Box sx={{ border: '1px solid', borderRadius: 1, p: 2, mb: 3 }}>
          <h3 style={{ display: 'flex', alignItems: 'center' }}>
            <AccountBox sx={{ mr: 1 }} /> Applicant Type
          </h3>
          <h4>Age Limit</h4>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField
              variant="outlined"
              label="Min Age"
              name="min"
              type="number"
              value={profileData.ageLimit.min}
              onChange={handleAgeLimitChange}
              sx={{ mb: 2, width: '50%', mr: 1 }}
            />
            <TextField
              variant="outlined"
              label="Max Age"
              name="max"
              type="number"
              value={profileData.ageLimit.max}
              onChange={handleAgeLimitChange}
              sx={{ mb: 2, width: '50%' }}
            />
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            label="Gender Preference"
            name="genderPreference"
            select
            SelectProps={{ native: true }}
            value={profileData.genderPreference}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            {['Male', 'Female', 'Other', 'Any'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            variant="outlined"
            label="Job Type"
            name="jobType"
            select
            SelectProps={{ native: true }}
            value={profileData.jobType}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            {['Remote', 'On-site', 'Hybrid'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </Box>

        {/* Education Section */}
        <Box sx={{ border: '1px solid', borderRadius: 1, p: 2, mb: 3 }}>
          <h3 style={{ display: 'flex', alignItems: 'center' }}>
            <School sx={{ mr: 1 }} /> Education
          </h3>
          <TextField
            fullWidth
            variant="outlined"
            label="Degree"
            name="degree"
            select
            SelectProps={{ native: true }}
            value={profileData.educationRequirement.degree}
            onChange={handleEducationChange}
            sx={{ mb: 2 }}
          >
            {['None', 'High School', 'Associate', 'Bachelor', 'Master', 'Doctorate'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            variant="outlined"
            label="Min GPA"
            name="minGPA"
            type="number"
            value={profileData.educationRequirement.minGPA}
            onChange={handleEducationChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Autocomplete
              multiple
              options={majorOptions} // Add your required majors options
              value={profileData.educationRequirement.requiredMajors}
              onChange={(event, newValue) => {
                setProfileData((prev) => ({
                  ...prev,
                  educationRequirement: { ...prev.educationRequirement, requiredMajors: newValue },
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Required Majors" placeholder="Enter majors..." />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip key={option} label={option} {...getTagProps({ index })} />
                ))
              }
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <div style={{ width: '30%', fontWeight: 'bold' }}>Degree Weight:</div>
            <Slider
              value={profileData.educationRequirement.degreeWeight}
              onChange={(event, newValue) => handleEducationChange({ target: { name: 'degreeWeight', value: newValue } })}
              aria-labelledby="degree-weight-slider"
              valueLabelDisplay="auto"
              step={0.1}
              min={0.5}
              max={3}
              sx={{ flexGrow: 1, mx: 2, height: 8 }}
            />
            <div style={{ fontWeight: 'bold' }}>{profileData.educationRequirement.degreeWeight}</div>
          </Box>
        </Box>

        {/* Skills Section */}
        <Box sx={{ border: '1px solid', borderRadius: 1, p: 2, mb: 3 }}>
          <h3 style={{ display: 'flex', alignItems: 'center' }}>
            <TipsAndUpdates sx={{ mr: 1 }} /> Skills
          </h3>
          <FormControl fullWidth sx={{ mb: 2 }}>
          <Autocomplete
            multiple
            options={hardSkillsOptions}
            value={profileData.skillsRequired.skills.hardSkills}
            onChange={(event, newValue) => {
              setProfileData((prev) => ({
                ...prev,
                skillsRequired: {
                  ...prev.skillsRequired,
                  skills: {
                    ...prev.skillsRequired.skills,
                    hardSkills: newValue,
                  },
                },
            }));
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Hard Skills" placeholder="Enter hard skills..." />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip key={option} label={option} {...getTagProps({ index })} />
                ))
              }
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
          <Autocomplete
            multiple
            options={softSkillsOptions}
            value={profileData.skillsRequired.skills.softSkills}
            onChange={(event, newValue) => {
              setProfileData((prev) => ({
                ...prev,
                skillsRequired: {
                  ...prev.skillsRequired,
                  skills: {
                    ...prev.skillsRequired.skills, 
                    softSkills: newValue,
                  },
                },
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Soft Skills" placeholder="Enter soft skills..." />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip key={option} label={option} {...getTagProps({ index })} />
              ))
            }
          />
        </FormControl>


          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <div style={{ width: '30%', fontWeight: 'bold' }}>Skill Weight:</div>
            <Slider
              value={profileData.skillsRequired.skillWeight}
              onChange={(event, newValue) => handleSkillsChange('skillWeight')(event, newValue)}
              aria-labelledby="skill-weight-slider"
              valueLabelDisplay="auto"
              step={0.1}
              min={0.5}
              max={3}
              sx={{ flexGrow: 1, mx: 2, height: 8 }}
            />
            <div style={{ fontWeight: 'bold' }}>{profileData.skillsRequired.skillWeight}</div>
          </Box>
        </Box>

        {/* Experience Requirement Section */}
        <Box sx={{ border: '1px solid', borderRadius: 1, p: 2, mb: 3 }}>
          <h3 style={{ display: 'flex', alignItems: 'center' }}>
            <Work sx={{ mr: 1 }} /> Experience Requirement
          </h3>
          <TextField
            fullWidth
            variant="outlined"
            label="Years of Experience"
            name="years"
            type="number"
            value={profileData.experienceRequirement.years}
            onChange={(e) => setProfileData((prev) => ({
              ...prev,
              experienceRequirement: { ...prev.experienceRequirement, years: e.target.value },
            }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Experience Type"
            name="type"
            select
            SelectProps={{ native: true }}
            value={profileData.experienceRequirement.type}
            onChange={(e) => setProfileData((prev) => ({
              ...prev,
              experienceRequirement: { ...prev.experienceRequirement, type: e.target.value },
            }))}
            sx={{ mb: 2 }}
          >
            {['Required', 'Preferred'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <div style={{ width: '30%', fontWeight: 'bold' }}>Experience Weight:</div>
            <Slider
              value={profileData.experienceRequirement.experienceWeight}
              onChange={(event, newValue) => setProfileData((prev) => ({
                ...prev,
                experienceRequirement: { ...prev.experienceRequirement, experienceWeight: newValue },
              }))}
              aria-labelledby="experience-weight-slider"
              valueLabelDisplay="auto"
              step={0.1}
              min={0.5}
              max={3}
              sx={{ flexGrow: 1, mx: 2, height: 8 }}
            />
            <div style={{ fontWeight: 'bold' }}>{profileData.experienceRequirement.experienceWeight}</div>
          </Box>
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: theme.palette.mode === 'dark' ? 'white' : 'black',
            color: theme.palette.mode === 'dark' ? 'black' : 'white',
            display: 'block',
            margin: '0 auto',
            mt: 2,
          }}
        >
          Post Job
        </Button>
      </form>

      {/* Message Popup */}
      <MessagePopup
        message={messagePopup.message}
        messageType={messagePopup.messageType}
        open={messagePopup.open}
        onClose={handlePopupClose}
      />
    </StyledBox>
  );
};

export default JobPost;