import React from 'react';
import { Box, Card, CardContent, CardMedia, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import jobImages from '../assets/JobImages';

const RecommendedJobs = () => {
  const theme = useTheme();
  const jobs = [
    { title: 'Frontend Developer', skills: 'JavaScript, React, CSS', timePosted: '2 days ago', image: jobImages.frontend },
    { title: 'Full Stack Developer', skills: 'JavaScript, Node.js, Express', timePosted: '1 week ago', image: jobImages.backend },
    { title: 'AI Engineer', skills: 'Python, TensorFlow, Machine Learning', timePosted: '3 days ago', image: jobImages.aiEngineer },
  ];

  const cardGap = 12;
  const totalGap = (jobs.length - 1) * cardGap;
  const cardHeight = `calc((100% - ${totalGap}px) / 3 - 5px)`;

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#242424' : '#e0e0e0',
        borderRadius: '16px',
        maxWidth: '800px',
        margin: 'auto',
        height: '450px',
        boxShadow: 'none',
      }}
    >
      <Box sx={{ width: '100%', height: '18%', padding: 4, marginBottom: 2 }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>AI Recommended Jobs</div>
        <div style={{ fontSize: '0.875rem', color: theme.palette.text.secondary }}>
          Based on your profile, we found jobs that match your skills and experience.
        </div>
      </Box>
      <Box sx={{ width: '100%', height: '82%', padding: 4, overflowY: 'auto' }}>
        {jobs.map((job, index) => (
          <Card
            key={index}
            sx={{
              display: 'flex',
              marginBottom: `${cardGap}px`,
              backgroundColor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#c0c0c0',
              color: theme.palette.mode === 'dark' ? 'white' : 'text.primary',
              borderRadius: '8px',
              height: cardHeight,
              boxShadow: 'none',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.03)' },
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 100, height: '100%', objectFit: 'cover' }}
              image={job.image}
              alt={`${job.title} image`}
            />
            <CardContent sx={{ padding: '10px' }}>
              <div style={{ fontSize: '1rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {job.title}
              </div>
              <div style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Skills: {job.skills}
              </div>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon fontSize="small" />
                <div style={{ fontSize: '0.875rem', color: theme.palette.text.secondary, marginLeft: 0.5 }}>{job.timePosted}</div>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RecommendedJobs;
