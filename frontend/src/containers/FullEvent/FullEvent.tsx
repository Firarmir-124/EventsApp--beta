import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

const FullEvent = () => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardMedia
        sx={{ height: 500 }}
        image="https://www.goodnewsfinland.com/dam/jcr:21869ba0-942b-4be5-81fc-e5b663a32027/event-management_2000x1125-1076535.jpeg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
          except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small">
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};

export default FullEvent;
