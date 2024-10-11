import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import jobImages from '../assets/JobImages';

const RecommendedJobs = () => {
  const theme = useTheme(); // Get the current theme

  const jobs = [
    {
      title: 'Frontend Developer',
      skills: 'JavaScript, React, CSS',
      timePosted: '2 days ago',
      image: jobImages.frontend,
    },
    {
      title: 'Full Stack Developer',
      skills: 'JavaScript, Node.js, Express',
      timePosted: '1 week ago',
      image: jobImages.backend,
    },
    {
      title: 'AI Engineer',
      skills: 'Python, TensorFlow, Machine Learning',
      timePosted: '3 days ago',
      image: jobImages.aiEngineer,
    },
  ];

  return (
    <Box 
      sx={{
        padding: 3,
        backgroundColor: theme.palette.mode === 'dark' ? '#242424' : '#e0e0e0',
        borderRadius: '16px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease-in-out',
        maxWidth: '800px',
        margin: 'auto',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        AI Recommended Jobs
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 3 }}>
        Based on your profile, we found jobs that match your skills and experience.
      </Typography>

      {jobs.map((job, index) => (
        <Card
          key={index}
          sx={{
            display: 'flex',
            marginBottom: 2,
            backgroundColor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#c0c0c0',
            color: theme.palette.mode === 'dark' ? 'white' : 'text.primary',
            borderRadius: '8px',
            height: '100px',
            boxShadow: 'none',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.03)', // Decreased scale size on hover
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 100, height: '100%', objectFit: 'cover' }}
            image={job.image}
            alt={`${job.title} image`}
          />
          <CardContent sx={{ padding: '10px' }}>
            <Typography 
              variant="subtitle1" 
              sx={{ fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }}}
              noWrap
            >
              {job.title}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' }}}
            >
              Skills: {job.skills}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon fontSize="small" />
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ marginLeft: 0.5, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' }}}
              >
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
