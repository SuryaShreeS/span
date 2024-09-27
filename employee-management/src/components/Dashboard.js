import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import EmployeeTable from './EmployeeTable';
import { Container, Typography, Button, Box } from '@mui/material';
import AddEmployeeModal from './AddEmployee';
import { EMPLOYEE_LABELS } from '../constants/constants';

const Dashboard = () => {
  //Open the Add emp modal
  const [openModal, setOpenModal] = useState(false);

  //Handling Modal functions open/close
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Container
      style={{
        paddingTop: '64px',
        paddingBottom: '50px',

        minHeight: '100vh',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',

      }}

    >
      <Navbar />
      <Box
        className="dashboard-content"
        style={{
          padding: '40px',

          borderRadius: '8px',

        }}
      >
        <Typography variant="h4" gutterBottom>
          {EMPLOYEE_LABELS.DASH}
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            {EMPLOYEE_LABELS.ADD_EMP}
          </Button>
        </Box>
        <EmployeeTable />
      </Box>
      <Footer />

      <AddEmployeeModal open={openModal} handleClose={handleClose} />
    </Container>
  );
};

export default Dashboard;
