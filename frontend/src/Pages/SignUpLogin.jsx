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
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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
  const navigate = useNavigate(); // Initialize navigate

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

  const { login, signUp, currentUser } = useAuth(); // Destructure currentUser from useAuth

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

  useEffect(() => {
    // Redirect to home if user is logged in
    if (currentUser) {
      navigate('/'); // Redirect to home
    }
  }, [currentUser, navigate]); // Add currentUser as a dependency

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
    setErrors({});
    setSuccessMessage('');
  };

  const isStrongPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) newErrors.email = 'Email is required';
    else if (!emailPattern.test(email)) newErrors.email = 'Invalid email address';

    if (!isLogin) {
      if (!firstName) newErrors.firstName = 'First name is required';
      if (!lastName) newErrors.lastName = 'Last name is required';
      if (!birthDate) newErrors.birthDate = 'Birth date is required';
      if (!password) newErrors.password = 'Password is required';
      else if (!isStrongPassword(password)) {
        newErrors.password = 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.';
      }
      if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
      else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
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
          navigate('/'); // Redirect to home after successful login
        } else {
          await signUp(firstName, lastName, birthDate, email, password);
          setSuccessMessage('Sign-up successful! You can now log in.');
          setIsLogin(true);
        }
      } catch (error) {
        if (error.message.includes('E11000 duplicate key error')) {
          setErrors((prev) => ({ ...prev, email: 'Email is already registered.' })); // Update email error
        } else {
          setErrors({ form: error.message });
        }
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
  
    // Validate the specific field to update errors for only that field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: validateForm()[field] || null, // Set to null if no error
    }));
  };

  return (
    <Box sx={containerStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>
        {isLogin ? 'Login' : 'Sign Up'}
      </h1>
      <form onSubmit={handleSubmit} style={{ padding: '0 16px' }}>
        {errors.form && <div style={{ color: 'red', marginBottom: '16px' }}>{errors.form}</div>}
        {successMessage && <div style={{ color: 'green', marginBottom: '16px' }}>{successMessage}</div>}
        {!isLogin && (
          <>
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
              type="date"
              variant="outlined"
              fullWidth
              value={birthDate}
              onChange={(e) => handleInputChange(e, 'birthDate')}
              error={!!errors.birthDate}
              helperText={errors.birthDate}
              InputLabelProps={{ shrink: true }}
              InputProps={{

        
              }}
            />
          </>
        )}
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
                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {!isLogin && (
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
        )}
        <Button
          type="submit"
          variant="contained"
          sx={buttonStyle}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </form>
      <Grid container justifyContent="center" sx={{ marginTop: '16px' }}>
        <Grid item>
          <Button onClick={handleToggle}>
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpLogin;
