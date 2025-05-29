import { useAuth } from "@/contexts/AuthContext";
import React from 'react';
import { Navigate } from "react-router-dom";

const Protected = ({ children, role }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default Protected;
