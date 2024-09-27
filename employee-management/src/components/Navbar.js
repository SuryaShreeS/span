import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearStore } from '../redux/employeeSlice'; // Redux action to clear store on logout
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';

import '../styles/Navbar.css'; // Import your CSS for additional styles
import { EMPLOYEE_LABELS } from '../constants/constants';
import { AUTH } from '../routes/routes';

// Navbar component
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    dispatch(clearStore()); // Clear Redux store
    navigate(AUTH.LOGIN); // Redirect to login page
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: '#283593' }}> {/* Change color as needed */}
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">

        </IconButton>
        <img src="https://www.spantechnologyservices.com/Content/images/span_new_logo.png" alt="Logo" style={{ height: '40px', marginRight: '16px' }} />
        <Typography variant="h6" style={{ flexGrow: 1, animation: 'fade-in 2s' }}>
          {EMPLOYEE_LABELS.SPAN}
        </Typography>

        <Button color="inherit" onClick={handleLogout}>{EMPLOYEE_LABELS.LOGOUT}</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
