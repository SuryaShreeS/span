// src/components/HeaderCell.js
import React from 'react';
import { TableCell, Grid, Typography } from '@mui/material';

const HeaderCell = ({ icon: Icon, label }) => {
  return (
    <TableCell sx={{ backgroundColor: '#1976d2', color: '#fff', fontWeight: 'bold' }}>
      <Grid container alignItems="center" sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
          {Icon && <Icon sx={{ marginRight: 1, color: '#fff' }} />} {/* Render icon if not null */}
          <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 'bold' }}>
            {label}
          </Typography>
        </Grid>
      </Grid>
    </TableCell>
  );
};

export default HeaderCell;
