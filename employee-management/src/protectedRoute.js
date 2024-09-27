import React from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH } from './routes/routes'; // Import the login route

const ProtectedRoute = ({ element: Element }) => {
  const token = localStorage.getItem('token'); // Check if token exists (you can also use Redux state here)

  if (!token) {
    // If no token, redirect to login
    return <Navigate to={AUTH.LOGIN} />;
  }

  // If token exists, render the requested component
  return <Element />;
};

export default ProtectedRoute;
