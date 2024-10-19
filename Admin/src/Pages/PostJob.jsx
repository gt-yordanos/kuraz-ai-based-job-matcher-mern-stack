import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const PostJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', {
        title: jobTitle,
        location,
        description,
      });
      setSuccess('Job posted successfully!');
      setError(null);
      setJobTitle('');
      setLocation('');
      setDescription('');
    } catch (err) {
      setError('Failed to post job');
      setSuccess(null);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2, bgcolor: 'background.default' }}>
      <Typography variant="h4" color="text.primary">Post a New Job</Typography>
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
      <Button type="submit" variant="contained" color="primary">
        Post Job
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}
    </Box>
  );
};

export default PostJob;
