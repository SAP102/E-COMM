import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom';

function Protectedroute({isAuthenticated, children}) {
    if(isAuthenticated === false){
        return <Navigate to="/login" replace />
    }
  return children;
}

export default Protectedroute
