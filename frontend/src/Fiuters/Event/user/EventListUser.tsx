import React, { useEffect, useState } from 'react';
import { Alert, CircularProgress, Grid, Pagination, Paper } from '@mui/material';
import ControlPanel from '../../../components/ControlPanel/ControlPanel';
import CardEvent from '../components/CardEvent/CardEvent';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectEventList, selectEventLoading } from '../eventSlice';
import { fetchEventList } from '../eventThunk';

const EventListUser = () => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectEventList);
  const loadingEventList = useAppSelector(selectEventLoading);

  useEffect(() => {
    if (page) {
      dispatch(fetchEventList(page));
    }
  }, [dispatch, page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Grid xs item>
      <Paper sx={{ mb: 1, p: 1 }} elevation={4}>
        <ControlPanel />
      </Paper>
      <Paper sx={{ p: 1 }}>
        {!loadingEventList ? (
          events.eventPlanList.length !== 0 ? (
            events.eventPlanList.map((event) => <CardEvent key={event._id} event={event} />)
          ) : (
            <Alert severity="info">Списка нет</Alert>
          )
        ) : (
          <CircularProgress />
        )}
      </Paper>
      <Pagination count={Math.ceil(events.eventPlanListLength / 15)} page={page} onChange={handleChange} />
    </Grid>
  );
};

export default EventListUser;
