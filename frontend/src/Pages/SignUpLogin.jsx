import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CalendarToday from '@mui/icons-material/CalendarToday';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import MessagePopup from '../Components/MessagePopup'; // Import the MessagePopup component

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '16px',
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
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  },
}));

const SignUpLogin = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isSmallScreen = useMediaQuery('(max-width:375px)');
  const navigate = useNavigate(); 

  const containerStyle = {
    backgroundColor: isDarkMode ? '#242424' : '#e0e0e0',
    color: isDarkMode ? '#fff' : '#000',
    padding: isSmallScreen ? '10px' : '20px',
    borderRadius: '12px',
    maxWidth: '400px',
    margin: '50px auto',
    fontFamily: 'Poppins, sans-serif',
    boxShadow: isDarkMode ? 'none' : '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    backgroundColor: isDarkMode ? '#fff' : '#000',
    color: isDarkMode ? '#000' : '#fff',
    width: '100%',
    marginTop: '16px',
  };

  const { login, signUp, user } = useAuth(); 

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [messagePopupOpen, setMessagePopupOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setSuccessMessage('You are already logged in.');
      setMessagePopupOpen(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
    setErrors({});
    setSuccessMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (isLogin) {
          await login(email, password);
          setSuccessMessage('Login successful!');
          navigate('/'); 
        } else {
          await signUp(firstName, lastName, birthDate, email, password);
          setSuccessMessage('Sign-up successful! You can now log in.');
          setIsLogin(true);
        }
      } catch (error) {
        setErrors({ form: error.message });
      }
    } else {
      setErrors(validationErrors);
    }
    setLoading(false);
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    switch (field) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'birthDate':
        setBirthDate(value);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: validateForm()[field] || null,
    }));
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
        {errors.form && <div style={{ color: 'red', marginBottom: '16px' }}>{errors.form}</div>}
        <MessagePopup 
          message={successMessage} 
          messageType="success" 
          open={messagePopupOpen} 
          onClose={handleClosePopup} 
        />
        <StyledTextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => handleInputChange(e, 'email')}
          error={!!errors.email}
          helperText={errors.email}
        />
        <StyledTextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => handleInputChange(e, 'password')}
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
          <>
            <StyledTextField
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => handleInputChange(e, 'confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <StyledTextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => handleInputChange(e, 'firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <StyledTextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => handleInputChange(e, 'lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
            <StyledTextField
              label="Birth Date"
              variant="outlined"
              fullWidth
              type="date"
              value={birthDate}
              onChange={(e) => handleInputChange(e, 'birthDate')}
              error={!!errors.birthDate}
              helperText={errors.birthDate}
              InputLabelProps={{ shrink: true }}
            />
          </>
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
