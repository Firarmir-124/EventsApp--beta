import React, { useEffect, useState } from 'react';
import { Alert, CircularProgress, Grid, Pagination, Paper } from '@mui/material';
import CardEventUser from '../components/CardEventUser';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectEventList, selectEventLoading } from '../store/eventSlice';
import { fetchEventList } from '../store/eventThunk';
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
      dispatch(fetchEventList({ page, idHashtag: id }));
    }
  }, [dispatch, page, id]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Grid xs item>
      <Paper sx={{ mb: 1, p: 1 }} elevation={4}>
        <ControlPanel />
      </Paper>
      {!loadingEventList ? (
        events.eventPlanList.length !== 0 ? (
          events.eventPlanList.map((event) => <CardEventUser key={event._id} event={event} />)
        ) : (
          <Alert severity="info">Списка нет</Alert>
        )
      ) : (
        <CircularProgress />
      )}
      <Pagination
        sx={{ mt: '20px' }}
        count={Math.ceil(events.eventPlanListLength / 8)}
        page={page}
        onChange={handleChange}
      />
    </Grid>
  );
};

export default EventListUser;
