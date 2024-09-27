// src/components/Toast.js
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Toast = ({ open, handleClose, message, severity }) => {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}  anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
