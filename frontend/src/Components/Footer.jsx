import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isSmallScreen = useMediaQuery('(max-width:375px)');

  const footerStyle = {
    backgroundColor: isDarkMode ? '#fff' : '#000',
    color: isDarkMode ? '#000' : '#fff',
    padding: isSmallScreen ? '10px' : '12px', // Decreased padding for a shorter height
    textAlign: 'center',
    width: '97%',
    margin: '10px auto',
    borderRadius: '0 0 8px 8px', // Only bottom corners are rounded
  };

  return (
    <Box sx={{ ...footerStyle }}>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', paddingX: '5px' }}>
        <p style={{ fontSize: '14px', fontWeight: 'bold' }}> {/* Made text bold */}
          &copy; {new Date().getFullYear()} Kuraz Technologies. All rights reserved.
        </p>
      </Box>
    </Box>
  );
};

export default Footer;