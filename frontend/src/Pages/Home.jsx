import React from 'react';
import { Grid, Paper, Box } from '@mui/material';
import RecommendedJobs from '../Components/RecommendedJobs';
import ScrollingMessages from '../Components/ScrollingMessages';

const Home = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        maxWidth: '100vw',
        overflowX: 'hidden',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          height: 'auto', 
          '@media (min-width: 900px)': {
            height: '85vh', // Keep the height for large screens
          },
        }}
      >
        {/* Left side: Recommended Jobs */}
        <Grid item xs={12} md={6} sx={{ height: '100%' }}>
          <Paper
            elevation={0} 
            sx={{
              padding: '20px',
              height: '100%', // Use full height on large screens
            }}
          >
            <RecommendedJobs />
          </Paper>
        </Grid>

        {/* Right side: Scrolling Messages */}
        <Grid item xs={12} md={6} sx={{ height: '100%' }}>
          <Paper
            elevation={0} 
            sx={{
              padding: '20px',
              height: '100%', // Use full height on large screens
            }}
          >
            <ScrollingMessages />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
