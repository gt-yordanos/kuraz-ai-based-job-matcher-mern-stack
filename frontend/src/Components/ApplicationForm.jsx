import React from 'react';
import { FaBriefcase, FaGraduationCap, FaTrash, FaPlus } from 'react-icons/fa';
import {
  Button,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from '@mui/material';
import { styled } from '@mui/system';

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

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: 16,
  width: '100%',
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderWidth: 1, borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000' },
    '&:hover fieldset, &.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
  },
  '& .MuiInputBase-input, & .MuiFormLabel-root': { color: theme.palette.mode === 'dark' ? '#fff' : '#000' },
}));

const ApplicationForm = ({
  userInput,
  setUserInput,
  handleArrayChange,
  errorMessages,
  removeArrayItem,
  addArrayItem,
  years,
  coverLetter,
  setCoverLetter,
  hardSkillsOptions,
  softSkillsOptions,
  majorOptions,
}) => {
  const validateCGPA = (value) => {
    const parsedValue = parseFloat(value);
    return !isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 4;
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Application Form</h1>

      <h2><FaBriefcase /> Experience</h2>
      <p style={{ fontSize: '12px', textAlign: 'left' }}>
        Highlight your most relevant experiences and tailor them to showcase your suitability for this role. Adding specific skills related to this job can increase your chances of being hired or ranking higher in our algorithm. If you don’t provide new experiences, your existing profile experiences will be considered for ranking.
      </p>
      {userInput.experience.map((exp, index) => (
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
              value={exp[field] ? exp[field].split('T')[0] : ''}
              onChange={e => handleArrayChange(index, field, e.target.value, 'experience')}
              required
              error={Boolean(errorMessages[`exp${field.charAt(0).toUpperCase() + field.slice(1)}${index}`])}
              helperText={errorMessages[`exp${field.charAt(0).toUpperCase() + field.slice(1)}${index}`]}
              InputLabelProps={{ shrink: true }}
            />
          ))}
          <RemoveButton onClick={() => removeArrayItem(index, 'experience')} startIcon={<FaTrash />}>
            Remove
          </RemoveButton>
        </div>
      ))}
      <AddButton onClick={() => addArrayItem('experience')} startIcon={<FaPlus />}>
        Add Experience
      </AddButton>

      <Divider sx={{ margin: '20px 0' }} />
      <h2><FaGraduationCap /> Education</h2>
      <p style={{ fontSize: '12px', textAlign: 'left' }}>
        Include your highest qualifications and any specialized training relevant to the position. If you do not add new education entries, your existing profile education will be used for ranking. Adding specific majors related to this job can also enhance your profile.
      </p>
      {userInput.education.map((edu, index) => (
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
          <StyledTextField
            name="institution"
            label="Institution"
            value={edu.institution || ''}
            onChange={e => handleArrayChange(index, 'institution', e.target.value, 'education')}
            required
            error={Boolean(errorMessages[`eduInstitution${index}`])}
            helperText={errorMessages[`eduInstitution${index}`]}
          />
          <FormControl fullWidth variant="outlined" required sx={{ marginBottom: 2 }}>
            <Autocomplete
              options={majorOptions || []}
              onChange={(event, newValue) => handleArrayChange(index, 'major', newValue, 'education')}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  label="Major"
                  placeholder="Search major..."
                  error={Boolean(errorMessages[`eduMajor${index}`])}
                  helperText={errorMessages[`eduMajor${index}`]}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth variant="outlined" required sx={{ marginBottom: 2 }}>
            <Autocomplete
              options={years.map(year => year.toString()) || []}
              onChange={(event, newValue) => handleArrayChange(index, 'graduationYear', newValue, 'education')}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  label="Graduation Year"
                  placeholder="Search year..."
                  error={Boolean(errorMessages[`eduYear${index}`])}
                  helperText={errorMessages[`eduYear${index}`]}
                />
              )}
            />
          </FormControl>

          <StyledTextField
            name="cgpa"
            label="CGPA"
            type="number"
            value={edu.cgpa || ''}
            onChange={e => {
              const value = e.target.value;
              if (validateCGPA(value) || value === '') {
                handleArrayChange(index, 'cgpa', value, 'education');
              }
            }}
            required
            error={Boolean(errorMessages[`eduCgpa${index}`])}
            helperText={errorMessages[`eduCgpa${index}`]}
          />
          <RemoveButton onClick={() => removeArrayItem(index, 'education')} startIcon={<FaTrash />}>
            Remove
          </RemoveButton>
        </div>
      ))}
      <AddButton onClick={() => addArrayItem('education')} startIcon={<FaPlus />}>
        Add Education
      </AddButton>

      <Divider sx={{ margin: '20px 0' }} />
      <h2>Skills</h2>
      <p style={{ fontSize: '12px', textAlign: 'left' }}>
        Choose skills that directly relate to the job to make your application stand out. If you do not add new skills, your existing profile skills will be considered for ranking.
      </p>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Autocomplete
          multiple
          options={hardSkillsOptions || []}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              variant="outlined"
              label="Hard Skills"
              placeholder="Search hard skills..."
            />
          )}
          onChange={(event, newValue) => setUserInput(prev => ({
            ...prev,
            hardSkills: newValue
          }))}
        />
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <Autocomplete
          multiple
          options={softSkillsOptions || []}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              variant="outlined"
              label="Soft Skills"
              placeholder="Search soft skills..."
            />
          )}
          onChange={(event, newValue) => setUserInput(prev => ({
            ...prev,
            softSkills: newValue
          }))}
        />
      </FormControl>

      <Divider sx={{ margin: '20px 0' }} />
      <div style={{ marginBottom: '16px', fontSize: '1.25rem' }}>Cover Letter</div>
      <StyledTextField
        label="Cover Letter"
        multiline
        minRows={4} // Set a minimum height
        maxRows={Infinity} // Allow it to grow indefinitely
        value={coverLetter}
        onChange={e => setCoverLetter(e.target.value)}
        variant="outlined" // Specify variant as needed
        fullWidth // Make it responsive
      />
    </div>
  );
};

export default ApplicationForm;
