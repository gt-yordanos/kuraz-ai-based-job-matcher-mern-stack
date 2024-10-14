// RecommendedJobs.js
import React, { useState } from 'react';
import { Box, Pagination, useTheme, useMediaQuery } from '@mui/material';
import SmallJobCard from './SmallJobCard'; // Import the SmallJobCard component

const RecommendedJobs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:460px)');
  const jobs = [
    { title: 'Frontend Developer', skills: 'JavaScript, React, CSS', timePosted: '2 days ago', location: 'New York', deadline: 'Oct 30, 2024' },
    { title: 'Full Stack Developer', skills: 'JavaScript, Node.js, Express', timePosted: '1 week ago', location: 'San Francisco', deadline: 'Nov 5, 2024' },
    { title: 'AI Engineer', skills: 'Python, TensorFlow, Machine Learning', timePosted: '3 days ago', location: 'Remote', deadline: 'Nov 1, 2024' },
  ];

  const [page, setPage] = useState(1);
  const jobsPerPage = isMobile ? 1 : 2; // Show only 1 card on smaller screens, 2 on larger screens
  const handleChange = (event, value) => setPage(value);

  const startIndex = (page - 1) * jobsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#242424' : '#e0e0e0',
        borderRadius: '16px',
        maxWidth: '800px',
        margin: 'auto',
        height: isMobile ? '400px' : '450px',
        boxShadow: 'none',
        padding: '24px', // Added padding to the container
        paddingTop: '50px', // Added extra padding to push the top text down
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center the content vertically
      }}
    >
      <Box sx={{ width: '100%', paddingBottom: '16px' , paddingLeft: '12px'}}>
        <div style={{ fontSize: isMobile ? '1rem' : '1.25rem', fontWeight: 'bold' }}>AI Recommended Jobs</div>
        <div style={{ fontSize: isMobile ? '0.75rem' : '0.875rem', color: theme.palette.text.secondary }}>
          Based on your profile, we found jobs that match your skills and experience.
        </div>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row', // Column layout for mobile, row for larger screens
          gap: '12px',
          justifyContent: 'center', // Center the cards inside the container
          alignItems: 'center', // Align cards in the center
          height: '100%',
        }}
      >
        {currentJobs.map((job, index) => (
          <SmallJobCard key={index} job={job} isMobile={isMobile} />
        ))}
      </Box>
      <Pagination
        count={Math.ceil(jobs.length / jobsPerPage)}
        page={page}
        onChange={handleChange}
        sx={{
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'center',
          '& .MuiPaginationItem-root': {
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          },
        }}
      />
    </Box>
  );
};

export default RecommendedJobs;
