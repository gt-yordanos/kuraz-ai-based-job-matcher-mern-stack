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

  // Gap between each card
  const cardGap = 8;
  // Number of cards
  const numberOfCards = jobs.length;
  // Height of the card container (80% of 450px)
  const cardContainerHeight = 450 * 0.8;
  // Calculate the height of each card considering the total gap and decrease 5px from the height
  const totalGap = (numberOfCards - 1) * cardGap;
  const cardHeight = `calc((100% - ${totalGap}px) / 3 - 5px)`;

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#242424' : '#e0e0e0',
        borderRadius: '16px',
        maxWidth: '800px',
        margin: 'auto',
        height: '450px', // Set the total height of the container
        boxShadow: 'none', // Remove box shadow
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {/* Upper section with 20% height */}
      <Box
        sx={{
          width: '100%',
          height: '20%',
          padding: 4, // Increased padding here
          marginBottom: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>
          AI Recommended Jobs
        </Typography>
        <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif' }}>
          Based on your profile, we found jobs that match your skills and experience.
        </Typography>
      </Box>

      {/* Lower section with 80% height for the cards */}
      <Box
        sx={{
          width: '100%',
          height: '80%',
          padding: 4, // Increased padding here
          overflowY: 'auto',
        }}
      >
        {jobs.map((job, index) => (
          <Card
            key={index}
            sx={{
              display: 'flex',
              marginBottom: `${cardGap}px`,
              backgroundColor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#c0c0c0',
              color: theme.palette.mode === 'dark' ? 'white' : 'text.primary',
              borderRadius: '8px',
              height: cardHeight, // Set the height based on calculation
              boxShadow: 'none', // Remove box shadow
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.03)',
              },
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 100, height: '100%', objectFit: 'cover' }}
              image={job.image}
              alt={`${job.title} image`}
            />
            <CardContent sx={{ padding: '10px', fontFamily: 'Poppins, sans-serif' }}>
              <Typography variant="subtitle1" noWrap sx={{ fontFamily: 'Poppins, sans-serif' }}>
                {job.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                Skills: {job.skills}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon fontSize="small" />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginLeft: 0.5, fontFamily: 'Poppins, sans-serif' }}
                >
                  {job.timePosted}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RecommendedJobs;
