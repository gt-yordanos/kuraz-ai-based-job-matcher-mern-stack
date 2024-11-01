import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CodeIcon from '@mui/icons-material/Code';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import { useAuth } from '../Contexts/AuthContext'; // Adjust the path as necessary
import MessagePopup from './MessagePopup'; // Adjust the path as necessary

const JobCard = ({ job }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user info from context
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const cardStyle = {
    backgroundColor: isDarkMode ? '#242424' : '#e0e0e0',
    color: isDarkMode ? '#fff' : '#000',
    marginBottom: '16px',
    borderRadius: '12px',
    boxShadow: 'none',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  };

  const textSize = {
    title: { fontSize: '20px', marginBottom: '2px' },
    location: { fontSize: '14px', marginBottom: '2px' },
    skills: { fontSize: '14px', marginBottom: '2px' },
    timePosted: { fontSize: '14px', marginBottom: '2px' },
    deadline: { fontSize: '14px', marginBottom: '4px' },
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleApplyClick = () => {
    if (!user) {
      setMessage('Please log in to apply for this job.'); // Set message for unauthenticated users
      setOpen(true); // Open the message popup
    } else {
      navigate(`/apply/${job._id}`); // Navigate to the apply page with the job ID
    }
  };

  const handleCloseMessage = () => {
    setOpen(false); // Close the message popup
  };

  return (
    <>
      <Card sx={cardStyle}>
        <CardContent sx={{ paddingBottom: '4px' }}>
          <h2 style={textSize.title}>{job.title}</h2>
          <p style={textSize.location}>
            <LocationOnIcon sx={{ fontSize: '14px' }} /> {job.location}
          </p>
          <p style={textSize.skills}>
            <CodeIcon sx={{ fontSize: '14px' }} /> 
            {` Skills: ${job.skillsRequired.hardSkills.join(', ')}`} 
          </p>
          <p style={textSize.timePosted}>
            <AccessTimeIcon sx={{ fontSize: '14px' }} /> {formatDate(job.postedDate)}
          </p>
          <p style={textSize.deadline}>
            <EventIcon sx={{ fontSize: '14px' }} /> {formatDate(job.deadline)}
          </p>
        </CardContent>

        <CardActions sx={{ paddingTop: '4px' }}>
          <Button
            variant="contained"
            onClick={handleApplyClick} // Attach click handler
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

      {/* Message Popup for login prompt */}
      <MessagePopup 
        message={message} 
        messageType="error" 
        open={open} 
        onClose={handleCloseMessage} 
      />
    </>
  );
};

export default JobCard;
