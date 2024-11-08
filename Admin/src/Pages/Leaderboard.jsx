import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
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
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const Leaderboard = () => {
  const [jobId, setJobId] = useState('');
  const [jobOptions, setJobOptions] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the token from localStorage (since we're not relying on the context for HR data anymore)
  const token = localStorage.getItem('hrToken');
  let hrStaff = null;

  // If a token exists, decode it to extract HR staff data
  if (token) {
    try {
      const decodedToken = jwtDecode(token);  // Decode the JWT to extract staff info
      hrStaff = decodedToken;  // Extract HR staff information (such as id, email)
    } catch (error) {
      console.error('Error decoding token:', error);
      setError('Failed to decode token');
    }
  }

  // Fetch jobs posted by the HR staff
  const fetchJobsByHrStaff = async () => {
    if (!hrStaff || !hrStaff.id) {  // Use 'id' instead of '_id' here
      setError('HR Staff not authenticated');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/jobs/hrStaff/${hrStaff.id}`);  // Use 'id' instead of '_id' here
      setJobOptions(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs');
    }
  };

  // Fetch leaderboard data for the selected job
  const fetchLeaderboard = async (selectedJobId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/leaderboard/${selectedJobId}`);
      const data = response.data;

      // Calculate rank based on score
      const sortedData = data.sort((a, b) => b.score - a.score); // Sort by score descending
      sortedData.forEach((entry, index) => {
        entry.rank = index + 1;  // Assign rank based on sorted order
      });

      setLeaderboardData(sortedData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch leaderboard data');
    } finally {
      setLoading(false);
    }
  };

  // Handle the job selection change
  const handleJobChange = (event) => {
    setJobId(event.target.value);
  };

  // Trigger leaderboard update
  const handleUpdateLeaderboard = async () => {
    if (!jobId) {
      setError('Please select a job first');
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/leaderboard/update/', { jobId });
      setError(null);
      alert('Leaderboard updated successfully!');
      fetchLeaderboard(jobId);  // Fetch the updated leaderboard data
    } catch (err) {
      setError('Failed to update leaderboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hrStaff) {
      fetchJobsByHrStaff();
    }
  }, [hrStaff]);

  useEffect(() => {
    if (jobId) {
      fetchLeaderboard(jobId);
    }
  }, [jobId]);

  // If HR staff isn't authenticated, show an error message or redirect
  if (!hrStaff || !hrStaff.id) {  // Use 'id' here as well
    return (
      <Box sx={{ padding: 2, bgcolor: 'background.default' }}>
        <Typography variant="h4" color="error">
          HR Staff not authenticated. Please login.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, bgcolor: 'background.default' }}>
      <Typography variant="h4" color="text.primary">
        Leaderboard for Job: {jobId || 'Select a Job'}
      </Typography>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Job Selection</InputLabel>
        <Select value={jobId} onChange={handleJobChange}>
          {jobOptions.length === 0 ? (
            <MenuItem value="" disabled>
              No jobs available
            </MenuItem>
          ) : (
            jobOptions.map((job) => (
              <MenuItem key={job._id} value={job._id}>
                {job.title}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleUpdateLeaderboard} 
        disabled={loading}
        sx={{ marginBottom: 2 }}
      >
        {loading ? 'Updating...' : 'Update Leaderboard'}
      </Button>

      {/* Show loading spinner while data is being fetched */}
      {loading && <CircularProgress />}

      {/* Show error message if fetching fails */}
      {error && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Applicant ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((row) => (
              <TableRow key={row.applicantId._id}>
                <TableCell>{row.rank}</TableCell>
                <TableCell>{row.applicantId._id}</TableCell>
                <TableCell>{row.applicantId.name}</TableCell>
                <TableCell>{row.score}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => alert(`Scheduling interview for Applicant ID: ${row.applicantId._id}`)}>
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
