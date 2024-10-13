import React from 'react';
import { Grid, Paper, Box } from '@mui/material';
import RecommendedJobs from '../Components/RecommendedJobs';
import ScrollingMessages from '../Components/ScrollingMessages';

const Home = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        overflowX: 'hidden',
        padding: '20px',
      }}
    >
      <Grid container spacing={2}>
        {/* Left side: Recommended Jobs */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ padding: '20px' }}>
            <RecommendedJobs />
          </Paper>
        </Grid>

        {/* Right side: Scrolling Messages (reverse order on small screens) */}
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <Paper elevation={0} sx={{ padding: '20px' }}>
            <ScrollingMessages />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
