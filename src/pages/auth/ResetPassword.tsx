import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { Button, Typography, Container, Box, Link, Paper, useTheme } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { resetPasswordSchema } from '../../utils/validators';

interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordFormProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ darkMode }) => {
  const { token } = useParams<{ token: string }>();
  const { resetPassword } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const theme = useTheme();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues: ResetPasswordFormValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) {
      showError('Invalid reset token.');
      return;
    }

    const success = await resetPassword(token, values.newPassword);
    if (success) {
      showSuccess('Password has been reset successfully. You can now log in.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      showError('Failed to reset password. Please try again.');
    }
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            Reset Password
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={resetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue, isSubmitting }) => (
              <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Field
                  component={TextField}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  id="newPassword"
                  name="newPassword"
                  label="New Password"
                  type={showNewPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle new password visibility"
                          onClick={handleToggleNewPasswordVisibility}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Field
                  component={TextField}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleToggleConfirmPasswordVisibility}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                  disabled={isSubmitting}
                >
                  Reset Password
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

export default ResetPasswordForm;