// src/services/apiService.js
import axios from 'axios';
import { API_ROUTE } from '../routes/routes';

const token = localStorage.getItem('token'); // Retrieve the token once

const axiosInstance = axios.create({
  baseURL: API_ROUTE,
  headers: {
    Authorization: `Bearer ${token}`, // Set the token in the headers for all requests
  },
});

// Function to fetch all employees
export const fetchAllEmployees = async () => {
  try {
    const response = await axiosInstance.get('/employees');
    return response.data; // Return the employee data
  } catch (error) {
    throw new Error('Failed to fetch employees');
  }
};

// Function to fetch employee details by ID
export const fetchEmployeeDetails = async (employeeId) => {
  try {
    const response = await axiosInstance.get(`/employees/${employeeId}`);
    return response.data; // Return the employee data
  } catch (error) {
    throw new Error('Failed to fetch employee details');
  }
};

// Function to add a new employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await axiosInstance.post('/employees', employeeData);
    return response.data; // Return the newly added employee data
  } catch (error) {
    throw new Error('Error adding employee');
  }
};

// Function to update an employee
export const updateEmployee = async (employeeId, employeeData) => {
  try {
    const response = await axiosInstance.put(`/employees/${employeeId}`, employeeData);
    return response.data; // Return the updated employee data
  } catch (error) {
    throw new Error('Failed to update employee');
  }
};

// Function to delete an employee (if you implement this feature)
export const deleteEmployee = async (employeeId) => {
  try {
    await axiosInstance.delete(`/employees/${employeeId}`);
    return true; // Return true on successful deletion
  } catch (error) {
    throw new Error('Failed to delete employee');
  }
};
