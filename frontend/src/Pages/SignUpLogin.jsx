import React, { useState, useEffect } from 'react'; 
import {
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import MessagePopup from '../Components/MessagePopup';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '16px',
  width: '100%',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderWidth: 2,
      borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputBase-input': {
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  },
  '& .MuiFormLabel-root': {
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  },
  '& .MuiFormHelperText-root': {
    color: 'red',
  },
}));

const SignUpLogin = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isSmallScreen = useMediaQuery('(max-width:375px)');
  const navigate = useNavigate();
  const location = useLocation();

  const containerStyle = {
    backgroundColor: isDarkMode ? '#242424' : '#e0e0e0',
    color: isDarkMode ? '#fff' : '#000',
    padding: isSmallScreen ? '10px' : '20px',
    borderRadius: '12px',
    maxWidth: '400px',
    margin: '50px auto',
    fontFamily: 'Poppins, sans-serif',
    boxShadow: isDarkMode ? 'none' : '0 0 10px rgba(0, 0, 0, 0.1)',
    width: isSmallScreen ? '97%' : 'auto',
  };

  const buttonStyle = {
    backgroundColor: isDarkMode ? '#fff' : '#000',
    color: isDarkMode ? '#000' : '#fff',
    width: '100%',
    marginTop: '16px',
  };

  const { login, signUp, user } = useAuth();

  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [messagePopupOpen, setMessagePopupOpen] = useState(false);
  const [popupMessageType, setPopupMessageType] = useState('success');
  const [birthDate, setBirthDate] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsLogin(location.pathname === '/login');
  }, [location.pathname]);

  useEffect(() => {
    if (user) {
      setSuccessMessage('Logged in Successfully!.');
      setMessagePopupOpen(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
    setSuccessMessage('');
    setMessagePopupOpen(false);
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const confirmPassword = formData.get('confirmPassword');

    const validationErrors = validateForm(email, password, confirmPassword, firstName, lastName, birthDate);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        if (isLogin) {
          await login(email, password);
          setSuccessMessage('Logged in successfully!');
          setPopupMessageType('success');
          setMessagePopupOpen(true);
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          await signUp(firstName, lastName, birthDate, email, password);
          setSuccessMessage('Sign-up successful! You can now log in.');
          setPopupMessageType('success');
          setIsLogin(true);
          setMessagePopupOpen(true);
        }
      } catch (error) {
        const message = error.message.includes('E11000 duplicate key error') 
          ? 'This email is already registered. Please use a different email.'
          : error.message;

        setSuccessMessage(message);
        setPopupMessageType('error');
        setMessagePopupOpen(true);
      }
    } else {
      setSuccessMessage('Please fix the errors below.');
      setPopupMessageType('error');
      setMessagePopupOpen(true);
    }
    setLoading(false);
  };

  const validateForm = (email, password, confirmPassword, firstName, lastName, birthDate) => {
    const errors = {};
    if (!email) errors.email = 'Email is required.';
    if (!password) errors.password = 'Password is required.';
    if (isLogin) {
      // No password strength validation for login
    } else {
      if (password.length < 8) errors.password = 'Password must be at least 8 characters.';
      if (!/[A-Z]/.test(password)) errors.password = 'Password must contain at least one uppercase letter.';
      if (!/[0-9]/.test(password)) errors.password = 'Password must contain at least one number.';
      if (!confirmPassword) errors.confirmPassword = 'Confirm Password is required.';
      if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
      if (!firstName) errors.firstName = 'First Name is required.';
      if (!lastName) errors.lastName = 'Last Name is required.';
      if (!birthDate) errors.birthDate = 'Birth Date is required.';
      const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
      if (age < 18) errors.birthDate = 'You must be at least 18 years old.';
    }
    return errors;
  };

  const handleClosePopup = () => {
    setMessagePopupOpen(false);
  };

  return (
    <Box sx={containerStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>
        {isLogin ? 'Login' : 'Sign Up'}
      </h1>
      <form onSubmit={handleSubmit} style={{ padding: '0 16px' }}>
        <MessagePopup 
          message={successMessage} 
          messageType={popupMessageType} 
          open={messagePopupOpen} 
          onClose={handleClosePopup} 
        />
        {!isLogin && (
          <>
            <StyledTextField
              name="firstName"
              label="First Name"
              variant="outlined"
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <StyledTextField
              name="lastName"
              label="Last Name"
              variant="outlined"
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <StyledTextField
              name="birthDate"
              label="Birth Date"
              type="date" 
              InputLabelProps={{
                shrink: true,
              }}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              error={!!errors.birthDate}
              helperText={errors.birthDate}
            />
          </>
        )}
        <StyledTextField
          name="email"
          label="Email"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email}
        />
        <StyledTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {!isLogin && (
          <StyledTextField
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        )}
        <Button
          type="submit"
          sx={buttonStyle}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : isLogin ? 'Login' : 'Sign Up'}
        </Button>
        <Button
          onClick={handleToggle}
          sx={{ marginTop: '16px', width: '100%' }}
        >
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </Button>
      </form>
    </Box>
  );
};

export default SignUpLogin;
