import KurazJobLogo from '../assets/kurazJobLogo.png';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ThemeToggler from './ThemeToggler';
import { useTheme } from '@mui/material/styles';
import { Link } from '@mui/material'; // Material UI Link component

// Styled components for search bar and mobile menu links
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.1) : alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.15) : alpha(theme.palette.common.black, 0.2),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.mode === 'dark' ? 'white' : 'black',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? 'white' : 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StableIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
  },
}));

const MobileMenuLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '& a': {
    textDecoration: 'none',
    color: theme.palette.mode === 'dark' ? 'white' : 'black',
    padding: theme.spacing(1),
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function Navbar() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} // Adjust to 'bottom' to place it below the AppBar
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }} // Ensure the transform aligns correctly
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{ style: { width: '250px', marginTop: '8px' } }} // Add marginTop to create a gap between the menu and the AppBar
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
        <StableIconButton aria-label="theme toggler"><ThemeToggler /></StableIconButton>
        <StableIconButton aria-label="show new mails"><Badge badgeContent={4} color="error"><MailIcon /></Badge></StableIconButton>
        <StableIconButton aria-label="show new notifications"><Badge badgeContent={17} color="error"><NotificationsIcon /></Badge></StableIconButton>
      </Box>
      <MobileMenuLinks>
        <Link href="#newjobs" underline="none">New Jobs</Link>
        <Link href="#careerbenefits" underline="none">Career Benefits</Link>
        <Link href="#newjobs" underline="none">Career Resources</Link>
        <Link href="#newjobs" underline="none">About Us</Link>
      </MobileMenuLinks>
    </Menu>
  );
  

  return (
    <Box sx={{ flexGrow: 1, width: '100%'}}>
      <AppBar position="static" sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white' }}>
        <Toolbar>
          {/* Left Menu icon for mobile */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton size="large" aria-label="open drawer" onClick={handleMobileMenuOpen}>
              <MenuIcon sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} />
            </IconButton>
          </Box>

          {/* Center logo */}
          <Box sx={{ display: { xs: 'block', md: 'block'}, flexGrow: 1, textAlign: {md: 'left', xs: 'center'} }}>
              <Link href="#home" underline="none">
                <Box component="img" src={KurazJobLogo} alt="Kuraz Job Logo" sx={{ height: 32 }} />
              </Link>
          </Box>

          {/* Right Icons on mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 2 }}>
            <IconButton size="large"><SearchIcon sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} /></IconButton>
            <StableIconButton aria-label="account of current user"><AccountCircle /></StableIconButton>
          </Box>

          {/* Center nav links for larger screens */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Link href="#newjobs" underline="none" sx={{ fontWeight: 'bold', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>New Jobs</Link>
            <Link href="#careerbenefits" underline="none" sx={{ fontWeight: 'bold', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>Career Benefits</Link>
            <Link href="#careerresources" underline="none" sx={{ fontWeight: 'bold', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>Career Resources</Link>
            <Link href="#about" underline="none" sx={{ fontWeight: 'bold', color: theme.palette.mode === 'dark' ? 'white' : 'black' }}>About Us</Link>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex', lg: 'none' }, alignItems: 'center', gap: 2 }}>
            <IconButton size="large"><SearchIcon sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} /></IconButton>
          </Box>

           {/* Center search box for larger screens */}
           <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>
          </Box>

          {/* Right Icons for larger screens */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <StableIconButton aria-label="theme toggler"><ThemeToggler /></StableIconButton>
            <StableIconButton aria-label="show new mails"><Badge badgeContent={4} color="error"><MailIcon /></Badge></StableIconButton>
            <StableIconButton aria-label="show new notifications"><Badge badgeContent={17} color="error"><NotificationsIcon /></Badge></StableIconButton>
            <StableIconButton aria-label="account of current user"><AccountCircle /></StableIconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}