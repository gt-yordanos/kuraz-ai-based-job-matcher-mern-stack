import React, { createContext, useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken); // Store decoded token information
      } catch (error) {
        console.error('Token decoding failed:', error);
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await Axios.post('http://localhost:5000/api/applicants/login', { email, password });
      setUser(jwtDecode(response.data.token)); // Decode token and store user information
      localStorage.setItem('token', response.data.token); 
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
      setUser(response.data); // Store the returned user info
    } catch (error) {
      throw new Error('Sign-up failed: ' + (error.response?.data?.message || 'An error occurred'));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
