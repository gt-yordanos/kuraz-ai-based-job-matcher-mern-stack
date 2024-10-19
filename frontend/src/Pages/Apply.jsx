import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  useTheme,
  TextField,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useAuth } from '../Contexts/AuthContext'; // Adjust the path as necessary

const Apply = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const { user } = useAuth(); // Get the logged-in user info

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getWidth = () => {
    if (window.innerWidth >= 1200) return '65%'; // Large screen
    if (window.innerWidth >= 768) return '80%';  // Medium screen
    return '97%';  // Small screen
  };

  const cardStyle = {
    width: getWidth(), // Dynamically set width based on screen size
    backgroundColor: isDarkMode ? '#242424' : '#e0e0e0',
    color: isDarkMode ? '#fff' : '#000',
    margin: '16px auto', // Center the card
    borderRadius: '12px',
    boxShadow: 'none',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!job) return <div>No job found.</div>;

  return (
    <Card sx={cardStyle}>
      <CardContent>
        <h2>{job.title}</h2>
        <p>{job.description}</p>
        <h3>Requirements:</h3>
        <ul>
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
        <h3>Responsibilities:</h3>
        <ul>
          {job.responsibilities.map((resp, index) => (
            <li key={index}>{resp}</li>
          ))}
        </ul>
        <p>
          <LocationOnIcon /> Location: {job.location}
        </p>
        <p>
          <WorkIcon /> Employment Type: {job.employmentType}
        </p>
        <p>
          <AttachMoneyIcon /> Salary Range: {job.salaryRange}
        </p>
        <p>
          <CalendarTodayIcon /> Deadline: {new Date(job.deadline).toLocaleDateString()}
        </p>

        {/* Pre-fill email and name from user context */}
        <TextField
          label="Your Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user?.name || ''} // Assuming user object has a name property
          onChange={() => {}} // Disable editing
        />
        <TextField
          label="Your Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={user?.email || ''} // Assuming user object has an email property
          onChange={() => {}} // Disable editing
        />
        <TextField
          label="Your Cover Letter"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{
            width: '100%',
            backgroundColor: isDarkMode ? '#fff' : '#000',
            color: isDarkMode ? '#000' : '#fff',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
              backgroundColor: isDarkMode ? '#e0e0e0' : '#333',
            },
          }}
        >
          Apply Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default Apply;
