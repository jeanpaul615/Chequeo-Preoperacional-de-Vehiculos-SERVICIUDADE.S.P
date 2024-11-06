import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('access_token'); // Suponiendo que almacenas el token en localStorage

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/dashboard" />;
};

export default ProtectedRoute;