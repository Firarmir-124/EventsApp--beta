import React from 'react';
import { Avatar, Box, Container, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import 'easymde/dist/easymde.min.css';
import FormEvent from '../components/FormEvent';
import { EventMutation } from '../../../types';
import { useAppDispatch } from '../../../app/hooks';
import { createEvent } from '../eventThunk';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (event: EventMutation) => {
    await dispatch(createEvent(event)).unwrap();
    navigate('/');
  };
  return (
    <Container>
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Создать мероприятие
        </Typography>
        <FormEvent onSubmit={onSubmit} />
      </Box>
    </Container>
  );
};

export default CreateEvent;
