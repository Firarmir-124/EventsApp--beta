import React, { useEffect, useState } from 'react';
import { Alert, Box, Container, Grid, Pagination, Paper, Typography } from '@mui/material';
import CardEventUser from '../components/CardEventUser';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { openSnackbar, selectEventList, selectEventLoading } from '../eventSlice';
import { fetchEventList } from '../eventThunk';
import { useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import FilterCard from '../components/FilterCard';
import { addFavorites } from '../../Profile/profileThunk';
import SnackbarCard from '../../../components/SnackbarCard';
import SkeletonCardUser from '../components/SkeletonCardUser';

const EventListUser = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectEventList);
  const loadingEventList = useAppSelector(selectEventLoading);

  useEffect(() => {
    if (page) {
      dispatch(fetchEventList({ page, perPage: events.perPage }));
    }
  }, [dispatch, page, id, events.perPage]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const addEventFavorites = async (id: string) => {
    await dispatch(addFavorites(id)).unwrap();
    dispatch(openSnackbar({ status: true, parameter: 'add_favorites' }));
  };

  return (
    <>
      <Container>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ my: 2, mr: 1 }} component="h1" variant="h4">
            Мероприятия
            <Divider light sx={{ mt: 1, background: '#ff6300' }} />
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {events.eventList.length !== 0 ? (
              events.eventList.map((event) =>
                !loadingEventList ? (
                  <CardEventUser addEventFavorites={() => addEventFavorites(event._id)} key={event._id} event={event} />
                ) : (
                  <SkeletonCardUser key={event._id} />
                ),
              )
            ) : (
              <Grid item xs={12}>
                <Alert severity="info">В данный момент список пуст</Alert>
              </Grid>
            )}
          </Grid>
          <Paper elevation={3} sx={{ width: '350px', p: '10px', ml: '10px' }}>
            <FilterCard />
          </Paper>
        </Box>
        <Pagination shape="rounded" sx={{ mt: '20px' }} count={events.pages} page={page} onChange={handleChange} />
      </Container>
      <SnackbarCard />
    </>
  );
};

export default EventListUser;
