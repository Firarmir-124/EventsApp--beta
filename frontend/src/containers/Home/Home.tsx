import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Container, Grid, List, Pagination, Paper } from '@mui/material';
import CardEvent from '../../Fiuters/Event/components/CardEvent/CardEvent';
import CardHashtag from '../../Fiuters/Hashtag/components/CardHashtag/CardHashtag';
import ControlPanel from '../../components/ControlPanel/ControlPanel';

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
              <List component="nav">
                <CardHashtag />
                <CardHashtag />
                <CardHashtag />
              </List>
            </Paper>
          </Grid>
        </Grid>
        <Pagination sx={{ my: '20px' }} count={10} color="primary" />
      </Container>
    </Layout>
  );
};

export default Home;
