// src/components/ThemeToggler.jsx

import React from 'react';
import { Switch } from '@mui/material';
import { useTheme } from '../Contexts/ThemeContext';
import { Sun, Moon } from '@mui/icons-material'; // Importing icons

const ThemeToggler = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Sun Icon on the left */}
      <Sun style={{ marginRight: '8px', color: isDarkMode ? '#fff' : '#000' }} />
      <Switch
        checked={isDarkMode}
        onChange={toggleTheme}
        color="default" // Customize the color if needed
      />
      {/* Moon Icon on the right */}
      <Moon style={{ marginLeft: '8px', color: isDarkMode ? '#fff' : '#000' }} />
    </div>
  );
};

export default ThemeToggler;
