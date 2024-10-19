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
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useAuth } from '../Contexts/AuthContext';
import { useMediaQuery, Button } from '@mui/material';
import ProfileMenu from './ProfileMenu.jsx';

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
    fontWeight: 'bold',
    borderBottom: 'none', // Remove any default border
  },
}));

export default function Navbar() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [selectedPage, setSelectedPage] = React.useState('');
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { user } = useAuth(); 
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null);

  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  React.useEffect(() => {
    setSelectedPage(location.pathname);
  }, [location.pathname]);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{ style: { width: '250px', marginTop: '8px', backgroundColor: theme.palette.background.paper } }} // Ensure background color changes with theme
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
        <StableIconButton aria-label="theme toggler"><ThemeToggler /></StableIconButton>
        {user ? (
          <>
            <StableIconButton aria-label="show new mails">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </StableIconButton>
            <StableIconButton aria-label="show new notifications">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </StableIconButton>
          </>
        ) : null}
      </Box>
      <MobileMenuLinks>
        {['/newjobs', '/careerbenefits', '/careerresources', '/about'].map((path, index) => (
          <Link
            key={index}
            to={path}
            onClick={() => {
              setSelectedPage(path);
              handleMobileMenuClose();
            }}
            style={{
              borderBottom: selectedPage === path ? '3px solid #ff9800' : 'none',
            }}
          >
            {path === '/newjobs' ? 'New Jobs' : path.replace('/', '').replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
          </Link>
        ))}
      </MobileMenuLinks>
    </Menu>
  );

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar position="static" sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white' }}>
        <Toolbar>
          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton size="large" aria-label="open drawer" onClick={handleMobileMenuOpen}>
              <MenuIcon sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} />
            </IconButton>
          </Box>

          {/* Logo */}
          <Box sx={{ display: { xs: 'block', md: 'block' }, flexGrow: 1, textAlign: { md: 'left', xs: 'center' } }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Box component="img" src={KurazJobLogo} alt="Kuraz Job Logo" sx={{ height: 32 }} />
            </Link>
          </Box>

          {/* Mobile Search and Account Icons */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 2 }}>
            <IconButton size="large" onClick={handleSearchClick}>
              <SearchIcon sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} />
            </IconButton>
            <StableIconButton aria-label="account of current user" onClick={handleProfileMenuOpen}>
              <AccountCircle />
            </StableIconButton>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            {['/newjobs', '/careerbenefits', '/careerresources', '/about'].map((path, index) => (
              <Link
                key={index}
                to={path}
                style={{
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  color: theme.palette.mode === 'dark' ? 'white' : 'black',
                  borderBottom: selectedPage === path ? '3px solid #ff9800' : 'none',
                }}
              >
                {path === '/newjobs' ? 'New Jobs' : path.replace('/', '').replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </Link>
            ))}
          </Box>

          {/* Search Bar for Desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon onClick={handleSearchClick} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onClick={handleSearchClick}
              />
            </Search>
          </Box>
          {/* Theme Toggler and User Account/Notification Icons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {user ? (
              <>
                <StableIconButton aria-label="theme toggler">
                  <ThemeToggler />
                </StableIconButton>
                <StableIconButton aria-label="show new mails">
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </StableIconButton>
                <StableIconButton aria-label="show new notifications">
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </StableIconButton>
                <StableIconButton aria-label="account of current user" onClick={handleProfileMenuOpen}>
                  <AccountCircle />
                </StableIconButton>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    marginRight: '10px',
                    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    color: theme.palette.mode === 'dark' ? '#000' : '#fff',
                    font: 'Poppins',
                  }}
                  onClick={() => navigate('/login')} // Navigate to login
                >
                  Login
                </Button>

                <Button 
                  variant="outlined" 
                  color="secondary" 
                  sx={{ 
                    borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                  }}
                  onClick={() => navigate('/signup')} // Navigate to sign up
                >
                  Sign Up
                </Button>

                <StableIconButton aria-label="theme toggler">
                  <ThemeToggler />
                </StableIconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu */}
      {renderMobileMenu}

      {/* Profile Menu */}
      <ProfileMenu
        anchorEl={profileMenuAnchorEl}
        isOpen={isProfileMenuOpen}
        onClose={handleProfileMenuClose}
      />

      {/* Search Bar on Search Page */}
      {location.pathname === '/search' && (
        <AppBar position="fixed" sx={{ top: 0, zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: theme.palette.mode === 'dark' ? 'black' : 'white' }}>
          <Toolbar>
            <IconButton onClick={() => navigate(-1)} aria-label="back" sx={{ mr: 2 }}>
              <ArrowBackIcon sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} />
            </IconButton>
            <Search sx={{ flexGrow: 1 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ width: '100%', height: 40 }} // Adjust height as needed
              />
            </Search>
            <IconButton aria-label="filter" sx={{ ml: 2 }}>
              <FilterListIcon sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
}
