import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, IconButton, Grid, useTheme } from '@mui/material';
import { Edit, Delete, LocationOn, AccessTime as AccessTimeIcon, AttachMoney, DateRange } from '@mui/icons-material';
import { useHrAuth } from '../Contexts/HrAuthContext';
import axios from 'axios'; // Import axios
import MessagePopup from '../Components/MessagePopup';

const MyJobs = () => {
  const { hrStaff } = useHrAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupSeverity, setPopupSeverity] = useState('success');
  const theme = useTheme();

  const hrStaffId = hrStaff ? hrStaff.id : '';

  useEffect(() => {
    const fetchJobs = async () => {
      if (hrStaffId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/jobs/hrStaff/${hrStaffId}`);
          setJobs(response.data);
        } catch (error) {
          console.error('Failed to fetch jobs', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchJobs();
  }, [hrStaffId]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleEditJob = (jobId) => {
    console.log(`Edit job with ID: ${jobId}`);
  };

  const handleDeleteJob = async (jobId) => {
    console.log("Deleting job with ID:", jobId);

    if (!jobId) {
      setPopupMessage('Invalid job ID');
      setPopupSeverity('error');
      setOpenPopup(true);
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);

      // Handle different success status codes
      if (response.status === 200 || response.status === 204) { 
        // Optimistically update the UI by removing the job from the list
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        setPopupMessage('Job deleted successfully!');
        setPopupSeverity('success');
      } else {
        setPopupMessage('Failed to delete job');
        setPopupSeverity('error');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      setPopupMessage('Error occurred while deleting the job');
      setPopupSeverity('error');
    } finally {
      setOpenPopup(true); // Show the popup
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', padding: 3 }}>
      <h1 style={{ color: isDarkMode ? 'white' : 'black', marginBottom: '10px', textAlign: 'center' }}>My Jobs</h1>

      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <Grid container spacing={1}>
          {jobs.length === 0 ? (
            <p>No jobs posted yet.</p>
          ) : (
            jobs.map((job) => (
              <Grid item xs={12} key={job._id}>
                <Card sx={{ 
                  borderRadius: 2, 
                  boxShadow: 'none', 
                  backgroundColor: isDarkMode ? '#242424' : '#e0e0e0', 
                  width: '100%',  
                  padding: 1, 
                  margin: 'auto', 
                  height: 'auto', 
                }}>
                  <CardContent sx={{ paddingBottom: 0 }}>
                    <h2 style={{ 
                      color: isDarkMode ? 'white' : 'black', 
                      fontSize: '20px', 
                      margin: '0',
                      whiteSpace: 'nowrap' 
                    }}>
                      {job.title}
                    </h2>
                  </CardContent>

                  <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
                    <Grid container alignItems="center" spacing={0.3}>
                      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOn sx={{ fontSize: 18, marginRight: '5px' }} />
                        <p style={{ 
                          color: isDarkMode ? 'lightgray' : 'black', 
                          fontSize: '16px', 
                          margin: 0,
                          whiteSpace: 'nowrap' 
                        }}>
                          {job.location}
                        </p>
                        <AttachMoney sx={{ fontSize: 18, marginRight: '5px', marginLeft: '10px' }} />
                        <p style={{ 
                          color: isDarkMode ? 'lightgray' : 'black', 
                          fontSize: '16px', 
                          margin: 0,
                          whiteSpace: 'nowrap' 
                        }}>
                          {job.salaryRange}
                        </p>
                      </Grid>

                      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton 
                          color="primary" 
                          onClick={() => handleEditJob(job._id)} 
                          sx={{ fontSize: 24 }}
                        >
                          <Edit />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
                    <Grid container alignItems="center" spacing={0.3}>
                      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTimeIcon sx={{ fontSize: 18, marginRight: '5px' }} />
                        <p style={{ 
                          color: isDarkMode ? 'lightgray' : 'black', 
                          fontSize: '16px', 
                          margin: 0,
                          whiteSpace: 'nowrap' 
                        }}>
                          {formatDate(job.postedDate)}
                        </p>
                        <DateRange sx={{ fontSize: 18, marginRight: '5px', marginLeft: '10px' }} />
                        <p style={{ 
                          color: isDarkMode ? 'lightgray' : 'black', 
                          fontSize: '16px', 
                          margin: 0,
                          whiteSpace: 'nowrap' 
                        }}>
                          {formatDate(job.deadline)}
                        </p>
                      </Grid>

                      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton 
                          color="error" 
                          onClick={() => handleDeleteJob(job._id)} // Ensure using job._id for delete
                          sx={{ fontSize: 24 }}
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}

      <MessagePopup 
        message={popupMessage} 
        messageType={popupSeverity} 
        open={openPopup} 
        onClose={handleClosePopup} 
      />
    </Box>
  );
};

export default MyJobs;
