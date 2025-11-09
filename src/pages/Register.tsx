import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Container,
  Link,
  Grid
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/apiService';

const RegisterForm: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phoneNo: '',
    isSubscribed: false,
  };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<typeof initialValues> = {};

    if (!values.name) {
      errors.name = 'Name is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await authAPI.register(values.email, values.password, values.name);
      showSuccess(response.message || 'Registration successful!');
      navigate('/login'); // Redirect to login after successful registration
    } catch (error: any) {
      console.error('Registration error:', error);
      showError(error.response?.data?.message || error.message || 'Registration failed. Please try again.');
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
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Register
          </Typography>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  helperText={errors.name && touched.name && errors.name}
                  error={!!errors.name && touched.name}
                />
                
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={errors.email && touched.email && errors.email}
                  error={!!errors.email && touched.email}
                />
                
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText={errors.password && touched.password && errors.password}
                  error={!!errors.password && touched.password}
                />
                
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  helperText={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                  error={!!errors.confirmPassword && touched.confirmPassword}
                />
                
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="companyName"
                  label="Company Name"
                  name="companyName"
                />
                
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="phoneNo"
                  label="Phone Number"
                  name="phoneNo"
                />
                
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      name="isSubscribed"
                      color="primary"
                    />
                  }
                  label="Subscribe to newsletter"
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, mb: 2 }}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
                
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterForm;