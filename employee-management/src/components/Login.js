import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Typography, Box, Grid } from '@mui/material';
import InputField from '../reusable/FormField';
import Toast from '../reusable/Toast';
import authService from '../services/authService'; // Import the auth service
import { EMPLOYEE_LABELS, ERROR_VAL } from '../constants/constants';
import { AUTH, EMPLOYEE } from '../routes/routes';
import LoginImage from '../assets/images/background.jpg'

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email(ERROR_VAL.INV_EMAIL).required(ERROR_VAL.EMAIL),
  password: Yup.string().min(6, ERROR_VAL.INV_PASS).required(ERROR_VAL.PASS),
});

const Login = () => {
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('error');

  const handleToastClose = () => {
    setToastOpen(false);
  };

  //handling Login Submission
  const handleSubmit = async (values) => {
    try {
      const response = await authService.login(values); // Use the service to log in
      const token = response.token; // Get the token from response
      localStorage.setItem('token', token);
      navigate(EMPLOYEE.DASHBOARD);
    } catch (error) {
      console.error('Login error', error);
      setToastOpen(true);
      setToastMessage(error.response?.data?.message || 'Login failed');
      setToastSeverity('error');
    }
  };

  return (
    
      <Grid container style={{ height: '100vh' }}>
        {/* Left Side: Image Section */}
        <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={LoginImage}
            alt="Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensures the image covers the area without stretching
              filter: 'brightness(0.7)', // Optional: darkens the image for better text visibility
            }}
          />
        </Grid>

        {/* Right Side: Login Form Section */}
        <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Typography variant="h4" align="center" sx={{ mb: 2 }}>
              {EMPLOYEE_LABELS.LOGIN}
            </Typography>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <Field name="email" component={InputField} label={EMPLOYEE_LABELS.EMAIL} />
                  <Field name="password" component={InputField} label={EMPLOYEE_LABELS.PWD} type="password" />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    {EMPLOYEE_LABELS.LOGIN}
                  </Button>
                </Form>
              )}
            </Formik>
            <Toast open={toastOpen} handleClose={handleToastClose} message={toastMessage} severity={toastSeverity} />
          </Box>
        </Grid>
      </Grid>
   
  );
};

export default Login;
