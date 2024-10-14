// Home.jsx
import React from 'react';
import { Grid, Paper, Box, useTheme, useMediaQuery } from '@mui/material';
import RecommendedJobs from '../Components/RecommendedJobs';
import ScrollingMessages from '../Components/ScrollingMessages';

const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:535px)');
  const isExtraSmallScreen = useMediaQuery('(max-width:375px)'); // Adjusted to match your requirement

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto', // Set height to auto to match content height
        overflow: 'hidden', // Ensure no overflow in both directions
        padding: isExtraSmallScreen ? '2px' : isSmallScreen ? '5px' : '20px', // Adjust padding based on screen size
        backgroundColor: theme.palette.background.default, // Set background color based on theme
      }}
    >
      <Grid container spacing={2}>
        {/* Right side: Recommended Jobs */}
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Paper
            elevation={0}
            sx={{
              padding: isExtraSmallScreen ? '4px' : isSmallScreen ? '5px' : '20px',
              boxSizing: 'border-box', // Ensure padding doesn't add to the height
              backgroundColor: theme.palette.background.paper, // Set Paper background color based on theme
            }}
          >
            <RecommendedJobs />
          </Paper>
        </Grid>

        {/* Left side: Scrolling Messages (order should be reversed on small screens) */}
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <Paper
            elevation={0}
            sx={{
              padding: isExtraSmallScreen ? '4px' : isSmallScreen ? '5px' : '20px',
              boxSizing: 'border-box', // Ensure padding doesn't add to the height
              backgroundColor: theme.palette.background.paper, // Set Paper background color based on theme
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
