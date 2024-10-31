import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, useTheme } from '@mui/material';
import { Dashboard, People, Work, PostAdd, Logout, ChevronLeft, ChevronRight, Assessment } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggler from './ThemeToggler';
import Images from '../assets/Images.js';
import { useHrAuth } from '../Contexts/HrAuthContext';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const { logout } = useHrAuth();

  const toggleCollapse = () => setCollapsed(prev => !prev);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'All Jobs', icon: <Work />, path: '/jobs' },
    { text: 'Applicants', icon: <People />, path: '/applicants' },
    { text: 'Leaderboard', icon: <Assessment />, path: '/leaderboard' },
    { text: 'Post Job', icon: <PostAdd />, path: '/post-job' },
  ];

  const selectedBgColor = theme.palette.mode === 'light' ? '#d9d9d9' : '#424242';
  const hoverBgColor = theme.palette.mode === 'light' ? '#c0c0c0' : '#616161';

  const handleLogout = () => {
    logout();
  };

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
              // Prevent red text color on click
              color: location.pathname === path ? 'text.primary' : 'inherit',
              '&.Mui-selected': {
                backgroundColor: selectedBgColor,
                color: 'text.primary',
              },
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
          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            '&:hover': { backgroundColor: hoverBgColor },
            justifyContent: collapsed ? 'center' : 'flex-start',
            color: 'inherit', // Ensure the logout text does not change color
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
