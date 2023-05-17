import React, { useState } from 'react';
import { Avatar, Box, Button, Container, Grid, Typography } from '@mui/material';
import CardFavorite from '../components/CardFavorite';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BallotIcon from '@mui/icons-material/Ballot';
const Favorites = () => {
  const [card, setCard] = useState<any[]>([]);

  const addCard = (card: any) => {
    setCard((prev) => [...prev, card]);
  };

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
          <CardFavorite onClick={() => addCard('1')} />
          <CardFavorite onClick={() => addCard('2')} />
          <CardFavorite onClick={() => addCard('3')} />
          <CardFavorite onClick={() => addCard('4')} />
        </Grid>
      </Box>
    </Container>
  );
};

export default Favorites;
