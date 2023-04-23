import React, { useEffect, useState } from 'react';
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
import {
  closeModal,
  openModal,
  openSnackbar,
  selectEventList,
  selectEventLoading,
  selectEventOne,
} from '../eventSlice';
import { fetchEventList, fetchOneEvent, removeEvent, updateEvent } from '../eventThunk';
import { StyledTableCell } from '../../../constants';
import CardEventAdmin from '../components/CardEventAdmin';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../../User/usersSlice';
import SnackbarCard from '../../../components/SnackbarCard';
import { EventMutation } from '../../../types';
import ModalCard from '../../../components/ModalCard';
import FormEvent from '../components/FormEvent';

const EventList = () => {
  const user = useAppSelector(selectUser);
  const [page, setPage] = React.useState(1);
  const dispatch = useAppDispatch();
  const eventList = useAppSelector(selectEventList);
  const loadingEventList = useAppSelector(selectEventLoading);
  const [idEvent, setIdEvent] = useState('');
  const eventOne = useAppSelector(selectEventOne);

  useEffect(() => {
    if (page) {
      dispatch(fetchEventList({ page, idHashtag: undefined }));
    }
  }, [dispatch, page]);

  useEffect(() => {
    if (idEvent) {
      dispatch(fetchOneEvent(idEvent));
    }
  }, [dispatch, idEvent]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const removeCardEvent = async (id: string) => {
    if (window.confirm('Вы действительно хотите удалить ?')) {
      await dispatch(removeEvent(id)).unwrap();
      if (page) {
        await dispatch(fetchEventList({ page, idHashtag: undefined })).unwrap();
      }
      dispatch(openSnackbar({ status: true, parameter: 'remove_event' }));
    } else {
      return;
    }
  };

  const openModalEvent = (id: string) => {
    dispatch(openModal());
    setIdEvent(id);
  };

  const onSubmit = async (event: EventMutation) => {
    if (idEvent) {
      await dispatch(updateEvent({ event, id: idEvent })).unwrap();
    }
    if (page) {
      await dispatch(fetchEventList({ page, idHashtag: undefined })).unwrap();
    }
    setIdEvent('');
    dispatch(closeModal());
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
                  eventList.eventPlanList.map((event) => (
                    <CardEventAdmin
                      openModalEvent={() => openModalEvent(event._id)}
                      removeCardEvent={() => removeCardEvent(event._id)}
                      key={event._id}
                      event={event}
                    />
                  ))
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
      <ModalCard>{eventOne && <FormEvent onSubmit={onSubmit} event={eventOne} />}</ModalCard>
    </Container>
  );
};

export default EventList;