import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginForm from './pages/auth/Login';
import RegisterForm from './pages/Register';
import ForgotPasswordForm from './pages/auth/ForgotPassword';
import ResetPasswordForm from './pages/auth/ResetPassword';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import CustomerList from './pages/CustomerList';
import CustomerAdd from './pages/CustomerAdd';
import CustomerEdit from './pages/CustomerEdit';
import CustomerView from './pages/CustomerView';

interface AppRoutesProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ darkMode, setDarkMode }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      <Route path="/login" element={!isAuthenticated ? <LoginForm darkMode={darkMode} setDarkMode={setDarkMode} /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/dashboard" />} />
      <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPasswordForm darkMode={darkMode} setDarkMode={setDarkMode} /> : <Navigate to="/dashboard" />} />
      <Route path="/reset-password/:token" element={<ResetPasswordForm darkMode={darkMode} setDarkMode={setDarkMode} />} />
      
      {/* Protected routes */}
      {isAuthenticated && (
        <>
          <Route path="/dashboard" element={
            <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/customers" element={
            <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
              <CustomerList />
            </DashboardLayout>
          } />
          <Route path="/customers/add" element={
            <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
              <CustomerAdd />
            </DashboardLayout>
          } />
          <Route path="/customers/edit/:id" element={
            <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
              <CustomerEdit />
            </DashboardLayout>
          } />
          <Route path="/customers/view/:id" element={
            <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
              <CustomerView />
            </DashboardLayout>
          } />
        </>
      )}
      
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default AppRoutes;