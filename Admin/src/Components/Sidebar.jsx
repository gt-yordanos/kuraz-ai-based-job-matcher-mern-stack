import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LogoutIcon from '@mui/icons-material/Logout'; // Logout icon
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Collapse icon
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // Expand icon
import { Link, useLocation } from 'react-router-dom';
import ThemeToggler from './ThemeToggler';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: collapsed ? 90 : 250, // Decreased width in collapsed mode
        bgcolor: 'background.paper',
        height: '100vh',
        padding: '20px',
        boxShadow: 3,
        transition: 'width 0.3s',
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
        <ThemeToggler />
        <IconButton onClick={toggleCollapse} sx={{ ml: 1 }}>
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />} {/* Toggle icon based on state */}
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <List>
        {[
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
          { text: 'Job Statistics', icon: <AssessmentIcon />, path: '/statistics' },
          { text: 'Applicants', icon: <PeopleIcon />, path: '/applicants' },
          { text: 'Leaderboard', icon: <AssessmentIcon />, path: '/leaderboard' },
          { text: 'Post Job', icon: <PostAddIcon />, path: '/post-job' },
        ].map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.text}
            sx={{
              borderRadius: 1,
              '&:hover': { bgcolor: 'action.hover' },
              backgroundColor: location.pathname === item.path ? 'action.selected' : 'transparent',
              transition: 'background-color 0.3s',
              paddingLeft: collapsed ? '8px' : '16px',
              height: '56px',
              justifyContent: collapsed ? 'center' : 'flex-start', // Center icons in collapsed mode
            }}
          >
            <ListItemIcon sx={{ color: 'text.primary', minWidth: '40px', display: 'flex', justifyContent: 'center' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ opacity: collapsed ? 0 : 1 }} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ mt: 2 }} />

      <List>
        <ListItem
          button
          sx={{
            borderRadius: 1,
            '&:hover': { bgcolor: 'action.hover' },
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <ListItemIcon sx={{ color: 'text.primary', minWidth: '40px', display: 'flex', justifyContent: 'center' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ opacity: collapsed ? 0 : 1 }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
