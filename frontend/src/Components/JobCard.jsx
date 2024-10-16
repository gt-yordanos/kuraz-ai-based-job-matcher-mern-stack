// JobCard.js
import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  useTheme,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CodeIcon from '@mui/icons-material/Code';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';

const JobCard = ({ job }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

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

  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ paddingBottom: '4px' }}>
        <h2 style={textSize.title}>{job.title}</h2>
        <p style={textSize.location}>
          <LocationOnIcon sx={{ fontSize: '14px' }} /> {job.location}
        </p>
        <p style={textSize.skills}>
          <CodeIcon sx={{ fontSize: '14px' }} /> {job.skills}
        </p>
        <p style={textSize.timePosted}>
          <AccessTimeIcon sx={{ fontSize: '14px' }} /> {job.timePosted}
        </p>
        <p style={textSize.deadline}>
          <EventIcon sx={{ fontSize: '14px' }} /> {job.deadline}
        </p>
      </CardContent>

      <CardActions sx={{ paddingTop: '4px' }}>
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

export default JobCard;
