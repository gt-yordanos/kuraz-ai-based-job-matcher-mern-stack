import React, { useState } from 'react';
import { Box, Grid, useTheme, useMediaQuery, Button } from '@mui/material';
import ExpandableCard from '../Components/ExpandableCard'; // Import the ExpandableCard component
import jobImages from '../assets/JobImages'; // Import job images
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useAuth } from '../Contexts/AuthContext'; // Import useAuth to access auth context

const CareerBenefits = () => {
  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery('(max-width:375px)');
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const containerStyle = {
    padding: isExtraSmallScreen ? '4px' : '15px',
    minHeight: '100vh',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  };

  const headerStyle = {
    fontSize: '32px',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    textAlign: 'center',
    marginBottom: '24px',
  };

  const benefits = [
    {
      title: 'Training and Development',
      description: 'We offer comprehensive training programs to enhance your skills and knowledge, ensuring you stay ahead in your career.',
      image: jobImages.training,
    },
    {
      title: 'Competitive Salary',
      description: 'Our salary packages are designed to be competitive and rewarding, reflecting your expertise and contribution.',
      image: jobImages.salary,
    },
    {
      title: 'Professional Growth',
      description: 'We support your career ambitions with clear paths for advancement and opportunities for continuous learning.',
      image: jobImages.professionalDevelopment,
    },
    {
      title: 'Work-Life Balance',
      description: 'Enjoy a healthy work-life balance with our hybrid work model, allowing flexibility between remote and on-site work.',
      image: jobImages.workLifeBalance,
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box sx={containerStyle}>
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isExtraSmallScreen ? '4px' : '15px',
        }}
      >
        <h1 style={headerStyle}>Career Benefits</h1>
        <p style={{ textAlign: 'center', marginBottom: '24px' }}>
          Discover the benefits of working with us and how we support your career aspirations.
        </p>
        <Grid container spacing={2}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ExpandableCard
                title={benefit.title}
                description={benefit.description}
                image={benefit.image}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Encouragement Text and Call to Action */}
        {!user && ( // Check if user is not logged in
          <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
            <h2 style={{
              marginBottom: '16px',
              fontSize: isExtraSmallScreen ? '20px' : '24px', // Responsive font size
            }}>
              Join the Kuraz Tech Community!
            </h2>
            <p style={{
              marginBottom: '24px',
              fontSize: isExtraSmallScreen ? '14px' : '16px', // Responsive font size
            }}>
              There is so much to benefit from us! Be part of a thriving community that values your growth and success. Sign up now to unlock exclusive resources and opportunities!
            </p>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ 
                marginRight: '10px', 
                backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000', 
                color: theme.palette.mode === 'dark' ? '#000' : '#fff', 
                width: isExtraSmallScreen ? '120px' : '150px', // Adjust button width
              }}
              onClick={() => navigate('/login')} // Navigate to login
            >
              Login
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              sx={{ 
                width: isExtraSmallScreen ? '120px' : '150px', // Adjust button width
                borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
              }}
              onClick={() => navigate('/signup')} // Navigate to sign up
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CareerBenefits;
