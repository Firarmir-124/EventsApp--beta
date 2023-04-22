import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Chip, Container, Grid } from '@mui/material';
import HashtagListUser from '../../Fiuters/Hashtag/user/HashtagListUser';
import EventListUser from '../../Fiuters/Event/user/EventListUser';

const Home = () => {
  return (
    <Layout>
      <Container style={{ marginTop: '10px', position: 'relative' }}>
        <Chip sx={{ mb: 2, fontSize: '20px', p: 3 }} label={'Мероприятия'} variant="outlined" color="info" />
        <Grid container>
          <EventListUser />
          <HashtagListUser />
        </Grid>
      </Container>
    </Layout>
  );
};

export default Home;
