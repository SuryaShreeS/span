// src/components/AddEmployee.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee as addEmployeeAction } from '../redux/employeeSlice';
import EmployeeModal from '../reusable/EmployeeModal';
import * as Yup from 'yup';
import { ERROR_VAL } from '../constants/constants';
import { addEmployee } from '../services/apiService'; // Import the addEmployee function

const AddEmployee = ({ open, handleClose }) => {
  const dispatch = useDispatch();

//Validation for adding new emp
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(ERROR_VAL.NAME),
    designation: Yup.string().required(ERROR_VAL.DESIGNATION),
    department: Yup.string().required(ERROR_VAL.DEPT),
    address: Yup.string().required(ERROR_VAL.ADDR),
  });

//Add New Emp data
  const handleSubmit = async (values) => {
    try {
      const employeeData = await addEmployee(values); // Call the API function
      dispatch(addEmployeeAction(employeeData)); // Dispatch the action with the new employee data
      handleClose();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };
  //Assigning initial Value

  const initialValues = { name: '', designation: '', department: '', dateOfJoining: null, address: '' };

  return (
    <EmployeeModal
      open={open}
      handleClose={handleClose}
      title="Add Employee"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    />
  );
};

export default AddEmployee;
