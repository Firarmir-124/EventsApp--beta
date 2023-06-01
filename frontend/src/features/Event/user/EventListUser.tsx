import React, { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Container, Grid, Pagination, Paper, Typography } from '@mui/material';
import CardEventUser from '../components/CardEventUser';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { openSnackbar, selectEventList, selectEventLoading } from '../eventSlice';
import { fetchEventList } from '../eventThunk';
import { useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import FilterCard from '../FilterCard/FilterCard';
import { addFavorites } from '../../Profile/profileThunk';
import SnackbarCard from '../../../components/SnackbarCard';

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
            {!loadingEventList ? (
              events.eventList.length !== 0 ? (
                events.eventList.map((event) => (
                  <CardEventUser addEventFavorites={() => addEventFavorites(event._id)} key={event._id} event={event} />
                ))
              ) : (
                <Alert severity="info">Списка нет</Alert>
              )
            ) : (
              <CircularProgress />
            )}
          </Grid>
          <Paper elevation={3} sx={{ width: '350px', p: '10px', ml: '10px' }}>
            <FilterCard />
          </Paper>
        </Box>
        <Pagination sx={{ mt: '20px' }} count={events.pages} page={page} onChange={handleChange} />
      </Container>
      <SnackbarCard />
    </>
  );
};

export default EventListUser;
