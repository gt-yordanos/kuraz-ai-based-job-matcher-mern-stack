import React, { useState } from 'react'; 
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import NewJobs from './Pages/NewJobs';
import CareerBenefits from './Pages/CareerBenefits';
import AboutUs from './Pages/AboutUs';
import CareerResources from './Pages/CareerResources';
import Footer from './Components/Footer';
import SignUpLogin from './Pages/SignUpLogin';
import Search from './Pages/Search';
import Apply from './Pages/Apply';
import KurazAIApp from './Components/KurazAIApp';
import { Fab, Tooltip } from '@mui/material'; 
import AssistantIcon from '@mui/icons-material/Assistant'; 

const App = () => {
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden', width: '100%', position: 'relative' }}>
      <div style={{ position: 'fixed', top: '0', width: '100%', zIndex: 50 }}>
        <Navbar />
      </div>
      <div style={{ marginTop: '80px', flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newjobs" element={<NewJobs />} />
          <Route path="/careerbenefits" element={<CareerBenefits />} />
          <Route path="/careerresources" element={<CareerResources />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signup" element={<SignUpLogin />} />
          <Route path="/login" element={<SignUpLogin />} />
          <Route path="/search" element={<Search />} />
          <Route path="/apply/:id" element={<Apply />} />
        </Routes>
      </div>
      <div style={{ width: '100%' }}>
        <Footer />
      </div>

      {/* Floating Chat Button with Assistant Icon */}
      <Tooltip title="Connect with Kuraz AI Assistant" arrow>
        <Fab
          color="primary"
          aria-label="chat"
          sx={{ position: 'fixed', bottom: 20, right: 20, width: '56px', height: '56px', zIndex: 100 }} // Set zIndex for button
          onClick={() => setShowAssistant(true)}
        >
          <AssistantIcon />
        </Fab>
      </Tooltip>

      {/* Kuraz AI App */}
      {showAssistant && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          zIndex: 200, // Higher zIndex to cover the button
          width: '300px',
          height: '400px',
          transition: 'transform 0.3s ease',
          transform: 'translateY(0)',
        }}>
          <KurazAIApp onClose={() => setShowAssistant(false)} />
        </div>
      )}
    </div>
  );
};

export default App;
