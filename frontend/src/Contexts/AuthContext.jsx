import React, { createContext, useContext, useState, useEffect } from 'react';
import Axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for the token in localStorage when the component mounts
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, you can verify the token or fetch user info based on it
      // For now, we will assume the token is valid and extract user info if available
      setUser(token); // Assuming token or user info can be set directly, adjust as needed
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await Axios.post('http://localhost:5000/api/applicants/login', { email, password });
      setUser(response.data.applicantId); // Store applicant ID or user info as needed
      localStorage.setItem('token', response.data.token); // Store the token if you need it for further requests
    } catch (error) {
      throw new Error('Login failed: ' + (error.response?.data?.message || 'An error occurred'));
    }
  };

  const signUp = async (firstName, lastName, birthday, email, password) => {
    try {
      const response = await Axios.post('http://localhost:5000/api/applicants', {
        firstName,
        lastName,
        birthday,
        email,
        password,
      });
      setUser(response.data._id); // Assuming applicant ID is returned
    } catch (error) {
      throw new Error('Sign-up failed: ' + (error.response?.data?.message || 'An error occurred'));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Clear the token on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
