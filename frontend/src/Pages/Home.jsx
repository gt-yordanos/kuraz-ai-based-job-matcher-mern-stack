// src/components/Home.jsx
import React from 'react';
import { Grid, Paper, Box } from '@mui/material';
import RecommendedJobs from '../Components/RecommendedJobs';
import ScrollingMessages from '../Components/ScrollingMessages';

const Home = () => {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: '100%',
        padding: '20px', 
        display: 'flex', 
        flexDirection: 'column' 
      }}
    >
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {/* Left side: Recommended Jobs (40% width) */}
        <Grid item xs={12} md={5} sx={{ height: '100%' }}>
          <Paper elevation={3} sx={{ padding: '20px', height: '100%' }}>
            <RecommendedJobs />
          </Paper>
        </Grid>

        {/* Right side: Scrolling Messages (60% width) */}
        <Grid item xs={12} md={7} sx={{ height: '100%' }}>
          <Paper elevation={3} sx={{ padding: '20px', height: '100%' }}>
            <ScrollingMessages />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
