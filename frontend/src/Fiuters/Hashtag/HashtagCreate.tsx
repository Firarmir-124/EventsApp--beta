import React from 'react';
import { Alert, Avatar, Box, Container, Snackbar, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HashtagList from './HashtagList';
import FormHashtag from './components/FormHashtag/FormHashtag';
import { useAppDispatch } from '../../app/hooks';
import { createHashtag, fetchHashtagList } from './hashtagThunk';
import { HashtagMutation } from '../../types';

const HashtagCreate = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = async (hashtag: HashtagMutation) => {
    await dispatch(createHashtag(hashtag)).unwrap();
    setOpen(true);
    await dispatch(fetchHashtagList()).unwrap();
  };

  return (
    <Container>
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
            Создать хэштег
          </Typography>
          <FormHashtag onSubmit={onSubmit} />
        </Box>

        <HashtagList />
      </Container>

      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Хэштег успешно создан !
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HashtagCreate;
