import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Container, Grid, List, ListItemButton, ListItemText, ListSubheader, Paper } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Profile = () => {
  return (
    <Layout>
      <Container sx={{ mt: 2 }}>
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
                <ListItemButton>
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Выбранные мероприятия" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Активные запросы" />
                </ListItemButton>
              </List>
            </Paper>
          </Grid>
          <Grid xs={true} item>
            <Paper sx={{ p: 1 }}>Выбор действий</Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Profile;
