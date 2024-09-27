// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     employees: [],
// };

// const employeeSlice = createSlice({
//     name: 'employee',
//     initialState,
//     reducers: {
//         addEmployee: (state, action) => {
//             state.employees.push(action.payload);
//         },
//         updateEmployee: (state, action) => {
//             const updatedEmployee = action.payload; // Updated Employee object
//             const index = state.employees.findIndex(employee => employee.id === updatedEmployee.id);
//             if (index !== -1) {
//                 state.employees[index] = updatedEmployee;
//             } else {
//                 // If employee is not found, add it (this ensures the employee is added when fetched from backend)
//                 state.employees.push(updatedEmployee);
//             }
//         },
//         clearStore: (state) => {
//             return initialState; // Reset to initial state
//         },
//     },
// });

// // Export actions
// export const { addEmployee, updateEmployee, clearStore } = employeeSlice.actions;

// // Export the reducer
// export default employeeSlice.reducer;




import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios to make API calls

const initialState = {
    employees: [],
    loading: false,
    error: null, // To handle any potential errors
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state.employees.push(action.payload);
        },
        updateEmployee: (state, action) => {
            const updatedEmployee = action.payload; // Updated Employee object
            const index = state.employees.findIndex(employee => employee.id === updatedEmployee.id);
            if (index !== -1) {
                state.employees[index] = updatedEmployee;
            } else {
                // If employee is not found, add it
                state.employees.push(updatedEmployee);
            }
        },
        setEmployees: (state, action) => {
            state.employees = action.payload; // Action to set employees
        },
        clearStore: (state) => {
            return initialState; // Reset to initial state
        },
    },
});

// Export actions
export const { addEmployee, updateEmployee, setEmployees, clearStore } = employeeSlice.actions;

// Export the reducer
export default employeeSlice.reducer;

