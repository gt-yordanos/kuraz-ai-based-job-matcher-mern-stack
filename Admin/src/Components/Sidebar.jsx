import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, useTheme } from '@mui/material';
import { Dashboard, People, Assessment, PostAdd, Logout, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggler from './ThemeToggler';
import Images from '../assets/Images.js';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const theme = useTheme(); // Get the current theme
  const toggleCollapse = () => setCollapsed(prev => !prev);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Job Statistics', icon: <Assessment />, path: '/statistics' },
    { text: 'Applicants', icon: <People />, path: '/applicants' },
    { text: 'Leaderboard', icon: <Assessment />, path: '/leaderboard' },
    { text: 'Post Job', icon: <PostAdd />, path: '/post-job' },
  ];

  // Define colors based on the theme
  const selectedBgColor = theme.palette.mode === 'light' ? '#f0f0f0' : '#424242'; // Light gray for selected in light mode, dark gray for dark mode
  const hoverBgColor = theme.palette.mode === 'light' ? '#e0e0e0' : '#616161'; // Slightly darker gray for hover in light mode, medium gray for dark mode

  return (
    <Box
      sx={{
        width: collapsed ? 85 : 230,
        bgcolor: 'background.paper',
        height: '100vh',
        p: 2,
        boxShadow: 5,
        transition: 'width 0.3s',
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={Images.KurazJobLogo}
          alt="KurazJob Logo"
          style={{ height: collapsed ? '25px' : '40px', transition: 'height 0.3s', marginBottom: '10px' }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ThemeToggler sx={{ fontSize: '24px' }} />
          <IconButton onClick={toggleCollapse} sx={{ fontSize: '24px' }}>
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItem
            button
            component={Link}
            to={path}
            key={text}
            sx={{
              borderRadius: 1,
              backgroundColor: location.pathname === path ? selectedBgColor : 'transparent',
              '&:hover': { backgroundColor: hoverBgColor },
              pl: collapsed ? 1 : 2,
              height: '40px',
              justifyContent: 'flex-start',
            }}
            selected={location.pathname === path}
          >
            <ListItemIcon sx={{ color: 'text.primary', minWidth: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ opacity: collapsed ? 0 : 1, display: 'flex', alignItems: 'center' }} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 2 }} />
      <List>
        <ListItem
          button
          sx={{
            borderRadius: 1,
            '&:hover': { backgroundColor: hoverBgColor },
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <ListItemIcon sx={{ color: 'text.primary', minWidth: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ opacity: collapsed ? 0 : 1, display: 'flex', alignItems: 'center' }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
