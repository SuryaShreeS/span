// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/integration/react';
// import {  persistor } from './redux/store';
// import Dashboard from './components/Dashboard';
// import AddEmployee from './components/AddEmployee';
// import UpdateEmployeeTab from './components/updateEmployee';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import { AUTH, EMPLOYEE } from './routes/routes';



// const App = () => {
//   return (
//     <PersistGate loading={null} persistor={persistor}>
//        <Router>
//         <Routes>
//           <Route path={EMPLOYEE.DASHBOARD} element={<Dashboard />} />
//           <Route path={AUTH.SIGNUP} element={<Signup/>} />
//           <Route path={AUTH.LOGIN} element={<Login/>} />
         
//         </Routes>
//       </Router>
   
//     </PersistGate>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './protectedRoute'; // Import the ProtectedRoute component
import { AUTH, EMPLOYEE } from './routes/routes';

const App = () => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          {/* Protected Route for Dashboard */}
          <Route path={EMPLOYEE.DASHBOARD} element={<ProtectedRoute element={Dashboard} />} />
          {/* <Route path='/' element={<ProtectedRoute element={Dashboard} />} /> */}
          
          {/* Public Routes */}
          <Route path='/' element={<Signup />} />
          <Route path={AUTH.LOGIN} element={<Login />} />
        </Routes>
      </Router>
    </PersistGate>
  );
};

export default App;

