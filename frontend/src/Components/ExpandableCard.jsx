import React from 'react';
import { Card, CardContent, CardMedia, Button, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ExpandableCard = ({ title, description, image, isOpen, onToggle }) => {
  const theme = useTheme();

  const cardStyle = {
    backgroundColor: theme.palette.mode === 'dark' ? '#242424' : '#e0e0e0',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    marginBottom: '16px',
    borderRadius: '12px',
    boxShadow: 'none',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 'auto', // Use auto height
    transition: 'transform 0.3s ease, height 0.3s ease', // Smooth transition for both transform and height
    overflow: 'hidden', // Prevent overflow of content
    '&:hover': {
      transform: 'scale(1.05)', // Scale effect on hover
      transition: 'transform 0.3s ease', // Ensure smooth transition on hover
    },
  };

  const textSize = {
    title: { fontSize: '16px', fontWeight: 'bold', marginBottom: '2px' }, // Decreased title size
    description: { fontSize: '12px', marginBottom: '4px' }, // Decreased description size
  };

  return (
    <Card sx={cardStyle}>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ height: 140, objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} // Curved top border
      />
      <CardContent>
        <div style={textSize.title}>{title}</div>
        {/* Only show the description if the card is open */}
        {isOpen && <div style={textSize.description}>{description}</div>}
      </CardContent>
      <Button
        variant="contained"
        onClick={onToggle} // Call onToggle on button click
        sx={{
          marginTop: 'auto',
          width: '100%',
          backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
          color: theme.palette.mode === 'dark' ? '#000' : '#fff',
          fontFamily: 'Poppins, sans-serif', // Ensure the font is applied here
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333',
          },
        }}
      >
        {isOpen ? 'Hide Details' : 'Learn More'}
        <ArrowDropDownIcon sx={{ marginLeft: '8px', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
      </Button>
    </Card>
  );
};

export default ExpandableCard;
