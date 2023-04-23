import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { EventList } from '../../../types';
import { apiURL } from '../../../constants';
import eventImage from '../../../assests/images/event.png';
import dayjs from 'dayjs';

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
        <Paper sx={{ background: '#333', px: 2 }}>
          <Typography color="#fff" component="p" variant="h6">
            Дата начала:{' '}
            <Typography color="#1976d2" component="span" variant="h6">
              {dayjs(event.time).format('MM/DD/YYYY')}
            </Typography>
          </Typography>
        </Paper>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button component={Link} to={'/full_event/' + event._id} variant="outlined" size="small">
          Подробнее
        </Button>
        <Chip label={'#' + event.hashtag.name} variant="outlined" color="info" />
      </CardActions>
    </Card>
  );
};

export default CardEventUser;
