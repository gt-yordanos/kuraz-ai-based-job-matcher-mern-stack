import React, { useState, useEffect } from 'react';
import {
  Box, TextField, IconButton, InputAdornment, useTheme, useMediaQuery, CircularProgress, Typography, Link, MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import MessagePopup from '../Components/MessagePopup';

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

const SwitchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#242424' : '#e0e0e0',
  borderRadius: 50,
  padding: 4,
  marginBottom: 1,
  width: 190,
  margin: '0 auto',
}));

const SwitchButton = styled('div')(({ selected, theme }) => ({
  padding: '8px 16px',
  borderRadius: 20,
  cursor: 'pointer',
  margin: '0 2px',
  textAlign: 'center',
  flexGrow: 1,
  backgroundColor: selected ? (theme.palette.mode === 'dark' ? '#fff' : '#000') : 'transparent',
  color: selected ? (theme.palette.mode === 'dark' ? '#000' : '#fff') : 'inherit',
  fontSize: 16,
}));

const SignUpLogin = () => {
  const { login, signUp, user, resetPassword } = useAuth(); // Assuming resetPassword is a method in your AuthContext
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:430px)');
  const { pathname } = useLocation();

  const [isLogin, setIsLogin] = useState(pathname === '/login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [messagePopupOpen, setMessagePopupOpen] = useState(false);
  const [popupMessageType, setPopupMessageType] = useState('success');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  useEffect(() => {
    setIsLogin(pathname === '/login');
  }, [pathname]);

  useEffect(() => {
    if (user) {
      setSuccessMessage('Logged in Successfully!');
      setMessagePopupOpen(true);
      setTimeout(() => navigate('/'), 3000);
    }
  }, [user, navigate]);

  const handleToggle = (type) => {
    setIsLogin(type === 'login');
    navigate(type === 'login' ? '/login' : '/signup');
    setSuccessMessage('');
    setMessagePopupOpen(false);
    setErrors({});
    setShowForgotPassword(false); // Reset forgot password state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrors({});
    
    if (showForgotPassword) {
      try {
        await resetPassword(forgotEmail);
        setSuccessMessage('Password reset email sent!');
        setPopupMessageType('success');
        setMessagePopupOpen(true);
        setForgotEmail('');
      } catch (error) {
        setSuccessMessage(error.message);
        setPopupMessageType('error');
        setMessagePopupOpen(true);
      }
      setLoading(false);
      return;
    }
    
    const { email, password, firstName, lastName, confirmPassword } = Object.fromEntries(new FormData(e.currentTarget));
    const validationErrors = validateForm(email, password, confirmPassword, firstName, lastName, birthDate, gender);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setSuccessMessage('Please fix the errors below.');
      setPopupMessageType('error');
      setMessagePopupOpen(true);
    } else {
      try {
        const action = isLogin ? login(email, password) : signUp(firstName, lastName, birthDate, gender, email, password);
        await action;
        setSuccessMessage(isLogin ? 'Logged in successfully!' : 'Sign-up successful! You can now log in.');
        setPopupMessageType('success');
        if (!isLogin) setIsLogin(true);
        setMessagePopupOpen(true);
      } catch ({ message }) {
        setSuccessMessage(message.includes('E11000') ? 'This email is already registered.' : message);
        setPopupMessageType('error');
        setMessagePopupOpen(true);
      }
    }
    setLoading(false);
  };

  const validateForm = (email, password, confirmPassword, firstName, lastName, birthDate, gender) => {
    const errors = {};
    if (!email) errors.email = 'Email is required.';
    if (!password) errors.password = 'Password is required.';
    if (!isLogin) {
      if (password.length < 8) errors.password = 'Password must be at least 8 characters.';
      if (!/[A-Z]/.test(password)) errors.password = 'Password must contain at least one uppercase letter.';
      if (!/[0-9]/.test(password)) errors.password = 'Password must contain at least one number.';
      if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
      if (!firstName) errors.firstName = 'First Name is required.';
      if (!lastName) errors.lastName = 'Last Name is required.';
      if (!birthDate) errors.birthDate = 'Birth Date is required.';
      if (!gender) errors.gender = 'Gender is required.';
      if (new Date().getFullYear() - new Date(birthDate).getFullYear() < 18) errors.birthDate = 'Must be at least 18.';
    }
    return errors;
  };

  return (
    <>
      <SwitchContainer>
        <SwitchButton selected={isLogin} onClick={() => handleToggle('login')}>Login</SwitchButton>
        <SwitchButton selected={!isLogin} onClick={() => handleToggle('signup')}>Sign Up</SwitchButton>
      </SwitchContainer>
      <Box 
        sx={{ 
          borderRadius: 4, 
          border: `1px solid ${theme.palette.mode === 'dark' ? '#fff' : '#000'}`, 
          maxWidth: 400, 
          margin: '30px auto', 
          fontFamily: 'Poppins, sans-serif', 
          boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 0 10px rgba(0,0,0,0.1)', 
          width: isSmallScreen ? '97%' : 'auto', 
          padding: 5 
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: 24 }}>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit}>
          <MessagePopup message={successMessage} messageType={popupMessageType} open={messagePopupOpen} onClose={() => setMessagePopupOpen(false)} />
          {showForgotPassword ? (
            <>
              <StyledTextField 
                name="forgotEmail" 
                label="Enter your email" 
                variant="outlined" 
                type="email" 
                value={forgotEmail} 
                onChange={(e) => setForgotEmail(e.target.value)} 
              />
              <button type="submit" style={{ width: '100%', border: 'none', padding: 12, borderRadius: 8, backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000', color: theme.palette.mode === 'dark' ? '#000' : '#fff', cursor: 'pointer', marginTop: 16, height: 48, fontSize: 16 }} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
              </button>
              <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
                <Link href="#" onClick={() => setShowForgotPassword(false)}>Back to Login</Link>
              </Typography>
            </>
          ) : (
            <>
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
                    variant="outlined" 
                    type="date" 
                    error={!!errors.birthDate} 
                    helperText={errors.birthDate} 
                    InputLabelProps={{ shrink: true }} 
                    onChange={(e) => setBirthDate(e.target.value)} 
                  />
                  <StyledTextField
                    select
                    name="gender"
                    label="Gender"
                    variant="outlined"
                    error={!!errors.gender}
                    helperText={errors.gender}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </StyledTextField>
                </>
              )}
              {['email', 'password'].map((field) => (
                <StyledTextField 
                  key={field} 
                  name={field} 
                  label={field.replace(/^\w/, (c) => c.toUpperCase())} 
                  variant="outlined" 
                  type={field === 'password' && !showPassword ? 'password' : 'text'} 
                  error={!!errors[field]} 
                  helperText={errors[field]} 
                  InputProps={field === 'password' ? { endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> } : null} 
                />
              ))}
              {!isLogin && <StyledTextField name="confirmPassword" label="Confirm Password" variant="outlined" type={showPassword ? 'text' : 'password'} error={!!errors.confirmPassword} helperText={errors.confirmPassword} />}
              <button type="submit" style={{ width: '100%', border: 'none', padding: 12, borderRadius: 8, backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000', color: theme.palette.mode === 'dark' ? '#000' : '#fff', cursor: 'pointer', marginTop: 16, height: 48, fontSize: 16 }} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : isLogin ? 'Login' : 'Sign Up'}
              </button>
              {isLogin && (
                <Typography variant="body2" align="center" sx={{ marginTop: 2, color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}>
                  <Link href="#" onClick={() => setShowForgotPassword(true)}>Forgot Password?</Link>
                </Typography>
              )}
            </>
          )}
        </form>
      </Box>
    </>
  );
};

export default SignUpLogin;
