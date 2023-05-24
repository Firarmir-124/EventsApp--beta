import React from 'react';
import { Card, CardMedia, Checkbox, Chip, Grid, IconButton, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import eventImage from '../../../assests/images/event.png';
import DeleteIcon from '@mui/icons-material/Delete';
import { EventFavoritesType } from '../../../types';
import { apiURL } from '../../../constants';

interface Props {
  event: EventFavoritesType;
  removeOneCard: React.MouseEventHandler;
  showFavoritesCard: React.MouseEventHandler;
}

const CardFavorite: React.FC<Props> = ({ event, removeOneCard, showFavoritesCard }) => {
  let image = eventImage;

  if (event.list.image) {
    image = apiURL + '/' + event.list.image;
  }

  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card sx={{ position: 'relative' }}>
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
                sx={{
                  background: '#fff',
                  color: '#000',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  width: '100px',
                }}
                size="small"
                label={event.list.title}
                color="primary"
              />
            </Grid>
            <Grid item>
              <IconButton onClick={removeOneCard}>
                <DeleteIcon sx={{ color: '#fff' }} />
              </IconButton>
            </Grid>
            <Grid item>
              <Checkbox onClick={showFavoritesCard} sx={{ color: '#fff' }} color="default" checked={event.show} />
            </Grid>
          </Grid>
        </Paper>
        <Link to={'/full_event/' + event.list._id}>
          <CardMedia sx={{ height: 200 }} image={image} title="green iguana" />
        </Link>
      </Card>
    </Grid>
  );
};

export default CardFavorite;
