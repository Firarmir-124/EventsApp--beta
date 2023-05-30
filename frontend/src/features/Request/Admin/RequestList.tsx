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
import { fetchRecordsUser, publishedRecordUser } from '../recordThunk';
import ModalCard from '../../../components/ModalCard';
import { openSnackbar } from '../../Event/eventSlice';
import SnackbarCard from '../../../components/SnackbarCard';

const RequestList = () => {
  const dispatch = useAppDispatch();
  const requestList = useAppSelector(selectListRecordsUser);
  const loading = useAppSelector(selectFetchRecordsUserLoading);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchRecordsUser());
  }, [dispatch]);

  const publishedRecord = async (id: string) => {
    if (window.confirm('Вы действительно хотите подтвердить ?')) {
      await dispatch(publishedRecordUser(id)).unwrap();
      await dispatch(fetchRecordsUser()).unwrap();
      dispatch(openSnackbar({ status: true, parameter: 'published' }));
    } else {
      return;
    }
  };

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
                      requestList
                        .filter((item) => !item.status)
                        .map((list, index) => (
                          <RequestCardAdmin
                            key={list._id}
                            list={list}
                            setIndex={() => setIndex(index)}
                            publishedRecord={() => publishedRecord(list._id)}
                          />
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
      <SnackbarCard />
    </Container>
  );
};

export default RequestList;
