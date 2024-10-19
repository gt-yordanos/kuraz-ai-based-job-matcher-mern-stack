import React, { useEffect, useState } from 'react'; 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import { useThemeContext } from '../Contexts/ThemeContext';
import { useSearch } from '../Contexts/SearchContext'; // Adjust the path
import axios from 'axios';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Import icons
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CodeIcon from '@mui/icons-material/Code'; // Import code icon

const Search = () => {
  const { darkMode } = useThemeContext();
  const { query } = useSearch(); // Use query from context
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return; // Skip if no query

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
  }, [query]); // Depend on query to refetch when it changes

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        {[...Array(5)].map((_, index) => (
          <Card key={index} sx={{ width: '90%', marginBottom: 2, bgcolor: darkMode ? '#333' : '#e0e0e0', boxShadow: 'none' }}>
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
        results.map((job) => (
          <Card key={job._id} sx={{ width: '90%', marginBottom: 2, bgcolor: darkMode ? '#333' : '#e0e0e0', boxShadow: 'none' }}>
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
  );
};

export default Search;
