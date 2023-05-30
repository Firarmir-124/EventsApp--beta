import React from 'react';
import {
  Avatar,
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { StyledTableCell } from '../../../constants';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import RequestCardAdmin from '../components/RequestCardAdmin';

const RequestList = () => {
  return (
    <Container>
      <Container>
        <Box
          style={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AddAlertIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Список запросов
          </Typography>
          <Paper elevation={3} sx={{ width: '100%', minHeight: '600px', overflowX: 'hidden' }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Имя</StyledTableCell>
                    <StyledTableCell align="center">Телефон</StyledTableCell>
                    <StyledTableCell align="center">Информация</StyledTableCell>
                    <StyledTableCell align="center">Название евента</StyledTableCell>
                    <StyledTableCell align="right">Управление</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <RequestCardAdmin />
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Container>
    </Container>
  );
};

export default RequestList;
