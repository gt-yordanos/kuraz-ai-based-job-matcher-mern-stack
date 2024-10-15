import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Styled TextField to increase border size
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '16px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderWidth: 2, // Increase border size
    },
    '&:hover fieldset, &.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main, // Change border color on hover and focus
    },
  },
}));

const SignUpLogin = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isSmallScreen = useMediaQuery('(max-width:375px)');

  // Container styles with adjusted background color for light mode
  const containerStyle = {
    backgroundColor: isDarkMode ? '#242424' : '#e0e0e0', // Darker light mode background
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

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
    setErrors({});
  };

  const isStrongPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) newErrors.email = 'Email is required';
    else if (!emailPattern.test(email)) newErrors.email = 'Invalid email address';

    if (!password) newErrors.password = 'Password is required';
    else if (!isStrongPassword(password)) {
      newErrors.password = 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.';
    }

    if (!isLogin) {
      if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
      else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', { email, password });
    } else {
      setErrors(validationErrors);
    }
  };

return (
    <Box sx={containerStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>
        {isLogin ? 'Login' : 'Sign Up'}
      </h1>
      <form onSubmit={handleSubmit} style={{ padding: '0 16px' }}> {/* Added horizontal padding */}
        <StyledTextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          InputLabelProps={{ style: { color: isDarkMode ? '#fff' : '#000' } }}
          InputProps={{ style: { color: isDarkMode ? '#fff' : '#000' } }}
        />
        <StyledTextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          InputLabelProps={{ style: { color: isDarkMode ? '#fff' : '#000' } }}
          InputProps={{
            style: { color: isDarkMode ? '#fff' : '#000' },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
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
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputLabelProps={{ style: { color: isDarkMode ? '#fff' : '#000' } }}
            InputProps={{
              style: { color: isDarkMode ? '#fff' : '#000' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        <Button variant="contained" sx={buttonStyle} type="submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
        <Grid container justifyContent="center" sx={{ marginTop: '16px' }}>
          <Button onClick={handleToggle} style={{ textDecoration: 'underline', color: isDarkMode ? '#fff' : '#000' }}>
            {isLogin ? 'Create an account' : 'Already have an account?'}
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default SignUpLogin;