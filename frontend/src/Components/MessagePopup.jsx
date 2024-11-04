import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';

// Custom Alert component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MessagePopup({ message, messageType, open, onClose }) {
  return (
    <Box 
      sx={{
        position: 'fixed',
        top: '45px', // Adjust this value for spacing from the top
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1300, // Ensures the snackbar is above other elements
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={5000} // Keep this to close after 5 seconds
        onClose={onClose} // Triggered when clicking 'X' or after duration
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Centered at the top
      >
        <Alert
          onClose={onClose}
          severity={messageType}
          sx={{
            backgroundColor: messageType === 'error' ? '#f44336' : '#4caf50',
            color: 'white',
            width: '500px',
            maxWidth: '90%', // Allow it to be responsive
            textAlign: 'center',
            padding: '8px 22px', // Decrease padding
            fontSize: {
              xs: '0.75rem', // Smaller font size for mobile
              sm: '0.875rem', // Slightly larger for small screens
            },
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default MessagePopup;
