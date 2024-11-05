import React, { useEffect, useState } from 'react';
import { Box, Grid, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import JobCard from '../Components/JobCard'; // Import the JobCard component
import Apply from './Apply'; // Import the Apply component
import axios from 'axios';
import StorageIcon from '@mui/icons-material/Storage';
const NewJobs = () => {
  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery('(max-width:375px)');
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerStyle = {
    padding: isExtraSmallScreen ? '4px' : '15px',
    minHeight: '70vh',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const headerStyle = {
    fontSize: '32px',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    textAlign: 'center',
    marginBottom: '24px',
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs'); // Adjust the URL as necessary
        console.log('API Response:', response.data);
        
        // Sort jobs by postedDate in descending order (recent first)
        const sortedJobs = response.data.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        setJobs(sortedJobs); // Set sorted jobs
      } catch (err) {
        console.error(err);
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <Box sx={containerStyle}>
        <CircularProgress
          sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
        <StorageIcon sx={{ fontSize: 100, color: '#ED2939' }} />
        <h2>No jobs found or Connection Problem</h2>
      </Box>
    );
  }

  // Check if jobs is an array
  if (!Array.isArray(jobs)) {
    return (
      <Box sx={containerStyle}>
        <h2>No jobs found or invalid response format.</h2>
      </Box>
    );
  }

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
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={job._id}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
        {selectedJob && <Apply job={selectedJob} />}
      </Box>
    </Box>
  );
};

export default NewJobs;
