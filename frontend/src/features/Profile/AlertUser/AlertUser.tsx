import React from 'react';
import { Box, ButtonGroup, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import SnackbarCard from '../../../components/SnackbarCard';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const AlertUser = () => {
  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Статус</TableCell>
            <TableCell align="center">Отправитель</TableCell>
            <TableCell align="center">Евент</TableCell>
            <TableCell align="center">Номер телефона</TableCell>
            <TableCell align="center">Управление</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              <Box
                sx={{
                  background: 'gold',
                  width: '25px',
                  height: '25px',
                  borderRadius: '50%',
                }}
              ></Box>
            </TableCell>
            <TableCell align="center">1</TableCell>
            <TableCell align="center">2</TableCell>
            <TableCell align="center">3</TableCell>
            <TableCell align="center">
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <IconButton aria-label="delete">
                  <RemoveCircleIcon />
                </IconButton>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <SnackbarCard />
    </>
  );
};

export default AlertUser;
