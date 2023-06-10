import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { Alert, Box, Button, Chip, Grid, Paper, Snackbar } from '@mui/material';
import { Link, useLocation, useNavigate, useOutlet } from 'react-router-dom';
import EventList from './admin/EventList';
import TagIcon from '@mui/icons-material/Tag';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addInvite, addUserOnline, addUserOnlineRoom, selectInviteStatus, selectListOnline } from './eventSlice';
import { socket } from '../../socket';
import { selectUser } from '../User/usersSlice';
import UserOnline from './components/UserOnline';

const Event = () => {
  const [pressed, setPressed] = useState(true);
  const [confirmedStatus, setConfirmedStatus] = useState(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(selectInviteStatus);
  const outlet = useOutlet();
  const listOnlineUser = useAppSelector(selectListOnline);
  const [id, setId] = useState('');
  const [close, setClose] = useState(true);
  const location = useLocation();

  useEffect(() => {
    socket.on('connect', () => {
      socket.connected = true;
    });

    socket.on('disconnect', () => {
      socket.connected = false;
    });

    if (location.pathname !== '/event/event_create') {
      setPressed(true);
      if (user) {
        socket.emit('new-user-add', { id: user._id, name: user.displayName });
        socket.emit('exitTheRoom', { userId: user._id });
      }

      socket.on('get-users', (users) => {
        dispatch(addUserOnline(users));
      });
    }

    socket.on('onlineRoom', (msg) => {
      dispatch(addUserOnlineRoom(msg));
    });

    socket.on('add', (msg) => {
      dispatch(addInvite(msg.status));
    });

    socket.on('userId', (msg) => {
      setId(msg);
    });

    socket.on('confirmed', (msg) => {
      setConfirmedStatus(msg.status);
    });
  }, [dispatch, user, location.pathname]);

  useEffect(() => {
    if (confirmedStatus) {
      user && socket.emit('entered-the-room', { userId: user._id });
      setTimeout(() => {
        navigate('event_create');
        setClose(false);
        setConfirmedStatus(false);
      }, 3000);
    }
  }, [confirmedStatus, navigate, user]);

  const addOnline = (socketId: string, userId: string) => {
    if (user) {
      const id = listOnlineUser.find((item) => item.userId === user._id);

      id && socket.emit('add', { socketId, userId, test: id.socketId });
    }
  };

  const joinCreate = () => {
    socket.emit('confirmed', { socketId: id });
    user && socket.emit('entered-the-room', { userId: user._id });
    navigate('event_create');
    socket.on('onlineRoom', (msg) => {
      dispatch(addUserOnlineRoom(msg));
    });
    dispatch(addInvite(false));
  };

  const noJoinCreate = () => {
    dispatch(addInvite(false));
  };

  const enteredTheRoom = () => {
    setPressed(false);
    if (pressed) {
      user && socket.emit('entered-the-room', { userId: user._id });
    }
  };

  return (
    <Layout>
      <Paper sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
        <Chip sx={{ mr: 3 }} label="Список онлайн" variant="outlined" />
        {listOnlineUser.length !== 0 ? (
          user &&
          listOnlineUser
            .filter((id) => id.userId !== user._id)
            .map((item) => (
              <UserOnline key={item.socketId} online={item} addOnline={() => addOnline(item.socketId, item.userId)} />
            ))
        ) : (
          <Alert severity="info">Пользователей нет в сети !</Alert>
        )}
      </Paper>
      <Paper sx={{ p: 1, mt: '10px' }} elevation={3}>
        <Grid container>
          <Grid marginRight="10px" item>
            <Button component={Link} to="/event" variant="contained">
              <FormatListBulletedIcon sx={{ mr: '10px' }} />
              список
            </Button>
          </Grid>

          <Grid marginRight="10px" item>
            <Button onClick={enteredTheRoom} component={Link} to="event_create" variant="contained">
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
          <Grid marginRight="10px" item>
            <Button component={Link} to="list_request" variant="contained">
              <AddAlertIcon sx={{ mr: '10px' }} />
              Список запросов
            </Button>
          </Grid>
        </Grid>

        {status ? (
          <Snackbar
            open={status}
            autoHideDuration={5000}
            onClose={noJoinCreate}
            message="Вас пригласили на совместное создание !"
            action={
              <React.Fragment>
                <Button color="secondary" size="small" onClick={joinCreate}>
                  Присоединиться
                </Button>
              </React.Fragment>
            }
          />
        ) : null}
      </Paper>
      {confirmedStatus && (
        <Snackbar
          open={close}
          message="Участник подтверид участие, Вас перекинет на страницу создание через 3 секунды !"
        />
      )}
      <Box>{outlet ? outlet : <EventList />}</Box>
    </Layout>
  );
};

export default Event;
