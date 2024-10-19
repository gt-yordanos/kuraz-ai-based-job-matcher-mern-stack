import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const JobStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/statistics');
        setStatistics(response.data);
      } catch (err) {
        setError('Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 2, bgcolor: 'background.default' }}>
      <Typography variant="h4" color="text.primary">Job Statistics</Typography>
      <Typography color="text.secondary">Total Jobs: {statistics.totalJobs}</Typography>
      <Typography color="text.secondary">Total Applicants: {statistics.totalApplicants}</Typography>
    </Box>
  );
};

export default JobStatistics;
