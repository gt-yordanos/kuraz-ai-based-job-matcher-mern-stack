// src/components/ScrollingMessages.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Pagination } from '@mui/material';

const messages = [
  "Get AI-recommended jobs that suit your profile.",
  "Upload your resume and let the AI find the best matches.",
  "Apply easily and let the AI handle the rest!",
  "AI will match your profile with jobs and send interview invitations if you fit.",
  "Hundreds of development, design, and tech jobs available!"
];

const ScrollingMessages = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
    }, 3000); // Change the message every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 80% Height: Scrolling container */}
      <Box sx={{ height: '80%', position: 'relative', overflow: 'hidden' }}>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            transition: 'transform 0.5s ease-in-out', // Faster transition
            transform: `translateX(-${currentMessage * (100 / messages.length)}%)`, // Update to move to the current message
            width: `${messages.length * 100}%`, // Ensure the container's width matches the total number of messages
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                width: `${100 / messages.length}%`, // Each message should take a fraction of the container's width
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              <Typography variant="h6" align="center">
                {message}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* 20% Height: Scrolling dots */}
      <Box
        sx={{
          height: '20%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pagination
          count={messages.length}
          page={currentMessage + 1}
          onChange={(event, value) => setCurrentMessage(value - 1)}
        />
      </Box>
    </Box>
  );
};

export default ScrollingMessages;
