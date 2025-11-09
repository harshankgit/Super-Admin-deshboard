import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = React.useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
              main: '#1976d2',
              light: '#42a5f5',
              dark: '#1565c0',
            },
            secondary: {
              main: '#e57373',
              light: '#ef9a9a',
              dark: '#e53935',
            },
            background: {
              default: darkMode ? '#121212' : '#f5f5f5',
              paper: darkMode ? '#1e1e1e' : '#ffffff',
            },
            text: {
              primary: darkMode ? '#e0e0e0' : '#212121',
              secondary: darkMode ? '#b0b0b0' : '#757575',
            },
          },
          typography: {
            fontFamily: [
              '-apple-system',
              'BlinkMacSystemFont',
              '"Segoe UI"',
              'Roboto',
              '"Helvetica Neue"',
              'Arial',
              'sans-serif',
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"',
            ].join(','),
          },
          components: {
            MuiAppBar: {
              styleOverrides: {
                root: {
                  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
                },
              },
            },
            MuiCard: {
              styleOverrides: {
                root: {
                  borderRadius: 12,
                },
              },
            },
            MuiPaper: {
              styleOverrides: {
                root: {
                  backgroundImage: 'none', // Remove default Material-UI background gradient
                },
              },
            },
            MuiButton: {
              styleOverrides: {
                root: {
                  textTransform: 'none',
                  fontWeight: 600,
                },
              },
            },
          },
        })
      ),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <ToastProvider>
            <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode} />
          </ToastProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
