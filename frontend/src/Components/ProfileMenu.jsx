import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Box, Button, styled } from '@mui/material';
import { AccountCircle, Settings, Assignment, ExitToApp } from '@mui/icons-material';
import { useAuth } from '../Contexts/AuthContext';
import { useTheme } from '@mui/material/styles';

const MenuLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.mode === 'dark' ? 'white' : 'black',
  padding: theme.spacing(1),
  fontWeight: 'bold',
  justifyContent: 'flex-start',
  display: 'flex',
  alignItems: 'flex-start',
  textAlign: 'left',
  borderBottom: 'none',
  fontFamily: 'Poppins, sans-serif',
  width: '100%',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  },
}));

const ProfileMenu = ({ anchorEl, isOpen, onClose }) => {
  const theme = useTheme();
  const { logout, user } = useAuth(); // Use 'user' to check if logged in

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        style: {
          width: '200px',
          marginTop: '16px',
          marginLeft: '-10px',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <MenuLinks>
        {user ? ( // Conditional rendering based on user state
          <>
            <StyledButton onClick={onClose} component={Link} to="/profile" startIcon={<AccountCircle sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} />}>
              Profile
            </StyledButton>
            <StyledButton onClick={onClose} component={Link} to="/settings" startIcon={<Settings sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} />}>
              Settings
            </StyledButton>
            <StyledButton onClick={onClose} component={Link} to="/my-applications" startIcon={<Assignment sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} />}>
              My Applications
            </StyledButton>
            <StyledButton onClick={handleLogout} startIcon={<ExitToApp sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} />}>
              Logout
            </StyledButton>
          </>
        ) : (
          <>
            <StyledButton onClick={onClose} component={Link} to="/login">
              Login
            </StyledButton>
            <StyledButton onClick={onClose} component={Link} to="/signup">
              Signup
            </StyledButton>
          </>
        )}
      </MenuLinks>
    </Menu>
  );
};

export default ProfileMenu;
