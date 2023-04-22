import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Box, Button, Grid, Paper } from '@mui/material';
import { Link, useOutlet } from 'react-router-dom';
import EventList from './admin/EventList';
import TagIcon from '@mui/icons-material/Tag';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const Event = () => {
  const outlet = useOutlet();

  return (
    <Layout>
      <Paper sx={{ p: 1, mt: '10px' }} elevation={3}>
        <Grid container>
          <Grid marginRight="10px" item>
            <Button component={Link} to="/event" variant="contained">
              <FormatListBulletedIcon sx={{ mr: '10px' }} />
              список
            </Button>
          </Grid>

          <Grid marginRight="10px" item>
            <Button component={Link} to="event_create" variant="contained">
              <AddIcon sx={{ mr: '10px' }} />
              Создать
            </Button>
          </Grid>

          <Grid marginRight="10px" item>
            <Button component={Link} to="hashtag_create" variant="contained">
              <TagIcon sx={{ mr: '10px' }} />
              Создать хэштег
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box>{outlet ? outlet : <EventList />}</Box>
    </Layout>
  );
};

export default Event;
