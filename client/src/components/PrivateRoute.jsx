
import React from 'react';
import { Navigate } from 'react-router-dom';
import { checkIsAuthenticated } from '../session';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = checkIsAuthenticated()
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
