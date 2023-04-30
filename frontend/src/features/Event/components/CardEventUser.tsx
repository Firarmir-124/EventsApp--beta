import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { EventList } from '../../../types';
import { apiURL } from '../../../constants';
import eventImage from '../../../assests/images/event.png';
import dayjs from 'dayjs';
import { linksStyle } from '../../../components/Layout/Layout';

interface Props {
  event: EventList;
}

const CardEventUser: React.FC<Props> = ({ event }) => {
  let image = eventImage;

  if (event.image) {
    image = apiURL + '/' + event.image;
  }

  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card>
        <Link to={'/full_event/' + event._id}>
          <CardMedia sx={{ height: 300 }} image={image} title="green iguana" />
        </Link>
        <CardContent>
          <Typography
            sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '350px' }}
            variant="h6"
            component="div"
          >
            <Link style={{ ...linksStyle }} to={'/full_event/' + event._id}>
              {event.title}
            </Link>
          </Typography>
          <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
            {dayjs(event.time).format('dddd, MMMM D, YYYY h:mm A')}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardEventUser;
