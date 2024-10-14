// NewJobs.js
import React from 'react';
import { Box, Grid, useTheme, useMediaQuery } from '@mui/material';
import JobCard from '../Components/JobCard'; // Import the JobCard component

const NewJobs = () => {
  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery('(max-width:375px)');

  const containerStyle = {
    padding: isExtraSmallScreen ? '4px' : '15px',
    minHeight: '100vh',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  };

  const headerStyle = {
    fontSize: '32px',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    textAlign: 'center',
    marginBottom: '24px',
  };

  const jobData = [
    {
      title: 'Frontend Developer',
      location: 'Addis Ababa, Ethiopia',
      skills: 'React, JavaScript, CSS',
      timePosted: '2 days ago',
      deadline: '30th October 2024',
    },
    {
      title: 'Backend Developer',
      location: 'Addis Ababa, Ethiopia',
      skills: 'Node.js, Express, MongoDB',
      timePosted: '1 week ago',
      deadline: '15th November 2024',
    },
    {
      title: 'UI/UX Designer',
      location: 'Addis Ababa, Ethiopia',
      skills: 'Figma, Adobe XD, User Research',
      timePosted: '3 days ago',
      deadline: '1st November 2024',
    },
    {
      title: 'Data Analyst',
      location: 'Addis Ababa, Ethiopia',
      skills: 'Excel, SQL, Python',
      timePosted: '5 days ago',
      deadline: '10th November 2024',
    },
    {
      title: 'Full Stack Developer',
      location: 'Addis Ababa, Ethiopia',
      skills: 'MongoDB, Express, React, Node.js',
      timePosted: '1 week ago',
      deadline: '20th November 2024',
    },
    {
      title: 'AI Engineer',
      location: 'Addis Ababa, Ethiopia',
      skills: 'Python, TensorFlow, Machine Learning',
      timePosted: '1 day ago',
      deadline: '25th November 2024',
    },
    {
      title: 'Mobile Developer',
      location: 'Addis Ababa, Ethiopia',
      skills: 'React Native, Java, Swift',
      timePosted: '3 days ago',
      deadline: '5th December 2024',
    },
  ];

  return (
    <Box sx={containerStyle}>
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isExtraSmallScreen ? '4px' : '15px',
        }}
      >
        <h1 style={headerStyle}>New Job Openings</h1>
        <Grid container spacing={2}>
          {jobData.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <JobCard job={job} /> {/* Use JobCard component */}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default NewJobs;
