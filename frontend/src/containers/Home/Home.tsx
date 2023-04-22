import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Container, Grid } from '@mui/material';
import HashtagListUser from '../../Fiuters/Hashtag/user/HashtagListUser';
import EventListUser from '../../Fiuters/Event/user/EventListUser';

const Home = () => {
  return (
    <Layout>
      <Container style={{ marginTop: '10px', position: 'relative' }}>
        <h1>Мероприятия</h1>
        <Grid container>
          <EventListUser />
          <HashtagListUser />
        </Grid>
      </Container>
    </Layout>
  );
};

export default Home;
