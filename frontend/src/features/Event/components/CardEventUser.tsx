import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { EventList } from '../../../types';
import { apiURL } from '../../../constants';
import eventImage from '../../../assests/images/event.png';

interface Props {
  event: EventList;
}

const CardEventUser: React.FC<Props> = ({ event }) => {
  let image = eventImage;

  if (event.image) {
    image = apiURL + '/' + event.image;
  }

  return (
    <Card sx={{ mb: 5 }}>
      <CardMedia sx={{ height: 400 }} image={image} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Дата начала: {event.time}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={'/full_event/' + 'id'} variant="outlined" size="small">
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardEventUser;
