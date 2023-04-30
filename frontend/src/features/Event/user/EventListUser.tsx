import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Typography,
} from '@mui/material';
import CardEventUser from '../components/CardEventUser';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  resetFilterType,
  selectEventList,
  selectEventLoading,
  selectFilterReset,
  selectObjFilterU,
} from '../eventSlice';
import { fetchEventList } from '../eventThunk';
import { useParams } from 'react-router-dom';
import FilterUser from './FilterUser';
import FilterHashtag from './FilterHashtag';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const EventListUser = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectEventList);
  const loadingEventList = useAppSelector(selectEventLoading);
  const objFilterU = useAppSelector(selectObjFilterU);
  const resetFilter = useAppSelector(selectFilterReset);

  useEffect(() => {
    if (page) {
      dispatch(fetchEventList({ page, perPage: events.perPage }));
    }
  }, [dispatch, page, id, events.perPage]);

  useEffect(() => {
    if (objFilterU.date !== null || objFilterU.hashtag !== null) {
      dispatch(fetchEventList({ filterU: JSON.stringify(objFilterU) }));
    }
  }, [dispatch, objFilterU]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const toResetFilter = async () => {
    dispatch(resetFilterType(false));
    await dispatch(fetchEventList({ page: 0, perPage: 0 }));
  };

  return (
    <>
      <Container sx={{ my: 2 }} maxWidth={false}>
        <Paper elevation={3}>
          <FilterUser />
        </Paper>
      </Container>
      <Container>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ my: 2, mr: 1 }} component="h1" variant="h4">
            Мероприятия
          </Typography>
          <FilterHashtag />
          {resetFilter && (
            <IconButton onClick={toResetFilter}>
              <RestartAltIcon />
            </IconButton>
          )}
        </Box>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {!loadingEventList ? (
            events.eventList.length !== 0 ? (
              events.eventList.map((event) => <CardEventUser key={event._id} event={event} />)
            ) : (
              <Alert severity="info">Списка нет</Alert>
            )
          ) : (
            <CircularProgress />
          )}
        </Grid>
        <Pagination sx={{ mt: '20px' }} count={events.pages} page={page} onChange={handleChange} />
      </Container>
    </>
  );
};

export default EventListUser;
