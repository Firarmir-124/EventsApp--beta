import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { Alert, CircularProgress, Container, Grid, Pagination, Paper } from '@mui/material';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import HashtagList from '../../Fiuters/Hashtag/HashtagList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectEventList, selectEventLoading } from '../../Fiuters/Event/eventSlice';
import { fetchEventList } from '../../Fiuters/Event/eventThunk';
import CardEvent from '../../Fiuters/Event/components/CardEvent/CardEvent';

const Home = () => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectEventList);
  const loadingEventList = useAppSelector(selectEventLoading);

  useEffect(() => {
    if (page) {
      dispatch(fetchEventList(page));
    }
  }, [dispatch, page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Layout>
      <Container style={{ marginTop: '10px', position: 'relative' }}>
        <Grid container>
          <Grid xs item>
            <Paper sx={{ mb: 1, p: 1 }} elevation={4}>
              <ControlPanel />
            </Paper>
            <Paper sx={{ p: 1 }}>
              {!loadingEventList ? (
                events.eventPlanList.length !== 0 ? (
                  events.eventPlanList.map((event) => <CardEvent key={event._id} event={event} />)
                ) : (
                  <Alert severity="info">Списка нет</Alert>
                )
              ) : (
                <CircularProgress />
              )}
            </Paper>
          </Grid>
          <Grid marginLeft={5} xs={3} item>
            <Paper>
              <HashtagList />
            </Paper>
          </Grid>
        </Grid>
        <Pagination count={Math.ceil(events.eventPlanListLength / 15)} page={page} onChange={handleChange} />
      </Container>
    </Layout>
  );
};

export default Home;
