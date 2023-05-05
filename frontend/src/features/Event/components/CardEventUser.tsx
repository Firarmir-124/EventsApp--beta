import React from 'react';
import { Card, CardContent, CardMedia, Chip, Grid, IconButton, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { EventList } from '../../../types';
import { apiURL } from '../../../constants';
import eventImage from '../../../assests/images/event.png';
import dayjs from 'dayjs';
import { linksStyle } from '../../../components/Layout/Layout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ru from 'dayjs/locale/ru';

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
      <Card sx={{ position: 'relative', pb: 1 }}>
        <Paper
          sx={{
            background: 'rgb(0 0 0 / 54%)',
            position: 'absolute',
            width: '100%',
            height: '50px',
          }}
        >
          <Grid container display="flex" justifyContent="space-between" alignItems="center" padding="5px">
            <Grid item>
              <Chip
                sx={{ background: '#fff', color: '#000' }}
                size="small"
                label={event.hashtag.name}
                color="primary"
              />
            </Grid>
            <Grid item>
              <IconButton>
                <FavoriteIcon sx={{ color: '#fff' }} />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
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
            {dayjs(event.time).locale(ru).format('dddd, MMMM D, YYYY h:mm A')}
          </Typography>
          <Chip
            sx={{ position: 'absolute', right: 5 }}
            size="small"
            avatar={<RemoveRedEyeIcon color="action" />}
            label={event.viewsCount}
            variant="outlined"
          />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardEventUser;
