import React, { useEffect, useState } from 'react';
import { Alert, CircularProgress, Grid, Pagination, Paper } from '@mui/material';
import CardEventUser from '../components/CardEventUser';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectEventList, selectEventLoading } from '../eventSlice';
import { fetchEventList } from '../eventThunk';
import ControlPanel from '../components/ControlPanel';
import { useParams } from 'react-router-dom';

const EventListUser = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectEventList);
  const loadingEventList = useAppSelector(selectEventLoading);

  useEffect(() => {
    if (page) {
      dispatch(fetchEventList({ page, perPage: events.perPage, filter: null }));
    }
  }, [dispatch, page, id, events.perPage]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Grid xs item>
      <Paper sx={{ mb: 1, p: 1 }} elevation={4}>
        <ControlPanel />
      </Paper>
      {!loadingEventList ? (
        events.eventList.length !== 0 ? (
          events.eventList.map((event) => <CardEventUser key={event._id} event={event} />)
        ) : (
          <Alert severity="info">Списка нет</Alert>
        )
      ) : (
        <CircularProgress />
      )}
      <Pagination sx={{ mt: '20px' }} count={events.pages} page={page} onChange={handleChange} />
    </Grid>
  );
};

export default EventListUser;
