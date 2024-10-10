// src/App.jsx
import React from 'react';
import Navbar from './Components/Navbar'; // Import the Navbar component
import Home from './Pages/Home'; // Import the Home component

const App = () => {
  return (
    <div style={{overflow: 'hidden', width: '100%'}}>
      <Navbar />

      <div style={{ width: '100%', height: '85vh',display: 'flex', justifyContent: 'center', marginTop: '80px'}}>
        <Home />
      </div>
    </div>
  );
};

export default App;
