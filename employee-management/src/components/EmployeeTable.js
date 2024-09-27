// src/components/EmployeeTable.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployees } from '../redux/employeeSlice';
import { fetchAllEmployees } from '../services/apiService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateEmployeeModal from './updateEmployee';
import HeaderCell from '../reusable/HeaderCell';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { EMPLOYEE_LABELS, MODAL_CONST } from '../constants/constants';
import { deleteEmployee } from '../services/apiService';
import ConfirmationDialog from '../reusable/ConfirmationDialog';

const EmployeeTable = () => {

  const dispatch = useDispatch();
  //Getting employee value from redux store
  const employees = useSelector((state) => state.employee.employees);

  //Handling state for modal open/close & selected emp & confirmation Dialog & pagination
  const [open, setOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //Fetch all employee

  const loadEmployees = async () => {
    try {
      const employeeData = await fetchAllEmployees();
      dispatch(setEmployees(employeeData));
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };



  const handleOpen = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployeeId(null);
  };

  const handleDeleteClick = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setConfirmationDialogOpen(true);
  };

  //Confirm delete emp

  const handleDeleteConfirm = async () => {
    try {
      await deleteEmployee(selectedEmployeeId);
      loadEmployees();
      setConfirmationDialogOpen(false);
      setSelectedEmployeeId(null);
    } catch (error) {
      console.error('Failed to delete employee:', error);
      setConfirmationDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setConfirmationDialogOpen(false);
    setSelectedEmployeeId(null);
  };

  useEffect(() => {
    loadEmployees();
  }, [dispatch]);

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //Handle Pagination Changes

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on change
  };

  // Calculate paginated employees
  const paginatedEmployees = employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell icon={PersonIcon} label={EMPLOYEE_LABELS.NAME} />
            <HeaderCell icon={WorkIcon} label={EMPLOYEE_LABELS.DESIGNATION} />
            <HeaderCell icon={BusinessCenterIcon} label={EMPLOYEE_LABELS.DEPT} />
            <HeaderCell icon={CalendarTodayIcon} label="Date of Joining" />
            <HeaderCell icon={null} label="Actions" />
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedEmployees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="h6" color="textSecondary">
                  {EMPLOYEE_LABELS.NO_DATA}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            paginatedEmployees.map((emp) => (
              <TableRow key={emp._id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}> {/* Row hover effect */}
                <TableCell sx={{ padding: 1, fontWeight: 'bold' }}>{emp.name}</TableCell>
                <TableCell sx={{ padding: 1 }}>{emp.designation}</TableCell>
                <TableCell sx={{ padding: 1 }}>{emp.department}</TableCell>
                <TableCell sx={{ padding: 1 }}>
                  {new Date(emp.dateOfJoining).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ padding: 1 }}>
                  <IconButton onClick={() => handleOpen(emp._id)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(emp._id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <UpdateEmployeeModal open={open} handleClose={handleClose} employeeId={selectedEmployeeId} />

      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title={MODAL_CONST.DLT_TITLE}
        content={MODAL_CONST.DLT_LAB}
      />

      {/* Pagination Component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default EmployeeTable;
