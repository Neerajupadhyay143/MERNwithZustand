import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../GlobalAuthcontext/AuthContext';


function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();
    return currentUser ? children : < Navigate to="/" replace />;
    return children;
}

export default ProtectedRoute;
