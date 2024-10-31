import React, { createContext, useContext, useState, useEffect } from 'react';

const HrAuthContext = createContext();

export const useHrAuth = () => {
  return useContext(HrAuthContext);
};

const HrAuthProvider = ({ children }) => {
  const [hrStaff, setHrStaff] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there is a token in local storage
    const token = localStorage.getItem('hrToken');
    if (token) {
      // Optionally, you can parse the token to get HR staff information
      const parsedToken = JSON.parse(atob(token.split('.')[1]));
      setHrStaff(parsedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/api/hr/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    const data = await response.json();
    const token = data.token; // Assuming the token is returned in the response

    // Save token to local storage
    localStorage.setItem('hrToken', token);

    // Parse token for useful information
    const parsedToken = JSON.parse(atob(token.split('.')[1]));
    setHrStaff(parsedToken); // Set HR staff info
    setIsAuthenticated(true); // Set authenticated state

    return parsedToken; // Return parsed info if needed
  };

  const logout = () => {
    localStorage.removeItem('hrToken');
    setHrStaff(null);
    setIsAuthenticated(false); // Reset authenticated state
  };

  const value = {
    hrStaff,
    isAuthenticated, // Expose authentication status
    login,
    logout,
  };

  return <HrAuthContext.Provider value={value}>{children}</HrAuthContext.Provider>;
};

export default HrAuthProvider;
