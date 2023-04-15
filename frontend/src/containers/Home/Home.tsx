import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Container, Grid, Pagination, Paper } from '@mui/material';
import CardEvent from '../../Fiuters/Event/components/CardEvent/CardEvent';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import HashtagList from '../../Fiuters/Hashtag/HashtagList';

const Home = () => {
  return (
    <Layout>
      <Container style={{ marginTop: '10px', position: 'relative' }}>
        <Grid container>
          <Grid xs item>
            <Paper sx={{ mb: 1, p: 1 }} elevation={4}>
              <ControlPanel />
            </Paper>
            <Paper sx={{ p: 1 }}>
              <CardEvent />
              <CardEvent />
              <CardEvent />
            </Paper>
          </Grid>
          <Grid marginLeft={5} xs={3} item>
            <Paper>
              <HashtagList />
            </Paper>
          </Grid>
        </Grid>
        <Pagination sx={{ my: '20px' }} count={10} color="primary" />
      </Container>
    </Layout>
  );
};

export default Home;
