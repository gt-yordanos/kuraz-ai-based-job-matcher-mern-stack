import React from 'react';
import {
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { School } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CourseCard = ({ resource }) => {
  const buttonStyle = {
    backgroundColor: '#000',
    color: '#fff',
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 16px',
    fontFamily: 'Poppins, sans-serif',
    transition: 'none',
    position: 'absolute', // Set the button's position to absolute
    bottom: '16px', // Fixed distance from the bottom
    right: '16px', // Fixed distance from the right
  };

  const titleStyle = {
    fontSize: '20px',
  };

  const descriptionStyle = {
    fontSize: '14px',
  };

  return (
    <Card sx={{
      backgroundColor: '#e0e0e0',
      borderRadius: '12px',
      boxShadow: 'none',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative', // Make the card container relative
      height: '250px',
      minHeight: '200px',
    }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <h2 style={{ display: 'flex', alignItems: 'center', ...titleStyle }}>
          <School sx={{ verticalAlign: 'middle', marginRight: '8px' }} />
          {resource.title}
        </h2>
        <p style={descriptionStyle}>{resource.description}</p>
      </CardContent>
      <Button
        size="small"
        variant="contained"
        sx={buttonStyle}
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={(e) => {
          const arrowIcon = e.currentTarget.querySelector('.arrow-icon');
          if (arrowIcon) arrowIcon.style.transform = 'translateX(5px)';
        }}
        onMouseLeave={(e) => {
          const arrowIcon = e.currentTarget.querySelector('.arrow-icon');
          if (arrowIcon) arrowIcon.style.transform = 'translateX(0)';
        }}
      >
        Go to the Course 
        <ArrowForwardIcon sx={{ marginLeft: '5px', transition: 'transform 0.2s' }} className="arrow-icon" />
      </Button>
    </Card>
  );
};

export default CourseCard;
