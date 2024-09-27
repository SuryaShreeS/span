import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import EmployeeModal from '../reusable/EmployeeModal';
import { ERROR_VAL } from '../constants/constants';
import { fetchEmployeeDetails, updateEmployee, fetchAllEmployees } from '../services/apiService'; // Import the API functions
import { format } from 'date-fns'; // Ensure you have date-fns installed or use another date library

const UpdateEmployeeModal = ({ open, handleClose, employeeId }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    if (employeeId) {
      try {
        const employeeData = await fetchEmployeeDetails(employeeId); // Call the API function
        setEmployee(employeeData);
      } catch (error) {
        console.error('Failed to fetch employee details:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (values) => {
    try {
      const updatedEmployeeData = await updateEmployee(employeeId, values); // Call the API function
      await fetchAllEmployees(); // Fetch all employees after successful update
      window.location.reload();
      handleClose(); // Close the modal after updating
    } catch (error) {
      console.error('Failed to update employee:', error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(ERROR_VAL.NAME),
    designation: Yup.string().required(ERROR_VAL.DESIGNATION),
    department: Yup.string().required(ERROR_VAL.DEPT),
    address: Yup.string().required(ERROR_VAL.ADDR),

  });

  const initialValues = employee
    ? { 
        name: employee.name, 
        designation: employee.designation, 
        department: employee.department, 
        address: employee.address, 
        dateOfJoining: format(new Date(employee.dateOfJoining), 'yyyy-MM-dd'), // Format the date for the input
      }
    : { 
        name: '', 
        designation: '', 
        department: '', 
        address: '', 
        dateOfJoining: null 
      };

  useEffect(() => {
    fetchDetails();
  }, [employeeId]);

  return (
    <EmployeeModal
      open={open}
      handleClose={handleClose}
      title="Update Employee"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default UpdateEmployeeModal;
