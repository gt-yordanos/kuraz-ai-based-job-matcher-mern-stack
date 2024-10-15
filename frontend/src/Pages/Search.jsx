import React, { useState } from 'react';
import { Box, TextField, Typography, Button, CircularProgress, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);

    try {
      // Fetch results from an API or perform a search based on the query
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Something went wrong');
      
      setResults(data.results); // Adjust according to your API response
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100vh',
        padding: 2,
        backgroundColor: '#000',
        color: '#FFF',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Search for Jobs
      </Typography>
      <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '600px', marginBottom: '2rem' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your search query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            marginBottom: 2,
            input: {
              color: '#FFF',
            },
            fieldset: {
              borderColor: '#FFF',
            },
          }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Search
        </Button>
      </form>
      
      {/* Results Section */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: '#222',
          padding: 2,
          borderRadius: 1,
          boxShadow: 1,
          color: '#FFF',
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Search Results
        </Typography>
        
        {loading && <CircularProgress />}
        
        {error && <Typography color="error">{error}</Typography>}
        
        {!loading && results.length === 0 && <Typography>No results found.</Typography>}
        
        {results.map(result => (
          <Card key={result.id} sx={{ marginBottom: 1, backgroundColor: '#333', color: '#FFF' }}>
            <CardContent>
              <Typography variant="body1">{result.title}</Typography>
              <Typography variant="body2">{result.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Search;
