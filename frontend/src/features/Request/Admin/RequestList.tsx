import React, { useEffect, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
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
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectFetchRecordsUserLoading, selectListRecordsUser } from '../recordSlice';
import { fetchRecordsUser } from '../recordThunk';
import ModalCard from '../../../components/ModalCard';

const RequestList = () => {
  const dispatch = useAppDispatch();
  const requestList = useAppSelector(selectListRecordsUser);
  const loading = useAppSelector(selectFetchRecordsUserLoading);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchRecordsUser());
  }, [dispatch]);

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
                  {!loading ? (
                    requestList.length !== 0 ? (
                      requestList.map((list, index) => (
                        <RequestCardAdmin key={list._id} list={list} setIndex={() => setIndex(index)} />
                      ))
                    ) : (
                      <TableRow>
                        <StyledTableCell>
                          <Alert>Список пуст</Alert>
                        </StyledTableCell>
                      </TableRow>
                    )
                  ) : (
                    <TableRow>
                      <StyledTableCell>
                        <CircularProgress />
                      </StyledTableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Container>
      <ModalCard>{requestList.length > 0 && requestList[index].description}</ModalCard>
    </Container>
  );
};

export default RequestList;
