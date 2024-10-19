import * as React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode'; // Import DarkModeIcon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Import Brightness7Icon
import IconButton from '@mui/material/IconButton'; // Import IconButton
import { useThemeContext } from '../Contexts/ThemeContext'; // Import your custom Theme Context

export default function ThemeToggler() {
  const { darkMode, toggleTheme } = useThemeContext();

  return (
    <IconButton onClick={toggleTheme} aria-label="theme toggler">
      {darkMode ? (
        <Brightness7Icon style={{ color: '#f39c12' }} /> // Light mode icon
      ) : (
        <DarkModeIcon style={{ color: '#001e3c' }} /> // Dark mode icon
      )}
    </IconButton>
  );
}
