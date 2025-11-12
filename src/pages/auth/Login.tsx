import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { Button, Typography, Container, Box, Link, Paper, useTheme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Roles } from '../../services/apiService';
import { loginSchema } from '../../utils/validators';

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ darkMode }) => {
  const { login } = useAuth();
  const { showError } = useToast();
  const navigate = useNavigate();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: LoginFormValues) => {
    const success = await login(values.email, values.password);

    if (success) {
      // Redirect based on user role after successful login
      const token = localStorage.getItem('token');
      if (token) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (userData.role === Roles.SUPER_ADMIN) {
          navigate('/traders'); // Super Admin goes to traders list
        } else {
          navigate('/files'); // Trader goes to files management
        }
      }
    } else {
      showError('Invalid credentials. Please try again.');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 3,
          }}
        >
          <Box sx={{
            backgroundColor: 'primary.main',
            p: 1.5,
            borderRadius: '50%',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <LockOutlinedIcon sx={{ color: 'white', fontSize: 30 }} />
          </Box>
          <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Sign in
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue }) => (
              <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Field
                  component={TextField}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  id="email"
                  name="email"
                  label="Email Address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <Field
                  component={TextField}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: 1.2, fontWeight: 600 }}
                  className="login-button"
                >
                  Sign In
                </Button>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Link href="/forgot-password" variant="body2" underline="hover">
                    Forgot password?
                  </Link>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginForm;