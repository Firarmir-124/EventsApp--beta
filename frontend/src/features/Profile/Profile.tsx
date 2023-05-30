import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import {
  Badge,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link, useOutlet } from 'react-router-dom';
import Favorites from './Favorites/Favorites';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import MailIcon from '@mui/icons-material/Mail';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAlertsUser, selectFetchAlertsUserLoading } from '../User/usersSlice';
import { fetchAlertsUser } from '../User/usersThunk';

const Profile = () => {
  const outlet = useOutlet();
  const dispatch = useAppDispatch();
  const alertUser = useAppSelector(selectAlertsUser);
  const loading = useAppSelector(selectFetchAlertsUserLoading);

  useEffect(() => {
    dispatch(fetchAlertsUser());
  }, [dispatch]);

  return (
    <Layout>
      <Container sx={{ mt: 2 }}>
        <Link to="/">
          <IconButton aria-label="delete">
            <ArrowCircleLeftIcon sx={{ fontSize: '50px' }} />
          </IconButton>
        </Link>
        <Grid container>
          <Grid xs={3} marginRight="20px" item>
            <Paper elevation={3}>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Меню
                  </ListSubheader>
                }
              >
                <ListItemButton component={Link} to="favorite">
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Выбранные мероприятия" />
                </ListItemButton>
                <ListItemButton component={Link} to="request">
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Активные запросы" />
                </ListItemButton>
                <ListItemButton component={Link} to="alert">
                  <ListItemIcon>
                    {!loading ? (
                      <Badge
                        badgeContent={alertUser ? alertUser.alert.filter((item) => !item.viewed).length : 0}
                        color="primary"
                      >
                        <MailIcon color="action" />
                      </Badge>
                    ) : (
                      <CircularProgress />
                    )}
                  </ListItemIcon>
                  <ListItemText primary="Оповещения" />
                </ListItemButton>
              </List>
            </Paper>
          </Grid>
          <Grid xs={true} item>
            <Paper sx={{ p: 1 }}>{outlet ? outlet : <Favorites />}</Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Profile;
