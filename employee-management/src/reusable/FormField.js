// InputField.js
import React from 'react';
import { TextField } from '@mui/material';

const InputField = ({ field, form, ...props }) => {
  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      variant="outlined"
      margin="normal"
      error={Boolean(form.touched[field.name] && form.errors[field.name])}
      helperText={form.touched[field.name] && form.errors[field.name]}
    />
  );
};

export default InputField;
