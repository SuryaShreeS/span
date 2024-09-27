import React from 'react';
import { Container } from '@mui/material';
import '../styles/Footer.css'; // Import your CSS for additional styles
import { EMPLOYEE_LABELS } from '../constants/constants';

// Footer component
const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <p>&copy; {EMPLOYEE_LABELS.FOOTER}</p>
      </Container>
    </footer>
  );
};

export default Footer;
