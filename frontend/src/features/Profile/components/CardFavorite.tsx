import React from 'react';
import { Card, CardMedia, Checkbox, Chip, Grid, IconButton, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import eventImage from '../../../assests/images/event.png';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  onClick: React.MouseEventHandler;
}

const CardFavorite: React.FC<Props> = ({ onClick }) => {
  const image = eventImage;

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
                label="Навзаниевапвапвапвапвап"
                color="primary"
              />
            </Grid>
            <Grid item>
              <IconButton>
                <DeleteIcon sx={{ color: '#fff' }} />
              </IconButton>
            </Grid>
            <Grid item>
              <Checkbox
                onClick={onClick}
                sx={{ color: '#fff' }}
                color="default"
                {...{ inputProps: { 'aria-label': 'Checkbox demo' } }}
              />
            </Grid>
          </Grid>
        </Paper>
        <Link to={'/full_event/' + '123'}>
          <CardMedia sx={{ height: 200 }} image={image} title="green iguana" />
        </Link>
      </Card>
    </Grid>
  );
};

export default CardFavorite;
