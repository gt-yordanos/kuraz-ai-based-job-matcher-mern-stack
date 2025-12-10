import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, IconButton, Grid, useTheme } from '@mui/material';
import { Edit, Delete, LocationOn, AccessTime as AccessTimeIcon, AttachMoney } from '@mui/icons-material';
import { useHrAuth } from '../Contexts/HrAuthContext';
import axios from 'axios'; // Import axios
import MessagePopup from '../Components/MessagePopup';

const Applicants = () => {
  const { hrStaff } = useHrAuth();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupSeverity, setPopupSeverity] = useState('success');
  const theme = useTheme();

  const hrStaffId = hrStaff ? hrStaff.id : '';

  // Fetch applicants (scheduled interviews) based on the hrStaffId
  useEffect(() => {
    const fetchApplicants = async () => {
      if (hrStaffId) {
        try {
          // Make API call to fetch scheduled interviews (applicants)
          const response = await axios.get(`http://localhost:5000/api/applications/hr/${hrStaffId}/scheduled-interviews`);
          
          // Log the response to check if the data is being fetched correctly
          console.log(response.data);

          // Filter out only the applicants with scheduled interviews
          const scheduledApplicants = response.data.filter((applicant) => applicant.interviewStatus === 'Scheduled');
          setApplicants(scheduledApplicants);
        } catch (error) {
          console.error('Failed to fetch applicants', error);
          setPopupMessage('Failed to fetch applicants');
          setPopupSeverity('error');
          setOpenPopup(true);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApplicants();
  }, [hrStaffId]);

  // Helper function to format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleEditApplicant = (applicantId) => {
    console.log(`Edit applicant with ID: ${applicantId}`);
    // Implement edit functionality here
  };

  const handleDeleteApplicant = async (applicantId) => {
    console.log("Deleting applicant with ID:", applicantId);

    if (!applicantId) {
      setPopupMessage('Invalid applicant ID');
      setPopupSeverity('error');
      setOpenPopup(true);
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/applications/${applicantId}`);

      if (response.status === 200 || response.status === 204) {
        // Optimistically update the UI by removing the applicant from the list
        setApplicants((prevApplicants) => prevApplicants.filter((applicant) => applicant._id !== applicantId));
        setPopupMessage('Applicant deleted successfully!');
        setPopupSeverity('success');
      } else {
        setPopupMessage('Failed to delete applicant');
        setPopupSeverity('error');
      }
    } catch (error) {
      console.error('Error deleting applicant:', error);
      setPopupMessage('Error occurred while deleting the applicant');
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
      <h1 style={{ color: isDarkMode ? 'white' : 'black', marginBottom: '10px', textAlign: 'center' }}>Scheduled Interviews</h1>

      {loading ? (
        <p>Loading applicants...</p>
      ) : (
        <Grid container spacing={1}>
          {applicants.length === 0 ? (
            <p>No scheduled interviews yet.</p>
          ) : (
            applicants.map((applicant) => (
              <Grid item xs={12} key={applicant._id}>
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
                      {applicant.applicantId?.firstName} {applicant.applicantId?.lastName}
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
                          {applicant.applicantId?.location}
                        </p>
                        <AttachMoney sx={{ fontSize: 18, marginRight: '5px', marginLeft: '10px' }} />
                        <p style={{ 
                          color: isDarkMode ? 'lightgray' : 'black', 
                          fontSize: '16px', 
                          margin: 0,
                          whiteSpace: 'nowrap' 
                        }}>
                          {applicant.applicantId?.expectedSalary}
                        </p>
                      </Grid>

                      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton 
                          color="primary" 
                          onClick={() => handleEditApplicant(applicant._id)} 
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
                          {formatDate(applicant.interviewDate)}
                        </p>
                      </Grid>

                      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton 
                          color="error" 
                          onClick={() => handleDeleteApplicant(applicant._id)} 
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

export default Applicants;
