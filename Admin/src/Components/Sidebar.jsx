import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Link } from 'react-router-dom';
import ThemeToggler from './ThemeToggler';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        bgcolor: 'background.paper',
        height: '100vh',
        padding: '10px',
        boxShadow: 2,
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button component={Link} to="/statistics">
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Job Statistics" />
        </ListItem>

        <ListItem button component={Link} to="/applicants">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Applicants" />
        </ListItem>

        <ListItem button component={Link} to="/leaderboard">
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Leaderboard" />
        </ListItem>

        <ListItem button component={Link} to="/post-job">
          <ListItemIcon>
            <PostAddIcon />
          </ListItemIcon>
          <ListItemText primary="Post Job" />
        </ListItem>
      </List>

      <Box sx={{ marginTop: 'auto' }}>
        <ThemeToggler />
      </Box>
    </Box>
  );
};

export default Sidebar;
