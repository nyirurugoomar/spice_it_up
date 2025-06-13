import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Example: check for token or user in localStorage
  const authData = localStorage.getItem("auth");
  const isAuthenticated = !!authData;

  if (!isAuthenticated) {
    
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the protected page
  return children;
};

export default ProtectedRoute;