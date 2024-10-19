import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Sidebar from './Components/Sidebar';
import JobStatistics from './Pages/JobStatistics';
import Applicants from './Pages/Applicants';
import Leaderboard from './Pages/Leaderboard';
import PostJob from './Pages/PostJob';
import { ThemeContextProvider } from './Contexts/ThemeContext';

const App = () => {
  return (
    <ThemeContextProvider>
      <Router>
        <CssBaseline />
        <Box display="flex">
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
            <Routes>
              <Route path="/" element={<h1>Admin Dashboard</h1>} />
              <Route path="/statistics" element={<JobStatistics />} />
              <Route path="/applicants" element={<Applicants />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/post-job" element={<PostJob />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeContextProvider>
  );
};

export default App;
