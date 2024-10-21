import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import PropTypes from 'prop-types';

const Leaderboard = () => {
  const [jobId, setJobId] = useState('job1');

  // Sample job options
  const jobOptions = [
    { id: 'job1', title: 'Software Engineer' },
    { id: 'job2', title: 'Product Manager' },
    { id: 'job3', title: 'Data Scientist' },
  ];

  // Sample data for demonstration
  const data = {
    job1: [
      { applicantId: '1', name: 'Alice Johnson', score: 95, rank: 1 },
      { applicantId: '2', name: 'Bob Smith', score: 90, rank: 2 },
      { applicantId: '3', name: 'Charlie Brown', score: 85, rank: 3 },
      { applicantId: '4', name: 'David Wilson', score: 80, rank: 4 },
      { applicantId: '5', name: 'Eva Adams', score: 75, rank: 5 },
    ],
    job2: [
      { applicantId: '1', name: 'John Doe', score: 88, rank: 1 },
      { applicantId: '2', name: 'Jane Roe', score: 85, rank: 2 },
    ],
    job3: [
      { applicantId: '1', name: 'Chris P. Bacon', score: 92, rank: 1 },
      { applicantId: '2', name: 'Sara Connor', score: 89, rank: 2 },
    ],
  };

  const handleJobChange = (event) => {
    setJobId(event.target.value);
  };

  const handleScheduleInterview = (applicantId) => {
    // Placeholder for scheduling interview logic
    alert(`Scheduling interview for Applicant ID: ${applicantId}`);
  };

  return (
    <Box sx={{ padding: 2, bgcolor: 'background.default' }}>
      <Typography variant="h4" color="text.primary">Leaderboard for Job: {jobId}</Typography>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Job Selection</InputLabel>
        <Select value={jobId} onChange={handleJobChange}>
          {jobOptions.map((job) => (
            <MenuItem key={job.id} value={job.id}>{job.title}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Applicant ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Rank</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data[jobId].map((row) => (
              <TableRow key={row.applicantId}>
                <TableCell>{row.applicantId}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.score}</TableCell>
                <TableCell>{row.rank}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    onClick={() => handleScheduleInterview(row.applicantId)}
                  >
                    Schedule Interview
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Leaderboard;
