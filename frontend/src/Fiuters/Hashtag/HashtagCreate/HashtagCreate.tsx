import React from 'react';
import { Avatar, Box, Container, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HashtagList from '../HashtagList/HashtagList';
import FormHashtag from '../components/FormHashtag/FormHashtag';
import { useAppDispatch } from '../../../app/hooks';
import { createHashtag, fetchHashtagList } from '../hashtagThunk';
import { HashtagMutation } from '../../../types';

const HashtagCreate = () => {
  const dispatch = useAppDispatch();

  const onSubmit = async (hashtag: HashtagMutation) => {
    await dispatch(createHashtag(hashtag)).unwrap();
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
    </Container>
  );
};

export default HashtagCreate;
