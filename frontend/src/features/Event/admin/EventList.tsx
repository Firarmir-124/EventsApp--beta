import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  IconButton,
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
  openDrawer,
  openModal,
  openSnackbar,
  resetFilterType,
  selectCellTable,
  selectEventList,
  selectEventLoading,
  selectEventOne,
  selectFilterReset,
  selectPerPage,
  selectSettingsLocal,
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
import SettingsIcon from '@mui/icons-material/Settings';
import DrawerCard from '../components/DrawerCard';

const EventList = () => {
  const user = useAppSelector(selectUser);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const eventList = useAppSelector(selectEventList);
  const loadingEventList = useAppSelector(selectEventLoading);
  const [idEvent, setIdEvent] = useState('');
  const eventOne = useAppSelector(selectEventOne);
  const cellTablesGlobal = useAppSelector(selectCellTable);
  const perPage = useAppSelector(selectPerPage);
  const cellTablesLocal = useAppSelector(selectSettingsLocal);
  const resetFilter = useAppSelector(selectFilterReset);

  useEffect(() => {
    if (page) {
      dispatch(fetchEventList({ page, perPage, filter: null }));
    }
  }, [dispatch, page, perPage]);

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
        await dispatch(fetchEventList({ page, perPage: eventList.perPage, filter: null })).unwrap();
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
      await dispatch(fetchEventList({ page, perPage: eventList.perPage, filter: null })).unwrap();
    }
    setIdEvent('');
    dispatch(closeModal());
  };

  const onResetFilter = () => {
    dispatch(resetFilterType(false));
    dispatch(fetchEventList({ page: 0, perPage: 0, filter: null }));
  };

  if (user?.role !== 'organizer') {
    return <Navigate to="/login" />;
  }

  return (
    <Container sx={{ mt: '20px' }}>
      {resetFilter && <Button onClick={onResetFilter}>Сброисть фильтры</Button>}
      <IconButton onClick={() => dispatch(openDrawer())}>
        <SettingsIcon />
      </IconButton>
      <Paper elevation={3} sx={{ width: '100%', minHeight: '600px', overflowX: 'hidden' }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {cellTablesLocal.length !== 0
                  ? cellTablesLocal
                      .filter((item) => item.show)
                      .map((name) => (
                        <StyledTableCell key={name.id} align="left">
                          {name.name}
                        </StyledTableCell>
                      ))
                  : cellTablesGlobal
                      .filter((item) => item.show)
                      .map((name) => (
                        <StyledTableCell key={name.id} align="left">
                          {name.name}
                        </StyledTableCell>
                      ))}
                <StyledTableCell align="right">Управление</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loadingEventList ? (
                eventList.eventList.length !== 0 ? (
                  eventList.eventList.map((event) => (
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
      <Pagination sx={{ mt: '20px' }} count={eventList.pages} page={page} onChange={handleChange} />
      <SnackbarCard />
      <ModalCard>{eventOne && <FormEvent onSubmit={onSubmit} event={eventOne} />}</ModalCard>
      <DrawerCard />
    </Container>
  );
};

export default EventList;
