import React, { useEffect, useState } from 'react'; 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import StorageIcon from '@mui/icons-material/Storage';
import { useThemeContext } from '../Contexts/ThemeContext';
import { useSearch } from '../Contexts/SearchContext'; 
import { useAuth } from '../Contexts/AuthContext'; 
import axios from 'axios';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CodeIcon from '@mui/icons-material/Code';
import { useNavigate } from 'react-router-dom'; 
import MessagePopup from '../Components/MessagePopup'; 

const Search = () => {
  const { darkMode } = useThemeContext();
  const { query } = useSearch(); 
  const { user } = useAuth(); 
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true); 
      
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/search?title=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setMessage('Error fetching results.');
        setShowMessage(true);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleCardClick = (jobId) => {
    if (user) {
      navigate(`/apply/${jobId}`);
    } else {
      setMessage('Please log in to apply for this job.');
      setShowMessage(true);
    }
  };

  // Show skeleton if loading or if query is empty
  if (loading || query === '') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh', marginTop: '10px' }}>
        {[...Array(5)].map((_, index) => (
          <Card key={index} sx={{ width: '90%', marginBottom: 2, bgcolor: darkMode ? '#333' : '#e0e0e0', boxShadow: 'none' }}>
            <CardContent>
              <Skeleton variant="text" width="80%" height={30} sx={{ bgcolor: darkMode ? '#888' : '#555' }} />
              <Skeleton variant="text" width="60%" animation="wave" height={30} sx={{ bgcolor: darkMode ? '#888' : '#555' }} />
              <Skeleton variant="rectangular" height={60} sx={{ bgcolor: darkMode ? '#888' : '#555' }}/>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  // Show no results found if results are empty and query is not empty
  if (results.length === 0 && query) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
        <StorageIcon sx={{ fontSize: 100, color: 'text.secondary' }} />
        <p style={{ fontWeight: 'bold', fontSize: '2rem', color: 'text.secondary' }}>
          No results found for "{query}"
        </p>
      </Box>
    );
  }

  // Render the results
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', marginTop: '10px' }}>
      {results.map((job) => (
        <Card 
          key={job._id} 
          sx={{ width: '90%', marginBottom: 2, bgcolor: darkMode ? '#333' : '#e0e0e0', boxShadow: 'none', cursor: 'pointer' }} 
          onClick={() => handleCardClick(job._id)} 
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
              {job.skillsRequired.hardSkills.join(', ')}
            </p>
          </CardContent>
        </Card>
      ))}
      <MessagePopup 
        message={message} 
        messageType="error" 
        open={showMessage} 
        onClose={() => setShowMessage(false)} 
      />
    </Box>
  );
};

export default Search;
