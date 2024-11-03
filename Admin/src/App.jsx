import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Box, CircularProgress } from '@mui/material';
import Sidebar from './Components/Sidebar';
import JobStatistics from './Pages/JobStatistics';
import Applicants from './Pages/Applicants';
import Leaderboard from './Pages/Leaderboard';
import PostJob from './Pages/PostJob';
import AllJobs from './Pages/AllJobs';
import Dashboard from './Pages/Dashboard';
import HrLogin from './Pages/HrLogin'; 
import { ThemeContextProvider } from './Contexts/ThemeContext';
import HrAuthProvider, { useHrAuth } from './Contexts/HrAuthContext'; 
import ProtectedRoute from './Components/ProtectedRoute'; 
import { SkillsAndMajorsProvider } from './Contexts/SkillsAndMajorsContext';

const App = () => {
  return (
    <SkillsAndMajorsProvider>
       <ThemeContextProvider>
      <HrAuthProvider>
        <Router>
          <CssBaseline />
          <MainContent />
        </Router>
      </HrAuthProvider>
    </ThemeContextProvider>
    </SkillsAndMajorsProvider>
  );
};

const MainContent = () => {
  const { isAuthenticated } = useHrAuth(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      // Simulate a delay (fetching resources from local storage or API)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchResources();
  }, []);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        sx={{ height: '100vh', width: '100vw', backgroundColor: 'background.default' }}
      >
        <CircularProgress 
          color="inherit" 
          sx={{ 
            color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black') 
          }} 
        />
      </Box>
    );
  }

  return (
    <Box display="flex" sx={{ height: '100vh', width: '100vw' }}>
      {isAuthenticated && <Sidebar />}
      <Box 
        component="main" 
        sx={{ flexGrow: 1, padding: 3, overflowY: 'auto' }}
      >
        <Routes>
          <Route path="/login" element={<HrLogin />} />
          <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} /> 
          <Route path="/statistics" element={<ProtectedRoute element={<JobStatistics />} />} />
          <Route path="/applicants" element={<ProtectedRoute element={<Applicants />} />} />
          <Route path="/leaderboard" element={<ProtectedRoute element={<Leaderboard />} />} />
          <Route path="/post-job" element={<ProtectedRoute element={<PostJob />} />} />
          <Route path="/jobs" element={<ProtectedRoute element={<AllJobs />} />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
