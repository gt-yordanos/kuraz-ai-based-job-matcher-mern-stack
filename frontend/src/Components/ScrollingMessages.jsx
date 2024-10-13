import React, { useEffect, useState, useRef } from 'react';
import { Box, Card, CardContent, CardMedia, useTheme, useMediaQuery } from '@mui/material';
import jobImages from '../assets/JobImages';

const messagesWithImages = [
  { text: "Welcome to Kuraz Automated Job Hiring, where AI helps us hire talented individuals for Kuraz Tech.", image: jobImages.kurazJobAndTech },
  { text: "Kuraz Tech specializes in software development, graphic design, and online tutoring.", image: jobImages.workingAtKuraz },
  { text: "We are an aspiring team that values social relationships and working together.", image: jobImages.kurazTeam },
  { text: "At Kuraz, we believe skills are essential; everyone is evaluated based on skills, not background.", image: jobImages.skill },
  { text: "Hundreds of development, design, and tech jobs available!", image: jobImages.techJobs },
  { text: "We offer competitive salaries to attract the best talent in the industry.", image: jobImages.salary },
  { text: "Upload your resume", image: jobImages.resume },
  { text: "Apply easily and let the AI handle the rest!", image: jobImages.applyNow },
  { text: "AI selects jobs that match your profile.", image: jobImages.aiThinking },
  { text: "If a match is found, you will be scheduled an interview immediately.", image: jobImages.interview },
];

const ScrollingMessages = () => {
  const theme = useTheme();
  const [currentMessage, setCurrentMessage] = useState(0);
  const scrollRef = useRef(null);
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const marginLeft = isMediumScreen ? 100 : 50;

  // Set the container height dynamically based on screen size
  const containerHeight = useMediaQuery('(max-width: 470px)') ? '270px' : '450px'; // 450px - 40% = 270px

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messagesWithImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth - marginLeft;
      scrollRef.current.scrollTo({
        left: currentMessage * (cardWidth + marginLeft),
        behavior: 'smooth',
      });
    }
  }, [currentMessage, marginLeft]);

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
        height: containerHeight,
        pt: 4,
        pb: 2,
      }}
    >
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
        {messagesWithImages.map((item, index) => (
          <Card key={index} sx={{
            backgroundColor: theme.palette.mode === 'dark' ? '#0a0a0a' : '#c0c0c0',
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
            borderRadius: '12px',
            boxShadow: 'none',
            width: `calc(100% - ${marginLeft}px)`,
            flexShrink: 0,
            marginLeft: `${index === 0 ? marginLeft / 2 : marginLeft}px`,
            marginRight: `${index === messagesWithImages.length - 1 ? marginLeft / 2 : 0}px`,
          }}>
            <CardMedia component="img" height="250" image={item.image || '/path/to/default.jpg'} alt={`Image for message ${index + 1}`} />
            <CardContent>
              <div style={{ textAlign: 'center' }}>{item.text}</div>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10%', pt: 1 }}>
        {messagesWithImages.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: currentMessage === index ? 14 : 6,
              height: 6,
              borderRadius: '3px',
              backgroundColor: currentMessage === index
                ? theme.palette.mode === 'dark' ? 'white' : '#333'
                : theme.palette.mode === 'dark' ? '#666' : '#b0b0b0',
              mx: 0.3,
              cursor: 'pointer',
              transition: 'background-color 0.3s, width 0.3s',
              '&:hover': { backgroundColor: theme.palette.mode === 'dark' ? '#777' : '#888' },
            }}
            onClick={() => setCurrentMessage(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ScrollingMessages;
