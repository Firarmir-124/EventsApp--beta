import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Box, Button, Grid, Paper } from '@mui/material';
import { Link, useOutlet } from 'react-router-dom';
import EventList from './EventList/EventList';
import { functionListEventUser } from '../../constants';

const Event = () => {
  const outlet = useOutlet();

  return (
    <Layout>
      <Paper sx={{ p: 1, mt: '10px' }} elevation={3}>
        <Grid container>
          {functionListEventUser.map((item) => (
            <Grid marginRight="10px" key={item.name} item>
              <Button component={Link} to={item.link} variant="contained">
                {item.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box>{outlet ? outlet : <EventList />}</Box>
    </Layout>
  );
};

export default Event;
