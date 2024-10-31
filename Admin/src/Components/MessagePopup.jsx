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
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Centered at the top
      >
        <Alert
          onClose={onClose}
          severity={messageType}
          sx={{
            backgroundColor: messageType === 'error' ? '#f44336' : '#4caf50',
            color: 'white',
            width: '400px', // Set a fixed width
            maxWidth: '90%', // Allow it to be responsive
            textAlign: 'center', // Center the text
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default MessagePopup;
