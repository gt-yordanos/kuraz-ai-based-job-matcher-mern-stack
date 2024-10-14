// src/App.jsx
import React from 'react';
import Navbar from './Components/Navbar'; // Import the Navbar component
import Home from './Pages/Home'; // Import the Home component
import NewJobs from './Pages/NewJobs';
import CareerBenefits from './Pages/CareerBenefits';
import AboutUs from './Pages/AboutUs';

const App = () => {
  return (
    <div style={{overflow: 'hidden', width: '100%'}}>
      <div style={{position: 'fixed', top: '0', width: '100%', zIndex: 50}}>
        <Navbar />
      </div>

      <div style={{ width: '100%', minHeight: '85vh',display: 'flex', justifyContent: 'center', marginTop: '60px', padding: 0}}>
        <Home />
      </div>

      <div id="newjobs">
      <NewJobs/>
      </div>

      <div id="careerbenefits">
        <CareerBenefits/>
      </div>

      <div>
        <AboutUs/>
      </div>
      
    </div>
  );
};

export default App;
