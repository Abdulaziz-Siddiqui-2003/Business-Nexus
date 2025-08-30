import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import InvestorDashboard from './pages/InvestorDashboard';
import EntrepreneurDashboard from './pages/EntrepreneurDashboard';
import Profile from './pages/Profile';
import Chat from './pages/Chat';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return children;
};

// Dashboard Route Component
const DashboardRoute = ({ role }) => {
  const { user } = useAuth();
  
  if (user?.role !== role) {
    return <Navigate to={`/dashboard/${user?.role}`} replace />;
  }

  return role === 'investor' ? <InvestorDashboard /> : <EntrepreneurDashboard />;
};

// Main App Component
const AppContent = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard/investor" element={
          <ProtectedRoute allowedRoles={['investor']}>
            <DashboardLayout>
              <DashboardRoute role="investor" />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/entrepreneur" element={
          <ProtectedRoute allowedRoles={['entrepreneur']}>
            <DashboardLayout>
              <DashboardRoute role="entrepreneur" />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/profile/:role/:id" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/chat" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Chat />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/chat/:userId" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Chat />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

// App Component with Auth Provider
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App; 