import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
  // const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  return children
}

export default PrivateRoute
