import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  TextField,
  Autocomplete,
  Chip,
  useTheme,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import MessagePopup from '../Components/MessagePopup';
import UpdateIcon from '@mui/icons-material/Update'; // Import UpdateIcon
import FilterListIcon from '@mui/icons-material/FilterList'; // Import FilterIcon
import ApplicantDetailsPopup from '../Components/ApplicantDetailsPopup';
const Leaderboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobOptions, setJobOptions] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success');
  const [lastUpdate, setLastUpdate] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [filterOption, setFilterOption] = useState(null);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const token = localStorage.getItem('hrToken');
  const hrStaff = token ? JSON.parse(atob(token.split('.')[1])) : null;

  const theme = useTheme(); // Get the current theme (light/dark)

  // Fetch Jobs by HR Staff ID
  const fetchJobsByHrStaff = async () => {
    if (!hrStaff?.id) {
      setError('HR Staff not authenticated');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs/hrStaff/${hrStaff.id}`);
      setJobOptions(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs');
    }
  };

  // Fetch Leaderboard Data based on selected Job ID
  const fetchLeaderboard = async (selectedJobId) => {
    if (!selectedJobId) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/leaderboard/${selectedJobId}`);
      const sortedData = response.data.sort((a, b) => b.score - a.score);
      sortedData.forEach((entry, index) => (entry.rank = index + 1));
      setLeaderboardData(sortedData);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      setError('Failed to fetch leaderboard data');
    } finally {
      setLoading(false);
    }
  };

  // Handle Job selection from Autocomplete
  const handleJobChange = (event, newValue) => {
    setSelectedJob(newValue);
    if (newValue && newValue._id) {
      localStorage.setItem('selectedJob', JSON.stringify(newValue));
    } else {
      setError('Invalid job selected');
    }
  };

  const handleUpdateLeaderboard = async () => {
    if (!selectedJob || !selectedJob._id) {
      setPopupMessage('Please select a valid job first');
      setPopupType('error');
      setPopupOpen(true);
      return;
    }
    try {
      setLoading(true); // Show loading spinner
      await axios.post('http://localhost:5000/api/leaderboard/update/', { jobId: selectedJob._id });
      fetchLeaderboard(selectedJob._id); // Refresh leaderboard after update
    } catch (err) {
      setPopupMessage('Failed to update leaderboard');
      setPopupType('error');
      setPopupOpen(true);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  useEffect(() => {
    const savedJob = localStorage.getItem('selectedJob');
    if (savedJob) {
      const job = JSON.parse(savedJob);
      setSelectedJob(job);
    }
  }, []);

  // Fetch jobs on HR staff ID load
  useEffect(() => {
    if (hrStaff) {
      fetchJobsByHrStaff();
    }
  }, [hrStaff]);

  // Fetch leaderboard when selectedJob changes
  useEffect(() => {
    if (selectedJob && selectedJob._id) {
      fetchLeaderboard(selectedJob._id);
    }
  }, [selectedJob]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedJob && selectedJob._id) {
        handleUpdateLeaderboard(); // Make sure this is only called if selectedJob is set
      }
    }, 10 * 60 * 1000); // 10 minutes in milliseconds
  
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [selectedJob]); 

  // Display time since last update
  const getTimeSinceLastUpdate = () => {
    if (!lastUpdate) return '';
    const now = new Date();
    const minutes = Math.floor((now - lastUpdate) / 60000);
    return minutes === 0 ? 'Just now' : `${minutes} minutes ago`;
  };

  // Filter button handling
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterOptionSelect = (option) => {
    setFilterOption(option);
    setFilterAnchorEl(null);
    // Implement filter logic here
  };

  const handleRowClick = (row) => {
    setSelectedRow(row); // Ensure this is setting the state correctly
};

  return (
    <Box sx={{ padding: 0, bgcolor: 'background.default' }}>
      <MessagePopup
        message={popupMessage}
        messageType={popupType}
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
      <Autocomplete
        value={selectedJob}
        onChange={handleJobChange}
        options={jobOptions}
        getOptionLabel={(option) => option.title || 'Untitled Job'}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Job"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  <Chip
        label={
          loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: 'auto' }}>
              <CircularProgress
                size={18}
                sx={{
                  color: theme.palette.mode === 'dark' ? 'white' : 'black', // Set the progress color based on theme
                }}
              />
            </Box>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
              <UpdateIcon sx={{ marginRight: 1 , width: 20}} />
              <span style={{ fontSize: '0.9rem' }}>{getTimeSinceLastUpdate()}</span> {/* Increase the text size */}
            </Box>
          )
        }
        size="small"
        sx={{
          ml: 1,
          borderRadius: '30px',
          backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#e0e0e0',
          py: 2, // Increased vertical padding
        }}
      />

                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        fullWidth
        size="small"
      />
        
        <IconButton onClick={handleFilterClick}>
          <FilterListIcon />
        </IconButton>
      </Box>

      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem onClick={() => handleFilterOptionSelect('gender')}>Gender</MenuItem>
        <MenuItem onClick={() => handleFilterOptionSelect('age')}>Age</MenuItem>
        {/* Add more filter options if needed */}
      </Menu>

      <TableContainer component={Paper} sx={{ maxHeight: 400, marginTop: 2, overflowY: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Matched Hard Skills (%)</TableCell>
              <TableCell>Matched Soft Skills (%)</TableCell>
              <TableCell>Meets CGPA</TableCell>
              <TableCell>Experience Match</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((row) => (
                <TableRow key={row.applicantId?._id} onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
                <TableCell>{row.rank}</TableCell>
                <TableCell>{parseFloat(row.hardSkillMatchPercentage).toFixed(2)}%</TableCell>
                <TableCell>{parseFloat(row.softSkillMatchPercentage).toFixed(2)}%</TableCell>
                <TableCell>{row.meetsGpa ? 'Yes' : 'No'}</TableCell>
                <TableCell>{row.hasMinimumExperience ? 'Yes' : 'No'}</TableCell>
                <TableCell>{parseFloat(row.score).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ApplicantDetailsPopup
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
      />
    </Box>
  );
};

export default Leaderboard;
