import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import { useThemeContext } from '../Contexts/ThemeContext'; // Adjust the import path as needed

const Search = () => {
  const { darkMode } = useThemeContext(); // Access darkMode from the ThemeContext

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: darkMode ? '#242424' : '#e0e0e0', // Use the context value for background color
        padding: 2,
        width: '97%',
        margin: '0 auto',
      }}
    >
      {[...Array(5)].map((_, index) => (
        <Card
          key={index}
          sx={{
            width: '90%',
            marginBottom: 2,
            bgcolor: darkMode ? '#333' : '#fff', // Use the context value for card background
            boxShadow: 'none', // Remove shadow
          }}
        >
          <CardContent>
            <Skeleton variant="text" width="80%" height={30} />
            <Skeleton variant="text" width="60%" animation="wave" height={30} />
            <Skeleton variant="rectangular" height={60} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Search;
