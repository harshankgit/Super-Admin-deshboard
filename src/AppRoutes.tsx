import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Roles } from "./services/apiService";
import LoginForm from "./pages/auth/Login";
import RegisterForm from "./pages/Register";
import ForgotPasswordForm from "./pages/auth/ForgotPassword";
import ResetPasswordForm from "./pages/auth/ResetPassword";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import CustomerList from "./pages/CustomerList";
import CustomerAdd from "./pages/CustomerAdd";
import CustomerEdit from "./pages/CustomerEdit";
import CustomerView from "./pages/CustomerView";
// New admin panel modules
import TradersList from "./pages/traders/TradersList";
import TraderDetail from "./pages/traders/TraderDetail";
import TraderEdit from "./pages/traders/TraderEdit";
import TraderCreate from "./pages/traders/TraderCreate";
import FilesManagement from "./pages/files/FilesManagement";
import FileDetail from "./pages/files/FileDetail";
import FileEdit from "./pages/files/FileEdit";
import FileUpload from "./pages/files/FileUpload";
import ProductsManagement from "./pages/products/ProductsManagement";
import ProductDetail from "./pages/products/ProductDetail";
import ProductEdit from "./pages/products/ProductEdit";
import ProductCreate from "./pages/products/ProductCreate";

interface AppRoutesProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

// Protected route component for role-based access
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requiredRole?: number;
}> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ darkMode, setDarkMode }) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <LoginForm darkMode={darkMode} setDarkMode={setDarkMode} />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/register"
        element={
          !isAuthenticated ? <RegisterForm /> : <Navigate to="/dashboard" />
        }
      />
      <Route
        path="/forgot-password"
        element={
          !isAuthenticated ? (
            <ForgotPasswordForm darkMode={darkMode} setDarkMode={setDarkMode} />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <ResetPasswordForm darkMode={darkMode} setDarkMode={setDarkMode} />
        }
      />

      {/* Protected routes */}
      {isAuthenticated && (
        <>
          <Route
            path="/dashboard"
            element={
              <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/customers"
            element={
              <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <CustomerList />
              </DashboardLayout>
            }
          />
          <Route
            path="/customers/add"
            element={
              <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <CustomerAdd />
              </DashboardLayout>
            }
          />
          <Route
            path="/customers/edit/:id"
            element={
              <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <CustomerEdit />
              </DashboardLayout>
            }
          />
          <Route
            path="/customers/view/:id"
            element={
              <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <CustomerView />
              </DashboardLayout>
            }
          />
          {/* Traders Management Routes - Super Admin only */}
          <Route
            path="/traders"
            element={
              // <ProtectedRoute requiredRole={Roles.SUPER_ADMIN}>
                <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <TradersList />
                </DashboardLayout>
              // </ProtectedRoute>
            }
          />
          {/* More specific trader routes should come before the general one */}
          <Route
            path="/traders/create"
            element={
              // <ProtectedRoute requiredRole={Roles.SUPER_ADMIN}>
                <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <TraderCreate />
                </DashboardLayout>
              // </ProtectedRoute>
            }
          />
          <Route
            path="/traders/:id/edit"
            element={
              // <ProtectedRoute requiredRole={Roles.SUPER_ADMIN}>
                <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <TraderEdit />
                </DashboardLayout>
              // </ProtectedRoute>
            }
          />
          <Route
            path="/traders/:id"
            element={
              // <ProtectedRoute requiredRole={Roles.SUPER_ADMIN}>
                <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                  <TraderDetail />
                </DashboardLayout>
              // </ProtectedRoute>
            }
          />
          {/* Files Management Routes - All users */}
          <Route
            path="/files"
            element={
              <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <FilesManagement />
              </DashboardLayout>
            }
          />
          {/* More specific file routes should come before the general one */}
          <Route
            path="/files/upload"
            element={
              <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <FileUpload />
              </DashboardLayout>
            }
          />
          <Route
            path="/files/:id/edit"
            element={
              <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <FileEdit />
              </DashboardLayout>
            }
          />
          <Route
            path="/files/:id"
            element={
              <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <FileDetail />
              </DashboardLayout>
            }
          />
          {/* Products Management Routes - All users */}
          <Route
            path="/products"
            element={
              <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <ProductsManagement />
              </DashboardLayout>
            }
          />
          {/* More specific product routes should come before the general one */}
          <Route
            path="/products/create"
            element={
              <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <ProductCreate />
              </DashboardLayout>
            }
          />
          <Route
            path="/products/:id/edit"
            element={
              <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <ProductEdit />
              </DashboardLayout>
            }
          />
          <Route
            path="/products/:id"
            element={
              <DashboardLayout darkMode={darkMode} setDarkMode={setDarkMode}>
                <ProductDetail />
              </DashboardLayout>
            }
          />
        </>
      )}

      <Route
        path="/dashboard"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />
      <Route
        path="/customers"
        element={<Navigate to={isAuthenticated ? "/customers" : "/login"} />}
      />

      {/* <Route
        path="/dashboard"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />

      <Route
        path="/dashboard"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      /> */}
    </Routes>
  );
};

export default AppRoutes;
