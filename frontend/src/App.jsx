import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter and Router import
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import NewJobs from './Pages/NewJobs';
import CareerBenefits from './Pages/CareerBenefits';
import AboutUs from './Pages/AboutUs';
import CareerResources from './Pages/CareerResources';
import Footer from './Components/Footer';
import SignUpLogin from './Pages/signUpLogin';
import Search from './Pages/Search';

const App = () => {
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div style={{ position: 'fixed', top: '0', width: '100%', zIndex: 50 }}>
        <Navbar />
      </div>

      <div id="home" style={{ width: '100%', minHeight: '85vh', display: 'flex', justifyContent: 'center', marginTop: '60px', padding: 0 }}>
        <Home />
      </div>

      <div id="newjobs">
        <NewJobs />
      </div>

      <div id="careerbenefits">
        <CareerBenefits />
      </div>

      <div id="careerresources">
        <CareerResources />
      </div>

      <div id="about">
        <AboutUs />
      </div>

      {/* Set up routes for SignUp and Search */}
      <Routes>
        <Route path="/signup" element={<SignUpLogin />} />
        <Route path="/login" element={<SignUpLogin />} />
        <Route path="/search" element={<Search />} />
      </Routes>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
