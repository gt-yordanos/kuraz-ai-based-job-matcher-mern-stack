import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Sidebar from './Components/Sidebar';
import JobStatistics from './Pages/JobStatistics';
import Applicants from './Pages/Applicants';
import Leaderboard from './Pages/Leaderboard';
import PostJob from './Pages/PostJob';
import AllJobs from './Pages/AllJobs';
import Dashboard from './Pages/Dashboard';
import HrLogin from './Pages/HrLogin'; // Import HrLogin
import { ThemeContextProvider } from './Contexts/ThemeContext';
import HrAuthProvider from './Contexts/HrAuthContext';

const App = () => {
  return (
    <ThemeContextProvider>
      <HrAuthProvider>
        <Router>
          <CssBaseline />
          <Box 
            display="flex" 
            sx={{ height: '100vh', width: '100vw' }}
          >
            <Sidebar />
            <Box 
              component="main" 
              sx={{ flexGrow: 1, padding: 3, overflowY: 'auto' }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} /> 
                <Route path="/login" element={<HrLogin />} /> {/* Login Route */}
                <Route path="/statistics" element={<JobStatistics />} />
                <Route path="/applicants" element={<Applicants />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/post-job" element={<PostJob />} />
                <Route path="/jobs" element={<AllJobs />} />
                <Route path="*" element={<h2>Page Not Found</h2>} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </HrAuthProvider>
    </ThemeContextProvider>
  );
};

export default App;
