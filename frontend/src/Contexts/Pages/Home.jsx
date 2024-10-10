// Home.js
import React from 'react';
import { Grid } from '@mui/material';
import RecommendedJobs from '../Components/RecommendedJobs';
import ScrollingMessages from '../Components/ScrollingMessages';

const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <RecommendedJobs />
      </Grid>
      <Grid item xs={12} md={6}>
        <ScrollingMessages />
      </Grid>
    </Grid>
  );
};

export default Home;
