import React, { useEffect, useState } from 'react';
import {
  Alert,
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
  selectCellTable,
  selectEventList,
  selectEventLoading,
  selectEventOne,
  selectPerPage,
} from '../eventSlice';
import { fetchEventList, fetchOneEvent, removeEvent, updateEvent } from '../eventThunk';
import { StyledTableCell } from '../../../constants';
import CardEventAdmin from '../components/CardEventAdmin';
import SnackbarCard from '../../../components/SnackbarCard';
import { EventMutation } from '../../../types';
import ModalCard from '../../../components/ModalCard';
import FormEvent from '../components/FormEvent';
import SettingsIcon from '@mui/icons-material/Settings';
import DrawerCard from '../components/DrawerCard';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const EventList = () => {
  const filter = localStorage.getItem('filter' || null);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const eventList = useAppSelector(selectEventList);
  const loadingEventList = useAppSelector(selectEventLoading);
  const [idEvent, setIdEvent] = useState('');
  const eventOne = useAppSelector(selectEventOne);
  const cellTablesGlobal = useAppSelector(selectCellTable);
  const perPage = useAppSelector(selectPerPage);

  useEffect(() => {
    if (page) {
      dispatch(fetchEventList({ page, perPage }));
    }
  }, [dispatch, page, perPage]);

  useEffect(() => {
    if (idEvent) {
      dispatch(fetchOneEvent(idEvent));
    }
  }, [dispatch, idEvent]);

  const removeCardEvent = async (id: string) => {
    if (window.confirm('Вы действительно хотите удалить ?')) {
      await dispatch(removeEvent(id)).unwrap();
      if (page) {
        await dispatch(fetchEventList({ page, perPage: eventList.perPage })).unwrap();
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
      await dispatch(fetchEventList({ page, perPage: eventList.perPage })).unwrap();
    }
    setIdEvent('');
    dispatch(closeModal());
  };

  const resetFilter = async () => {
    localStorage.removeItem('filter');
    await dispatch(fetchEventList({ page: 0, perPage: 0 }));
  };

  return (
    <Container sx={{ mt: '20px' }}>
      <IconButton onClick={() => dispatch(openDrawer())}>
        <SettingsIcon />
      </IconButton>
      {filter && (
        <IconButton onClick={resetFilter} aria-label="delete">
          <RestartAltIcon />
        </IconButton>
      )}
      <Paper elevation={3} sx={{ width: '100%', minHeight: '600px', overflowX: 'hidden' }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {cellTablesGlobal
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
      <Pagination
        sx={{ mt: '20px' }}
        count={eventList.pages}
        page={page}
        onChange={(event: React.ChangeEvent<unknown>, value: number) => setPage(value)}
      />
      <SnackbarCard />
      <ModalCard>{eventOne && <FormEvent onSubmit={onSubmit} event={eventOne} />}</ModalCard>
      <DrawerCard />
    </Container>
  );
};

export default EventList;
