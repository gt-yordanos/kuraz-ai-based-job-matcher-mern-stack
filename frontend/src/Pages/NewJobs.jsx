import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  useTheme,
  Box,
  useMediaQuery,
  Grid,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CodeIcon from '@mui/icons-material/Code';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import jobImages from '../assets/JobImages'; // Import your images

const NewJobs = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:535px)');
  const isMediumScreen = useMediaQuery('(max-width:900px)');
  const isExtraSmallScreen = useMediaQuery('(max-width:375px)');
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

  const containerStyle = {
    padding: isExtraSmallScreen ? '4px' : isSmallScreen ? '10px' : '15px',
    backgroundColor: isDarkMode ? '#121212' : '#fff',
    minHeight: '100vh',
    color: isDarkMode ? '#fff' : '#000',
  };

  const headerStyle = {
    fontSize: '32px',
    color: isDarkMode ? '#fff' : '#000',
    textAlign: 'center',
    marginBottom: '24px',
  };

  const jobData = [
    {
      title: 'Frontend Developer',
      location: 'Addis Ababa, Ethiopia',
      skills: 'React, JavaScript, CSS',
      timePosted: '2 days ago',
      deadline: '30th October 2024',
      image: jobImages.frontend,
    },
    {
      title: 'Backend Developer',
      location: 'Addis Ababa, Ethiopia',
      skills: 'Node.js, Express, MongoDB',
      timePosted: '1 week ago',
      deadline: '15th November 2024',
      image: jobImages.backend,
    },
    {
      title: 'UI/UX Designer',
      location: 'Addis Ababa, Ethiopia',
      skills: 'Figma, Adobe XD, User Research',
      timePosted: '3 days ago',
      deadline: '1st November 2024',
      image: jobImages.kurazJobAndTech,
    },
    {
      title: 'Data Analyst',
      location: 'Addis Ababa, Ethiopia',
      skills: 'Excel, SQL, Python',
      timePosted: '5 days ago',
      deadline: '10th November 2024',
      image: jobImages.aiEngineer,
    },
    {
      title: 'Full Stack Developer',
      location: 'Addis Ababa, Ethiopia',
      skills: 'MongoDB, Express, React, Node.js',
      timePosted: '1 week ago',
      deadline: '20th November 2024',
      image: jobImages.techJobs,
    },
    {
      title: 'AI Engineer',
      location: 'Addis Ababa, Ethiopia',
      skills: 'Python, TensorFlow, Machine Learning',
      timePosted: '1 day ago',
      deadline: '25th November 2024',
      image: jobImages.aiSelecting,
    },
    {
      title: 'Mobile Developer',
      location: 'Addis Ababa, Ethiopia',
      skills: 'React Native, Java, Swift',
      timePosted: '3 days ago',
      deadline: '5th December 2024',
      image: jobImages.kurazTeam,
    },
  ];

  return (
    <Box sx={containerStyle}>
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isExtraSmallScreen ? '4px' : isSmallScreen ? '10px' : '15px',
        }}
      >
        <h1 style={headerStyle}>New Job Openings</h1>
        <Grid container spacing={2}>
          {jobData.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={cardStyle}>
                <img
                  src={job.image}
                  alt={job.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px 12px 0 0',
                  }}
                />
                <CardContent sx={{ paddingBottom: '4px' }}>
                    <h2 style={{ fontSize: isSmallScreen ? '16px' : '20px', marginBottom: '2px' }}> {/* Changed marginBottom from 4px to 2px */}
                        {job.title}
                    </h2>
                    <p style={{ fontSize: isExtraSmallScreen ? '10px' : isMediumScreen ? '12px' : '14px', marginBottom: '2px' }}>
                        <LocationOnIcon sx={{ fontSize: isExtraSmallScreen ? '10px' : isMediumScreen ? '12px' : '14px' }} /> {job.location}
                    </p>
                    <p style={{ fontSize: isExtraSmallScreen ? '10px' : isMediumScreen ? '12px' : '14px', marginBottom: '2px' }}>
                        <CodeIcon sx={{ fontSize: isExtraSmallScreen ? '10px' : isMediumScreen ? '12px' : '14px' }} /> {job.skills}
                    </p>
                    <p style={{ fontSize: isExtraSmallScreen ? '10px' : isMediumScreen ? '12px' : '14px', marginBottom: '2px' }}>
                        <AccessTimeIcon sx={{ fontSize: isExtraSmallScreen ? '10px' : isMediumScreen ? '12px' : '14px' }} /> {job.timePosted}
                    </p>
                    <p style={{ fontSize: isExtraSmallScreen ? '10px' : isMediumScreen ? '12px' : '14px', marginBottom: '4px' }}>
                        <CalendarTodayIcon sx={{ fontSize: isExtraSmallScreen ? '10px' : isMediumScreen ? '12px' : '14px' }} /> {job.deadline}
                    </p>
                </CardContent>

                <CardActions sx={{ paddingTop: '4px' }}>
                  <Button
                    variant="contained"
                    sx={{
                      width: '100%', // Set button width to 100%
                      backgroundColor: isDarkMode ? '#fff' : '#000',
                      color: isDarkMode ? '#000' : '#fff',
                      '&:hover': {
                        backgroundColor: isDarkMode ? '#e0e0e0' : '#333',
                      },
                    }}
                  >
                    Apply Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default NewJobs;
