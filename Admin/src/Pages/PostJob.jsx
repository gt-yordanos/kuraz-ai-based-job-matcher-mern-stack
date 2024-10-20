import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

const PostJob = () => {
  const theme = useTheme();
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [salaryRange, setSalaryRange] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', {
        title: jobTitle,
        location,
        description,
        requirements: requirements.split(',').map(req => req.trim()), // Convert to array
        responsibilities: responsibilities.split(',').map(res => res.trim()), // Convert to array
        employmentType,
        salaryRange,
        deadline,
      });
      setSuccess('Job posted successfully!');
      setError(null);
      setJobTitle('');
      setLocation('');
      setDescription('');
      setRequirements('');
      setResponsibilities('');
      setEmploymentType('Full-time');
      setSalaryRange('');
      setDeadline('');
    } catch (err) {
      setError('Failed to post job');
      setSuccess(null);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        padding: 2, 
        bgcolor: 'background.default', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: { xs: '95%', sm: '85%', md: '65%', lg: '65%' }, // Responsive widths
        margin: '0 auto' // Center the form
      }}
    >
      <h2 style={{ marginBottom: '16px', color: theme.palette.text.primary }}>Post a New Job</h2>
      <TextField
        label="Job Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />
      <TextField
        label="Location"
        variant="outlined"
        fullWidth
        margin="normal"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextField
        label="Job Description"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Requirements (comma-separated)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
      />
      <TextField
        label="Responsibilities (comma-separated)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={responsibilities}
        onChange={(e) => setResponsibilities(e.target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Employment Type</InputLabel>
        <Select
          value={employmentType}
          onChange={(e) => setEmploymentType(e.target.value)}
        >
          <MenuItem value="Full-time">Full-time</MenuItem>
          <MenuItem value="Part-time">Part-time</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Salary Range (e.g., 50000-70000)"
        variant="outlined"
        fullWidth
        margin="normal"
        value={salaryRange}
        onChange={(e) => setSalaryRange(e.target.value)}
      />
      <TextField
        label="Deadline"
        type="date"
        variant="outlined"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <Button 
        type="submit" 
        variant="contained" 
        sx={{ 
          bgcolor: theme.palette.mode === 'dark' ? 'white' : 'black', 
          color: theme.palette.mode === 'dark' ? 'black' : 'white',
          marginTop: 2 
        }}
      >
        Post Job
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </Box>
  );
};

export default PostJob;
