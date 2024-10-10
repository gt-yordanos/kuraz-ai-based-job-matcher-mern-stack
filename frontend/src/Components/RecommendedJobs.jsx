// RecommendedJobs.js
import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Importing clock icon
import frontendJob from '../assets/frontendJob.png'; // Import your local image
import backendJob from '../assets/backendJob.png'; // Import your local image
import aiEngineerJob from '../assets/aiEngineerJob.png'; // Import your local image

const RecommendedJobs = () => {
  const theme = useTheme(); // Get the current theme

  const jobs = [
    {
      title: 'Frontend Developer',
      skills: 'JavaScript, React, CSS',
      timePosted: '2 days ago',
      image: frontendJob, // Use local image for Frontend Developer
    },
    {
      title: 'Full Stack Developer',
      skills: 'JavaScript, Node.js, Express',
      timePosted: '1 week ago',
      image: backendJob, // Use local image for Full Stack Developer
    },
    {
      title: 'AI Engineer',
      skills: 'Python, TensorFlow, Machine Learning',
      timePosted: '3 days ago',
      image: aiEngineerJob, // Use local image for AI Engineer
    },
  ];

  return (
    <Box sx={{ padding: 2, fontFamily: 'Poppins, sans-serif' }}>
      <Typography variant="h6" gutterBottom>
        AI Recommended Jobs
      </Typography>
      {jobs.map((job, index) => (
        <Card
          key={index}
          sx={{
            display: 'flex',
            marginBottom: 2,
            backgroundColor: theme.palette.mode === 'dark' ? 'black' : '#e0e0e0', // Black for dark mode, dark white for light mode
            color: theme.palette.mode === 'dark' ? 'white' : 'text.primary',
            borderRadius: '8px',
            height: '100px', // Adjust height as needed
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 100, height: '100%', objectFit: 'cover' }} // Adjust dimensions for images
            image={job.image}
            alt={`${job.title} image`}
          />
          <CardContent sx={{ padding: '10px' }}>
            <Typography variant="subtitle1" noWrap>
              {job.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Skills: {job.skills}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 0.5 }}>
                {job.timePosted}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default RecommendedJobs;
