// import React from 'react';
// import { Formik, Form, Field } from 'formik';
// import { Modal, Box, Button, Typography, TextField } from '@mui/material';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

// // Reusable Modal Component
// const EmployeeModal = ({ open, handleClose, title, initialValues, validationSchema, onSubmit }) => {
//   // Filter out _id and __v fields from initialValues
//   const filteredInitialValues = Object.keys(initialValues)
//     .filter((key) => key !== '_id' && key !== '__v')
//     .reduce((obj, key) => {
//       obj[key] = initialValues[key];
//       return obj;
//     }, {});

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={style}>
//         <Typography variant="h6" component="h2">
//           {title}
//         </Typography>
//         <Formik
//           initialValues={filteredInitialValues} // Use filtered initial values
//           validationSchema={validationSchema}
//           onSubmit={onSubmit}
//           enableReinitialize
//         >
//           {({ errors, touched }) => (
//             <Form>
//               {Object.keys(filteredInitialValues).map((field) => (
//                 <Field
//                   key={field}
//                   name={field}
//                   as={TextField}
//                   label={capitalizeFirstLetter(field.replace(/([A-Z])/g, ' $1'))}
//                   fullWidth
//                   error={Boolean(errors[field] && touched[field])}
//                   helperText={errors[field] && touched[field] ? errors[field] : null}
//                   margin="normal"
//                   type={field === 'dateOfJoining' ? 'date' : 'text'}
//                   InputLabelProps={field === 'dateOfJoining' ? { shrink: true } : {}}
//                 />
//               ))}
//               <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
//                 {title.includes('Add') ? 'Add Employee' : 'Update Employee'}
//               </Button>
//               <Button type="button" onClick={handleClose} color="secondary" variant="outlined" sx={{ mt: 2, ml: 2 }}>
//                 Close
//               </Button>
//             </Form>
//           )}
//         </Formik>
//       </Box>
//     </Modal>
//   );
// };

// const capitalizeFirstLetter = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// };

// export default EmployeeModal;
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Modal, Box, Button, Typography, TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Reusable Modal Component
const EmployeeModal = ({ open, handleClose, title, initialValues, validationSchema, onSubmit }) => {
  // Filter out _id and __v fields from initialValues
  const filteredInitialValues = Object.keys(initialValues)
    .filter((key) => key !== '_id' && key !== '__v')
    .reduce((obj, key) => {
      // Set current date for 'dateOfJoining' field if not provided
      obj[key] = key === 'dateOfJoining' && (!initialValues[key] || initialValues[key] === '')
        ? new Date().toISOString().split('T')[0] // Format to YYYY-MM-DD
        : initialValues[key];
      return obj;
    }, {});

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Formik
          initialValues={filteredInitialValues} // Use filtered initial values
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form>
              {Object.keys(filteredInitialValues).map((field) => (
                <Field
                  key={field}
                  name={field}
                  as={TextField}
                  label={capitalizeFirstLetter(field.replace(/([A-Z])/g, ' $1'))}
                  fullWidth
                  error={Boolean(errors[field] && touched[field])}
                  helperText={errors[field] && touched[field] ? errors[field] : null}
                  margin="normal"
                  type={field === 'dateOfJoining' ? 'date' : 'text'}
                  InputLabelProps={field === 'dateOfJoining' ? { shrink: true } : {}}
                />
              ))}
              <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
                {title.includes('Add') ? 'Add Employee' : 'Update Employee'}
              </Button>
              <Button type="button" onClick={handleClose} color="secondary" variant="outlined" sx={{ mt: 2, ml: 2 }}>
                Close
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default EmployeeModal;
