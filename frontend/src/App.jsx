import React from 'react';
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

const App = () => {
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
       <div style={{ position: 'fixed', top: '0', width: '100%', zIndex: 50}}>
        <Navbar />
      </div>
      <div style={{marginTop: '80px'}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newjobs" element={<NewJobs />} />
        <Route path="/careerbenefits" element={<CareerBenefits />} />
        <Route path="/careerresources" element={<CareerResources />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<SignUpLogin />} />
        <Route path="/login" element={<SignUpLogin />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      </div>
      
      <Footer />
    </div>
  );
};

export default App;
