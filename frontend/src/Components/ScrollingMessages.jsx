import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, useTheme, useMediaQuery } from '@mui/material';

const images = [
  '/path/to/image1.jpg',
  '/path/to/image2.jpg',
  '/path/to/image3.jpg',
  '/path/to/image4.jpg',
  '/path/to/image5.jpg',
];

const messages = [
  "Welcome to Kuraz Automated Job Hiring, where AI helps us hire talented individuals for Kuraz Tech.",
  "Kuraz Tech specializes in software development, graphic design, and online tutoring.",
  "We are an aspiring team that values social relationships and working together.",
  "At Kuraz, we believe skills are essential; everyone is evaluated based on skills, not background.",
  "We offer competitive salaries to attract the best talent in the industry.",
  "Get AI-recommended jobs that suit your profile.",
  "Upload your resume and let the AI find the best matches.",
  "Apply easily and let the AI handle the rest!",
  "AI will match your profile with jobs and send interview invitations if you fit.",
  "Hundreds of development, design, and tech jobs available!",
];

const ScrollingMessages = () => {
  const theme = useTheme();
  const [currentMessage, setCurrentMessage] = useState(0);
  const scrollRef = useRef(null);

  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const marginLeft = isMediumScreen ? 100 : 50;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth - marginLeft;
      const scrollPosition = currentMessage * (cardWidth + marginLeft);
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [currentMessage]);

  const cardStyles = (index) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#c0c0c0',
    color: theme.palette.mode === 'dark' ? 'white' : 'black',
    borderRadius: '12px',
    boxShadow: 'none',
    width: `calc(100% - ${marginLeft}px)`,
    flexShrink: 0,
    marginLeft: `${index === 0 ? marginLeft / 2 : marginLeft}px`,
    marginRight: `${index === messages.length - 1 ? marginLeft / 2 : 0}px`,
  });

  return (
    <Box
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? '#242424' : '#e0e0e0',
        borderRadius: '16px',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        maxWidth: '800px',
        height: '450px',
        pt: 4,
        pb: 2,
      }}
    >
      {/* Upper Section for Sliding Cards */}
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          overflowX: 'hidden',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          width: '100%',
          height: '90%',
        }}
      >
        {/* Create a continuous loop of messages */}
        {messages.concat(messages).map((message, index) => (
          <Card key={index} sx={cardStyles(index % messages.length)}>
            <CardMedia
              component="img"
              height="250"
              image={images[index % images.length] || '/path/to/default.jpg'}
              alt={`Image for message ${index % messages.length + 1}`}
            />
            <CardContent>
              <Typography variant="h6" align="center">
                {message}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Lower Section for Pagination */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '10%',
          pt: 1,
        }}
      >
        {/* Pagination Dots */}
        {messages.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: currentMessage === index ? 14 : 6, // Increased width for selected dot
              height: 6,
              borderRadius: '3px',
              backgroundColor: currentMessage === index
                ? theme.palette.mode === 'dark' ? 'white' : '#333' // White for selected in dark mode
                : theme.palette.mode === 'dark' ? '#666' : '#b0b0b0', // Lighter shade for unselected in light mode
              mx: 0.3,
              cursor: 'pointer',
              transition: 'background-color 0.3s, width 0.3s', // Smooth transition
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? '#777' : '#888', // Hover color with higher contrast
              },
            }}
            onClick={() => setCurrentMessage(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ScrollingMessages;
