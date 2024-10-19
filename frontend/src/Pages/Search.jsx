import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import { useThemeContext } from '../Contexts/ThemeContext'; // Adjust the import path as needed
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
  const { darkMode } = useThemeContext(); // Access darkMode from the ThemeContext
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search).get('query');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/search?title=${query}`);
        setResults(response.data); // Assume response.data contains the job listings
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        {[...Array(5)].map((_, index) => (
          <Card key={index} sx={{ width: '90%', marginBottom: 2, bgcolor: darkMode ? '#333' : '#fff' }}>
            <CardContent>
              <Skeleton variant="text" width="80%" height={30} />
              <Skeleton variant="text" width="60%" animation="wave" height={30} />
              <Skeleton variant="rectangular" height={60} />
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
      {results.length > 0 ? (
        results.map((result, index) => (
          <Card key={index} sx={{ width: '90%', marginBottom: 2, bgcolor: darkMode ? '#333' : '#fff' }}>
            <CardContent>
              <h3>{result.title}</h3>
              <p>{result.description}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No results found for "{query}"</p>
      )}
    </Box>
  );
};

export default Search;
