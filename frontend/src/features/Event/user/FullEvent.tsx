import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  CardMedia,
  Alert,
  CircularProgress,
  MenuList,
  Paper,
  IconButton,
} from '@mui/material';
import Layout from '../../../components/Layout/Layout';
import { Link, useNavigate, useOutlet, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { openModal, selectEventOne, selectEventOneLoading } from '../eventSlice';
import { fetchOneEvent } from '../eventThunk';
import dayjs from 'dayjs';
import eventImage from '../../../assests/images/event.png';
import { apiURL } from '../../../constants';
import ru from 'dayjs/locale/ru';
import Divider from '@mui/material/Divider';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import CheckIcon from '@mui/icons-material/Check';
import ReactMarkdown from 'react-markdown';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Record from '../../Record/Record';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import SnackbarCard from '../../../components/SnackbarCard';

const FullEvent = () => {
  const outlet = useOutlet();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const eventOne = useAppSelector(selectEventOne);
  const getLoadingEventOne = useAppSelector(selectEventOneLoading);
  const navigate = useNavigate();

  let image = eventImage;

  if (eventOne && eventOne.image) {
    image = apiURL + '/' + eventOne.image;
  }

  const openModalRecord = () => {
    navigate('record');
    dispatch(openModal());
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchOneEvent(id));
    }
  }, [dispatch, id]);

  return (
    <Layout>
      <Container sx={{ mt: 3 }}>
        <Link to="/">
          <IconButton aria-label="delete">
            <ArrowCircleLeftIcon sx={{ fontSize: '50px' }} />
          </IconButton>
        </Link>
        {outlet ? <Record /> : null}
        {!getLoadingEventOne ? (
          eventOne ? (
            <>
              <Card sx={{ display: 'flex', minHeight: '500px' }}>
                <CardMedia
                  component="img"
                  sx={{ flexGrow: 1, width: '50%' }}
                  image={image}
                  alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                  <CardContent>
                    <Typography sx={{ mb: '10px' }} component="p" variant="h5">
                      Live From Space
                    </Typography>
                    <Box
                      sx={{
                        width: '100px',
                        height: '117px',
                        background: '#cb3032',
                        textAlign: 'center',
                        color: '#fff',
                        borderRadius: '10px',
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: '20px' }} component="p">
                          {dayjs(eventOne.time).locale(ru).format('MMMM')}
                        </Typography>
                        <Typography component="p" sx={{ fontSize: '20px' }}>
                          {dayjs(eventOne.time).locale(ru).format('D')}
                        </Typography>
                      </Box>
                      <Divider />
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: '15px' }} component="p">
                          {dayjs(eventOne.time).locale(ru).format('dddd')}
                        </Typography>
                        <Typography component="p" sx={{ fontSize: '15px' }}>
                          {dayjs(eventOne.time).locale(ru).format('h:mm')}
                        </Typography>
                      </Box>
                      <MenuList sx={{ mt: 5 }}>
                        <MenuItem sx={{ pl: 0 }}>
                          <ListItemIcon>
                            <WatchLaterIcon />
                          </ListItemIcon>
                          <Typography variant="body2" color="text.secondary">
                            Продолжительность: 2 часа 30 минут
                          </Typography>
                        </MenuItem>
                        <MenuItem sx={{ pl: 0 }}>
                          <ListItemIcon>
                            <AddLocationIcon />
                          </ListItemIcon>
                          <Typography variant="body2" color="text.secondary">
                            Кыргызская Государственная Филармония им. Т.Сатылганова
                          </Typography>
                        </MenuItem>
                        <MenuItem sx={{ pl: 0 }}>
                          <ListItemIcon>
                            <RemoveRedEyeIcon />
                          </ListItemIcon>
                          <Typography variant="body2" color="text.secondary">
                            {eventOne.viewsCount}
                          </Typography>
                        </MenuItem>
                      </MenuList>

                      <Button onClick={openModalRecord} sx={{ mt: 5 }} variant="contained" endIcon={<CheckIcon />}>
                        Участвовать
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
              <Paper sx={{ p: 1 }}>
                <Typography sx={{ my: 2, mr: 1 }} component="h1" variant="h4">
                  Информация
                  <Divider light sx={{ mt: 1, background: '#ff6300', width: '100px' }} />
                </Typography>

                <ReactMarkdown>{eventOne.description}</ReactMarkdown>
              </Paper>
            </>
          ) : (
            <Alert severity="info">Контент не подгрузился !</Alert>
          )
        ) : (
          <CircularProgress />
        )}
      </Container>
      <SnackbarCard />
    </Layout>
  );
};

export default FullEvent;
