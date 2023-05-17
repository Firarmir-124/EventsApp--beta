import React, { useEffect } from 'react';
import { Alert, Avatar, Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import CardFavorite from '../components/CardFavorite';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BallotIcon from '@mui/icons-material/Ballot';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectFavoritesFetchLoading, selectFavoritesList } from '../profileSlice';
import { fetchFavorites } from '../profileThunk';
const Favorites = () => {
  const dispatch = useAppDispatch();
  const favoritesList = useAppSelector(selectFavoritesList);
  const loadingFavoritesList = useAppSelector(selectFavoritesFetchLoading);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  console.log(favoritesList);

  return (
    <Container>
      <Button variant="outlined" startIcon={<BallotIcon />}>
        Удалить
      </Button>
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ mb: 1, bgcolor: 'secondary.main' }}>
          <FavoriteIcon />
        </Avatar>
        <Typography sx={{ mb: 2 }} component="h1" variant="h5">
          Избранное
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {favoritesList ? (
            !loadingFavoritesList ? (
              favoritesList.event.map((event) => <CardFavorite key={event._id} event={event} />)
            ) : (
              <CircularProgress />
            )
          ) : (
            <Alert severity="info">Список пуст</Alert>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Favorites;
