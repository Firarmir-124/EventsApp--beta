import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Paper,
  Typography,
  Avatar,
  Chip,
  CardMedia,
  Alert,
  CircularProgress,
} from '@mui/material';
import Layout from '../../../components/Layout/Layout';
import ContactUs from '../components/ContactUs';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectEventOne, selectEventOneLoading } from '../eventSlice';
import { fetchOneEvent } from '../eventThunk';
import dayjs from 'dayjs';
import eventImage from '../../../assests/images/event.png';
import { apiURL } from '../../../constants';
import ReactMarkdown from 'react-markdown';

const FullEvent = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const eventOne = useAppSelector(selectEventOne);
  const getLoadingEventOne = useAppSelector(selectEventOneLoading);

  let image = eventImage;

  if (eventOne && eventOne.image) {
    image = apiURL + '/' + eventOne.image;
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchOneEvent(id));
    }
  }, [dispatch, id]);

  return (
    <Layout>
      <Container>
        {!getLoadingEventOne ? (
          eventOne ? (
            <Card sx={{ mb: 1 }}>
              <CardContent>
                <CardMedia component="img" height="500" image={image} alt="Paella dish" />
                <Paper elevation={3} sx={{ background: '#1976d2', color: '#fff', p: 1, my: 1 }}>
                  <Typography variant="h6" component="p">
                    Время проведения мероприятия
                  </Typography>
                </Paper>
                <Paper sx={{ background: '#333', display: 'flex', justifyContent: 'space-between', px: 2 }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography color="#1976d2" component="p" variant="h1">
                      {dayjs(eventOne.time).format('DD')}
                    </Typography>
                    <Typography color="#1976d2" component="p" variant="h5">
                      числа в
                    </Typography>
                    <Typography color="#1976d2" component="p" variant="h1">
                      {dayjs(eventOne.time).format('h')}:
                    </Typography>
                    <Typography color="white" component="p" variant="h1">
                      {dayjs(eventOne.time).format('mm')}
                    </Typography>
                  </Box>
                  <Typography color="#1976d2" component="p" variant="h1">
                    {dayjs(eventOne.time).format('MMMM')}
                  </Typography>
                </Paper>
                <Paper elevation={3} sx={{ background: '#1976d2', color: '#fff', p: 1, my: 1 }}>
                  <Typography variant="h6" component="p">
                    Общая информация
                  </Typography>
                </Paper>
                <ReactMarkdown>{eventOne.description}</ReactMarkdown>
                <Paper elevation={3} sx={{ background: '#1976d2', color: '#fff', p: 1, my: 1 }}>
                  <Typography variant="h6" component="p">
                    Контактная информация
                  </Typography>
                </Paper>
                <ContactUs />
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained">Подтвердить своё участие !</Button>
                <Chip avatar={<Avatar>#</Avatar>} label="55" />
              </CardActions>
            </Card>
          ) : (
            <Alert severity="info">Контент не подгрузился !</Alert>
          )
        ) : (
          <CircularProgress />
        )}
      </Container>
    </Layout>
  );
};

export default FullEvent;
