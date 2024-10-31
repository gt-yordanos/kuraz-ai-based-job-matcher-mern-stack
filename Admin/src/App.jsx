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
import HrAuthProvider, { useHrAuth } from './Contexts/HrAuthContext'; // Import useHrAuth
import ProtectedRoute from './Components/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
  return (
    <ThemeContextProvider>
      <HrAuthProvider>
        <Router>
          <CssBaseline />
          <MainContent />
        </Router>
      </HrAuthProvider>
    </ThemeContextProvider>
  );
};

// Create a separate component to handle sidebar visibility
const MainContent = () => {
  const { isAuthenticated } = useHrAuth(); // Access authentication status

  return (
    <Box 
      display="flex" 
      sx={{ height: '100vh', width: '100vw' }}
    >
      {isAuthenticated && <Sidebar />} {/* Conditionally render Sidebar */}
      <Box 
        component="main" 
        sx={{ flexGrow: 1, padding: 3, overflowY: 'auto' }}
      >
        <Routes>
          <Route path="/login" element={<HrLogin />} /> {/* Login Route */}
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
