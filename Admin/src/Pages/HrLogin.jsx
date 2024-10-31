import React, { useState, useEffect } from 'react';
import {
  Box, TextField, IconButton, InputAdornment, useTheme, useMediaQuery, CircularProgress, Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useHrAuth } from '../Contexts/HrAuthContext'; 
import MessagePopup from '../Components/MessagePopup';
import KurazLogo from '../assets/KurazJobLogo.png';
import { useNavigate } from 'react-router-dom'; 
import ThemeToggler from '../Components/ThemeToggler';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: 16,
  width: '100%',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderWidth: 1,
      borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
    '&:hover fieldset, &.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input, & .MuiFormLabel-root': {
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  },
  '& .MuiFormHelperText-root': {
    color: 'red',
  },
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#242424' : '#e0e0e0',
  borderRadius: 8,
  padding: 16,
  marginBottom: 24,
  width: '100%',
}));

const HrLogin = () => {
  const { login, isAuthenticated } = useHrAuth(); 
  const navigate = useNavigate(); 
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:430px)');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [messagePopupOpen, setMessagePopupOpen] = useState(false);
  const [popupMessageType, setPopupMessageType] = useState('success');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); 
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (!email || !password) {
      setErrors({ email: 'Email is required.', password: 'Password is required.' });
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      setSuccessMessage('Logged in successfully!');
      setPopupMessageType('success');
      setMessagePopupOpen(true);
      navigate('/'); 
    } catch ({ message }) {
      setSuccessMessage(message);
      setPopupMessageType('error');
      setMessagePopupOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Box
        sx={{
          borderRadius: 4,
          border: `1px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}`,
          maxWidth: 400,
          margin: '30px auto',
          padding: 5,
          boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 0 10px rgba(0,0,0,0.1)',
          width: isSmallScreen ? '97%' : 'auto',
          fontFamily: 'Poppins, sans-serif',
          backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
          transition: 'height 0.3s ease',
        }}
      >
        <HeaderContainer>
          <img 
            src={KurazLogo} 
            alt="Kuraz Logo" 
            style={{ 
              width: '80%',  // Responsive size
              maxWidth: '100px', // Maximum width for larger screens
              marginBottom: 8 
            }} 
          />
          <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
            HR Staff Login
          </div>
        </HeaderContainer>
        <form onSubmit={handleSubmit}>
          <MessagePopup message={successMessage} messageType={popupMessageType} open={messagePopupOpen} onClose={() => setMessagePopupOpen(false)} />
          <StyledTextField
            name="email"
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ transition: 'margin 0.3s ease' }}
          />
          <StyledTextField
            name="password"
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ transition: 'margin 0.3s ease' }}
          />
          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              border: 'none', 
              padding: 12, 
              borderRadius: 8, 
              backgroundColor: theme.palette.mode === 'light' ? '#000' : '#fff', // Adjusted background color
              color: theme.palette.mode === 'dark' ? '#000' : '#fff', // Text color adjustment
              cursor: 'pointer', 
              marginTop: 16, 
              height: 48, 
              fontSize: 16 
            }} 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </button>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <Link href="#" onClick={() => console.log('Forgot Password clicked')}>Forgot Password?</Link>
          </div>
        </form>
      </Box>
  );
};

export default HrLogin;
