import React, { useEffect } from 'react';
import {
  Alert,
  CircularProgress,
  Container,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectEventList, selectEventLoading } from '../eventSlice';
import { fetchEventList } from '../eventThunk';
import { StyledTableCell } from '../../../constants';
import CardEventAdmin from '../components/CardEventAdmin';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../../User/usersSlice';
import SnackbarCard from '../../../components/SnackbarCard';

const EventList = () => {
  const user = useAppSelector(selectUser);
  const [page, setPage] = React.useState(1);
  const dispatch = useAppDispatch();
  const eventList = useAppSelector(selectEventList);
  const loadingEventList = useAppSelector(selectEventLoading);

  useEffect(() => {
    if (page) {
      dispatch(fetchEventList(page));
    }
  }, [dispatch, page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (user?.role !== 'organizer') {
    return <Navigate to="/login" />;
  }

  return (
    <Container sx={{ mt: '20px' }}>
      <Paper elevation={3} sx={{ width: '100%', minHeight: '600px', overflowX: 'hidden' }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Навание</StyledTableCell>
                <StyledTableCell align="left">Время</StyledTableCell>
                <StyledTableCell align="left">Гости</StyledTableCell>
                <StyledTableCell align="left">Спикеры</StyledTableCell>
                <StyledTableCell align="right">Управление</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loadingEventList ? (
                eventList.eventPlanList.length !== 0 ? (
                  eventList.eventPlanList.map((event) => <CardEventAdmin key={event._id} event={event} />)
                ) : (
                  <TableRow>
                    <TableCell>
                      <Alert severity="info">Список пуст</Alert>
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Pagination
        sx={{ mt: '20px' }}
        count={Math.ceil(eventList.eventPlanListLength / 8)}
        page={page}
        onChange={handleChange}
      />
      <SnackbarCard />
    </Container>
  );
};

export default EventList;
