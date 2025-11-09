import React, { createContext, useContext,  } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showWarning: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const showSuccess = (message: string) => {
    toast.success(message, getToastOptions());
  };

  const showError = (message: string) => {
    toast.error(message, getToastOptions());
  };

  const showInfo = (message: string) => {
    toast.info(message, getToastOptions());
  };

  const showWarning = (message: string) => {
    toast.warn(message, getToastOptions());
  };

  const getToastOptions = (): ToastOptions => ({
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo, showWarning }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};