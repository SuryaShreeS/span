// // server.js
// const express = require('express');
// const cors = require('cors'); 
// const connectDB = require('./db'); // Import the DB connection
// const employeeRoutes = require('./api/employees'); // Import your employee routes

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Connect to MongoDB
// connectDB();
// app.use(cors({
//     origin: 'http://localhost:3000', // Your React frontend URL
//   }));
  

// // Middleware
// app.use(express.json()); // For parsing application/json

// // Routes
// app.use('/api/employees', employeeRoutes); // Define your employee routes

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Import the DB connection
const employeeRoutes = require('./api/employees'); // Import employee routes
const authRoutes = require('./api/auth'); // Import authentication routes
const jwt = require('jsonwebtoken'); // JWT for token creation and verification
const verifyToken = require('./middleware/auth'); // Middleware to verify JWT

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000', // Your React frontend URL
}));

// Middleware
app.use(express.json()); // For parsing application/json

// Authentication Routes
app.use('/api/auth', authRoutes); // Login and Signup routes


// Employee Routes (Protected by JWT)
app.use('/api/employees', verifyToken, employeeRoutes); // Protected employee routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
