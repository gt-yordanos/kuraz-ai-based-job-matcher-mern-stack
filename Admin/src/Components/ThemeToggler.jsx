import * as React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import { useThemeContext } from '../Contexts/ThemeContext';

export default function ThemeToggler() {
  const { darkMode, toggleTheme } = useThemeContext();

  return (
    <IconButton onClick={toggleTheme} aria-label="theme toggler">
      {darkMode ? (
        <Brightness7Icon style={{ color: '#f39c12' }} />
      ) : (
        <DarkModeIcon style={{ color: '#001e3c' }} />
      )}
    </IconButton>
  );
}
