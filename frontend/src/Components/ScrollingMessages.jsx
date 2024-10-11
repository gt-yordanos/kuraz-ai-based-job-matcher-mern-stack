import React, { useEffect, useState } from 'react';
import { Box, Typography, Pagination, Card, CardContent, CardMedia, useTheme } from '@mui/material';

// Sample images, replace with actual images or URLs
const images = [
  '/path/to/image1.jpg',
  '/path/to/image2.jpg',
  '/path/to/image3.jpg',
  '/path/to/image4.jpg',
  '/path/to/image5.jpg'
];

const messages = [
  "Get AI-recommended jobs that suit your profile.",
  "Upload your resume and let the AI find the best matches.",
  "Apply easily and let the AI handle the rest!",
  "AI will match your profile with jobs and send interview invitations if you fit.",
  "Hundreds of development, design, and tech jobs available!"
];

const ScrollingMessages = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const theme = useTheme(); // Get the current theme

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
    }, 3000); // Change the message every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box 
      sx={{
        padding: 3,
        backgroundColor: theme.palette.mode === 'dark' ? '#242424' : '#e0e0e0',
        borderRadius: '16px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', 
        height: { xs: 'auto', md: '450px' }, // Matches recommender height on larger screens
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Upper Card: Scrolling card container */}
      <Box sx={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', position: 'relative', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            transition: 'transform 0.5s ease-in-out',
            transform: `translateX(-${currentMessage * 100}%)`, // Scroll as one entity
            width: `${messages.length * 100}%`,
          }}
        >
          {messages.map((message, index) => (
            <Card
              key={index}
              sx={{
                maxWidth: '400px',
                width: '400px', // Fixed width for single card display
                backgroundColor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#c0c0c0',
                borderRadius: '12px',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
                marginRight: index < messages.length - 1 ? '16px' : '0', // Gap between cards
                flexShrink: 0, // Prevent shrinking during scroll
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: '100%', height: '200px', objectFit: 'cover' }}
                image={images[index]}
                alt={`Image for ${message}`}
              />
              <CardContent>
                <Typography variant="h6" align="center" sx={{ margin: '16px 0' }}>
                  {message}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Lower Section: Pagination for message navigation */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 2
        }}
      >
        <Pagination
          count={messages.length}
          page={currentMessage + 1}
          onChange={(event, value) => setCurrentMessage(value - 1)}
          sx={{
            '& .MuiPaginationItem-root': {
              color: theme.palette.mode === 'dark' ? 'white' : 'text.primary',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ScrollingMessages;
