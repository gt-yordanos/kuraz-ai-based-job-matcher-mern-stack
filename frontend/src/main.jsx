// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContextProvider } from './Contexts/ThemeContext';
import { AuthProvider } from './Contexts/AuthContext'; // Import AuthProvider
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ThemeContextProvider>
);
