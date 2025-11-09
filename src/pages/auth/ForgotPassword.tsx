import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { Button, Typography, Container, Box, Link, Paper, useTheme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AccountCircle } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { forgotPasswordSchema } from '../../utils/validators';

interface ForgotPasswordFormValues {
  email: string;
}

interface ForgotPasswordFormProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ darkMode }) => {
  const { forgotPassword } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const theme = useTheme();

  const initialValues: ForgotPasswordFormValues = {
    email: '',
  };

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    const success = await forgotPassword(values.email);
    if (success) {
      showSuccess('Password reset link has been sent to your email.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      showError('Failed to send password reset email. Please try again.');
    }
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
            Forgot Password
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue }) => (
              <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                  Enter your email address and we'll send you a link to reset your password.
                </Typography>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: 1.2, fontWeight: 600 }}
                  className="login-button"
                >
                  Send Reset Link
                </Button>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Link href="/login" variant="body2" underline="hover">
                    Back to Login
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

export default ForgotPasswordForm;