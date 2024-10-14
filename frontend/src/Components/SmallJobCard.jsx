// SmallJobCard.js
import React from 'react';
import { Card, CardContent, Button, Box, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CodeIcon from '@mui/icons-material/Code'; // Icon for skills
import EventIcon from '@mui/icons-material/Event'; // Icon for deadline

const SmallJobCard = ({ job, isMobile }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#c0c0c0',
        color: theme.palette.mode === 'dark' ? 'white' : 'black', // Set text color based on mode
        borderRadius: '12px',
        boxShadow: 'none',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%', // Make the card take full height
        transition: 'transform 0.3s ease',
        '&:hover': { transform: 'scale(1.03)' },
      }}
    >
      <CardContent sx={{ flexGrow: 1, paddingBottom: '8px' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {job.title}
        </div>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
          <CodeIcon fontSize="small" sx={{ fontSize: '14px' }} />
          <span style={{ fontSize: '0.75rem', marginLeft: '4px', color: theme.palette.mode === 'dark' ? 'white' : 'black', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {job.skills}
          </span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
          <AccessTimeIcon fontSize="small" sx={{ fontSize: '14px' }} />
          <span style={{ fontSize: '0.75rem', marginLeft: '4px', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>
            {job.timePosted}
          </span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
          <LocationOnIcon fontSize="small" sx={{ fontSize: '14px' }} />
          <span style={{ fontSize: '0.75rem', marginLeft: '4px', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>
            {job.location}
          </span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
          <EventIcon fontSize="small" sx={{ fontSize: '14px' }} />
          <span style={{ fontSize: '0.75rem', marginLeft: '4px', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>
            {job.deadline}
          </span>
        </Box>
      </CardContent>
      <Box sx={{ padding: '8px 0' }}>
        <Button
          variant="contained"
          sx={{
            width: '100%',
            height: '40px', // Reduced button height
            backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
            color: theme.palette.mode === 'dark' ? '#000' : '#fff',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333',
            },
          }}
        >
          Apply Now
        </Button>
      </Box>
    </Card>
  );
};

export default SmallJobCard;
