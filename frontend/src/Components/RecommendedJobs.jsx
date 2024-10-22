import React, { useState } from 'react';
import { Box, Button, Pagination, useTheme, useMediaQuery } from '@mui/material';
import SmallJobCard from './SmallJobCard';
import AssistantIcon from '@mui/icons-material/Assistant';
import jobImages from '../assets/JobImages.js'; // Adjust this import to your actual path
import { useAuth } from '../Contexts/AuthContext'; // Make sure this path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const RecommendedJobs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:460px)');
  const { user } = useAuth(); // Get the user from AuthContext
  const navigate = useNavigate();

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
        padding: '24px',
        paddingTop: '50px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ width: '100%', paddingBottom: '16px', paddingLeft: '12px', marginBottom: '16px' }}> {/* Added marginBottom */}
        <div style={{ fontSize: isMobile ? '1rem' : '1.25rem', fontWeight: 'bold' }}>
          AI Recommended Jobs
        </div>
        {user ? (
          <div style={{ fontSize: isMobile ? '0.75rem' : '0.875rem', color: theme.palette.text.secondary }}>
            Based on your profile, we found jobs that match your skills and experience.
          </div>
        ) : (
          <div style={{
            fontSize: isMobile ? '0.7rem' : '0.9rem', // Decreased font size
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
            textAlign: 'left',
            marginTop: '20px'
          }}>
            <span role="img" aria-label="wave">👋</span>
            <strong> Welcome, Proffessionals!</strong>
            <span>
              <br />
              Login or sign up to see AI-recommended jobs that match your profile.
              <br />
              <strong>For more info, use the Kuraz AI assistant <AssistantIcon style={{ verticalAlign: 'middle', marginLeft: '4px' }} /></strong>
            </span>
          </div>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '12px',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1, // Allow this box to grow
        }}
      >
        {user ? (
          currentJobs.map((job, index) => (
            <SmallJobCard key={index} job={job} isMobile={isMobile} />
          ))
        ) : (
          <div style={{ textAlign: 'center', fontSize: '0.875rem', color: theme.palette.text.secondary }}>
            <img src={jobImages.aiBot} alt="Professionals" style={{ width: '60%', height: 'auto', borderRadius: '8px' }} /> {/* Increased image size */}
          </div>
        )}
      </Box>

      <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
        {user && (
          <Pagination
            count={Math.ceil(jobs.length / jobsPerPage)}
            page={page}
            onChange={handleChange}
            sx={{
              '& .MuiPaginationItem-root': {
                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
              },
            }}
          />
        )}
      </Box>

      {!user && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row', // Changed to row for side by side
            alignItems: 'center',
            marginTop: 'auto', // Ensure buttons are at the bottom
            gap: '12px',
            justifyContent: 'center'
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
              color: theme.palette.mode === 'dark' ? '#000' : '#fff',
              border: 'none',
              width: '130px'
            }}
            onClick={() => navigate('/login')} // Navigate to sign up
          >
            Login
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: theme.palette.mode === 'dark' ? '#fff' : '#000',
              borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
               width: '130px'
            }}
            onClick={() => navigate('/signup')} // Navigate to sign up
          >
            Sign Up
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default RecommendedJobs;
