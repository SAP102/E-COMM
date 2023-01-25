import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
  const { isAuthenticated } = useSelector((state) => state.user)
  console.log("🚀 ~ file: Protectedroute.js:7 ~ ProtectedRoute ~ isAuthenticated", !isAuthenticated ? "tyty" : "ooooo")

    let location = useLocation();

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
      return children
    

};

export default ProtectedRoute;