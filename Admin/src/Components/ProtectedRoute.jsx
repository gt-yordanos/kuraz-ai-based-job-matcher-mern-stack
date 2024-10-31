import React from 'react';
import { Navigate } from 'react-router-dom';
import { useHrAuth } from '../Contexts/HrAuthContext';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useHrAuth(); // Get authentication status

  // If not authenticated, redirect to login
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
