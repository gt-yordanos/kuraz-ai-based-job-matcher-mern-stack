import React, { createContext, useContext, useState } from 'react';
import Axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await Axios.post('http://localhost:5000/api/applicants/login', { email, password });
      setUser(response.data.applicantId); // Store applicant ID or user info as needed
      localStorage.setItem('token', response.data.token); // Store the token if you need it for further requests
    } catch (error) {
      throw new Error('Login failed: ' + (error.response?.data?.message || 'An error occurred'));
    }
  };

  const signUp = async (firstName, lastName, birthday, email, password) => { // Adjusted to destructure parameters
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

  return (
    <AuthContext.Provider value={{ user, login, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
