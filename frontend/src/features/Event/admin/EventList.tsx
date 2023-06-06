import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
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
  ToggleButton,
  Tooltip,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  addEventId,
  closeModal,
  openDrawer,
  openModal,
  openSnackbar,
  resetEventId,
  selectCellTable,
  selectEventList,
  selectEventLoading,
  selectEventOne,
  selectEventOneLoading,
  selectPerPage,
  selectSelectedEventId,
} from '../eventSlice';
import { checkedEvent, fetchEventList, fetchOneEvent, removeEvent, updateEvent } from '../eventThunk';
import { StyledTableCell } from '../../../constants';
import CardEventAdmin from '../components/CardEventAdmin';
import SnackbarCard from '../../../components/SnackbarCard';
import { EventMutation } from '../../../types';
import ModalCard from '../../../components/ModalCard';
import FormEvent from '../components/FormEvent';
import SettingsIcon from '@mui/icons-material/Settings';
import DrawerCard from '../components/DrawerCard';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SkeletonCardAdmin from '../components/SkeletonCardAdmin';
import useConfirm from '../../../components/Dialogs/Confirm/useConfirm';
import SkeletonCardEdit from '../components/SkeletonCardEdit';
import ViewListIcon from '@mui/icons-material/ViewList';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const EventList = () => {
  const filter = localStorage.getItem('filter' || null);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const eventList = useAppSelector(selectEventList);
  const loadingEventList = useAppSelector(selectEventLoading);
  const [idEvent, setIdEvent] = useState('');
  const eventOne = useAppSelector(selectEventOne);
  const eventOneLoading = useAppSelector(selectEventOneLoading);
  const cellTablesGlobal = useAppSelector(selectCellTable);
  const perPage = useAppSelector(selectPerPage);
  const { confirm } = useConfirm();
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const listEventId = useAppSelector(selectSelectedEventId);

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
    if (await confirm('Уведомление', 'Вы действительно хотите удалить ?')) {
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
    setIsEdit(true);
  };

  const onSubmit = async (event: EventMutation) => {
    if (idEvent) {
      await dispatch(updateEvent({ event, id: idEvent })).unwrap();
      setIsEdit(false);
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

  const checkedCardEvent = async (id: string) => {
    await dispatch(checkedEvent({ id, allChecked: false })).unwrap();
    await dispatch(fetchEventList({ page, perPage }));
    dispatch(addEventId());
  };

  const resetCardLocationId = async () => {
    await dispatch(checkedEvent({ id: undefined, allChecked: true })).unwrap();
    await dispatch(fetchEventList({ page, perPage })).unwrap();
    dispatch(resetEventId());
  };

  return (
    <Container sx={{ mt: '20px' }}>
      <Tooltip title={!open ? 'Открыть выбор' : 'Закрыть выбор'} placement="top">
        <ToggleButton onClick={() => setOpen((prev) => !prev)} value="list" aria-label="list">
          {!open ? <ViewListIcon /> : <CloseIcon />}
        </ToggleButton>
      </Tooltip>
      <IconButton onClick={() => dispatch(openDrawer())}>
        <SettingsIcon />
      </IconButton>
      {filter && (
        <IconButton onClick={resetFilter} aria-label="delete">
          <RestartAltIcon />
        </IconButton>
      )}
      <Button
        component={Link}
        disabled={listEventId.length <= 0}
        size="large"
        variant="contained"
        to={'constructor_link'}
      >
        Создать ссылку
      </Button>
      {eventList.eventList.filter((item) => item.checked).length > 1 && (
        <Button sx={{ ml: 2 }} onClick={resetCardLocationId} size="large" variant="contained">
          Сбросить предложение
        </Button>
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
              {eventList.eventList.length !== 0 ? (
                eventList.eventList.map((event) =>
                  !loadingEventList ? (
                    <CardEventAdmin
                      openModalEvent={() => openModalEvent(event._id)}
                      removeCardEvent={() => removeCardEvent(event._id)}
                      key={event._id}
                      event={event}
                      open={open}
                      checkedCardEvent={() => checkedCardEvent(event._id)}
                    />
                  ) : (
                    <SkeletonCardAdmin key={event._id} />
                  ),
                )
              ) : (
                <TableRow>
                  <TableCell>
                    <Alert severity="info">Список в данный момент пуст</Alert>
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
      <ModalCard>
        {!eventOneLoading ? (
          eventOne ? (
            <FormEvent onSubmit={onSubmit} event={eventOne} isEdit={isEdit} />
          ) : (
            <Alert severity="info">Евент не загрузился</Alert>
          )
        ) : (
          <SkeletonCardEdit />
        )}
      </ModalCard>
      <DrawerCard />
    </Container>
  );
};

export default EventList;
