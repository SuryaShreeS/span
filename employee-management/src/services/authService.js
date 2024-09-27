// src/services/authService.js

import axios from 'axios';
import { API_ROUTE } from '../routes/routes';

const authService = {
  signup: async (userData) => {
    try {
      const response = await axios.post(`${API_ROUTE}/auth/signup`, userData);
      return response.data; // Return the response data, such as token
    } catch (error) {
      throw error; // Propagate the error
    }
  },

  login: async (userData) => {
    try {
      const response = await axios.post(`${API_ROUTE}/auth/login`, userData);
      return response.data; // Return the response data, such as token
    } catch (error) {
      throw error; // Propagate the error
    }
  },
};

export default authService;
