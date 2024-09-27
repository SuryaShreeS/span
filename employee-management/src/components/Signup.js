import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Typography, Box, Grid } from '@mui/material';
import InputField from '../reusable/FormField';
import Toast from '../reusable/Toast';
import authService from '../services/authService'; // Import the auth service
import { EMPLOYEE_LABELS, ERROR_VAL } from '../constants/constants';
import { AUTH } from '../routes/routes';
import LoginImage from '../assets/images/background.jpg'

// Validation Schema
const SignupSchema = Yup.object().shape({
  username: Yup.string().required(ERROR_VAL.USERNAME),
  email: Yup.string().email(ERROR_VAL.INV_EMAIL).required(ERROR_VAL.EMAIL),
  password: Yup.string().min(6, ERROR_VAL.INV_PASS).required(ERROR_VAL.PASS),
});

const Signup = () => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState('error');
  const navigate = useNavigate();

  const handleToastClose = () => {
    setToastOpen(false);
  };

  //Handling signup form 

  const handleSubmit = async (values) => {
    try {
      const response = await authService.signup(values); // Use the service to sign up
      const token = response.token; // Get the token from response
      localStorage.setItem('token', token);
      navigate(AUTH.LOGIN);
    } catch (error) {
      console.error('Signup error', error);
      setToastMessage(error.response?.data?.message || 'Signup failed');
      setToastSeverity('error');
      setToastOpen(true); // Open the toast on error
    }
  };

  return (
   
      <Grid container style={{ height: '100vh' }}>
        {/* Left Side: Image Section */}
        <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={LoginImage} // Ensure this path is correct
            alt="Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Ensures the image covers the area without stretching
              filter: 'brightness(0.7)', // Optional: darkens the image for better text visibility
            }}
          />
        </Grid>

        {/* Right Side: Signup Form Section */}
        <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Typography variant="h4" align="center" sx={{ mb: 2 }}>
              {EMPLOYEE_LABELS.SIGNUP}
            </Typography>
            <Formik
              initialValues={{ username: '', email: '', password: '' }}
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <Field name="username" component={InputField} label={EMPLOYEE_LABELS.USERNAME} />
                  <Field name="email" component={InputField} label={EMPLOYEE_LABELS.EMAIL} />
                  <Field name="password" component={InputField} label={EMPLOYEE_LABELS.PWD} type="password" />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    {EMPLOYEE_LABELS.SIGNUP}
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

export default Signup;
