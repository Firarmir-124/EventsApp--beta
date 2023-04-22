import React from 'react';
import { Box, Button, Card, CardActions, CardContent, Container, Paper, Typography, Avatar, Chip } from '@mui/material';
import Layout from '../../../components/Layout/Layout';
import GoogleMapReact from 'google-map-react';
import ContactUs from '../../../components/ContactUs/ContactUs';

const FullEvent = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <Layout>
      <Container>
        <Card sx={{ mb: 1 }}>
          <CardContent>
            <Paper elevation={3} sx={{ background: '#1976d2', color: '#fff', p: 1, my: 1 }}>
              <Typography variant="h6" component="p">
                Место проведения события
              </Typography>
            </Paper>
            <Box style={{ height: '500px', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: '' }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              ></GoogleMapReact>
            </Box>
            <Paper elevation={3} sx={{ background: '#1976d2', color: '#fff', p: 1, my: 1 }}>
              <Typography variant="h6" component="p">
                Время проведения мероприятия
              </Typography>
            </Paper>
            <Paper sx={{ background: '#333', display: 'flex', justifyContent: 'space-between', px: 2 }}>
              <Box sx={{ display: 'flex' }}>
                <Typography color="#1976d2" component="p" variant="h1">
                  18:
                </Typography>
                <Typography color="white" component="p" variant="h1">
                  00
                </Typography>
              </Box>
              <Typography color="#1976d2" component="p" variant="h1">
                В четверг
              </Typography>
            </Paper>
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
      </Container>
    </Layout>
  );
};

export default FullEvent;
