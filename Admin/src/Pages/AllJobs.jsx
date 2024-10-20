import React, { useEffect, useState } from 'react'; 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CodeIcon from '@mui/icons-material/Code';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useThemeContext } from '../Contexts/ThemeContext';

// Styled components for the search bar
const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  marginBottom: 10,
}));

const Search = styled('div')(({ theme, darkMode }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: darkMode ? '#444' : '#f5f5f5', 
  width: '90%',
  boxShadow: theme.shadows[2],
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    height: 40,
  },
}));

const AllJobs = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { darkMode } = useThemeContext(); // Use darkMode from ThemeContext

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/search?title=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);
  
  return (
    <Box sx={{ padding: 2, width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ width: '100%' }}>
        <SearchContainer>
          <Search darkMode={darkMode}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Jobs…"
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </Search>
        </SearchContainer>
      </Toolbar>

      <Box sx={{ marginTop: 10, flexGrow: 1, width: '100%' }}>
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            {[...Array(5)].map((_, index) => (
              <Card key={index} sx={{ 
                width: '100%', 
                marginBottom: 2, 
                bgcolor: darkMode ? '#444' : '#e0e0e0', // Darker card in light mode
                boxShadow: 'none' 
              }}>
                <CardContent>
                  <Skeleton variant="text" width="80%" height={30} sx={{ bgcolor: darkMode ? '#777' : '#bbb' }} /> {/* Decreased darkness of skeleton for light mode */}
                  <Skeleton variant="text" width="60%" animation="wave" height={30} sx={{ bgcolor: darkMode ? '#777' : '#bbb' }} />
                  <Skeleton variant="rectangular" height={60} sx={{ bgcolor: darkMode ? '#777' : '#bbb' }} />
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Box sx={{ overflowY: 'auto' }}>
            {results.length > 0 ? (
              results.map((job) => (
                <Card 
                  key={job._id} 
                  sx={{ 
                    width: '100%', 
                    marginBottom: 2, 
                    bgcolor: darkMode ? '#444' : '#e0e0e0', // Darker card in light mode
                    color: 'text.primary', 
                    boxShadow: 'none', 
                    cursor: 'pointer' 
                  }} 
                >
                  <CardContent>
                    <h2 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{job.title}</h2>
                    <p style={{ fontSize: '0.875rem', margin: '0.25rem 0' }}>{job.description}</p>
                    <p style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', margin: '0.25rem 0' }}>
                      <AccessTimeIcon sx={{ marginRight: 1, fontSize: 'medium' }} />
                      {new Date(job.deadline).toLocaleDateString()}
                    </p>
                    <p style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', margin: '0.25rem 0' }}>
                      <WorkIcon sx={{ marginRight: 1, fontSize: 'medium' }} />
                      {job.employmentType}
                    </p>
                    <p style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', margin: '0.25rem 0' }}>
                      <AttachMoneyIcon sx={{ marginRight: 1, fontSize: 'medium' }} />
                      {job.salaryRange}
                    </p>
                    <p style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', margin: '0.25rem 0' }}>
                      <CodeIcon sx={{ marginRight: 1, fontSize: 'medium' }} />
                      {job.requirements.join(', ')}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No results found for "{query}"</p>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AllJobs;
