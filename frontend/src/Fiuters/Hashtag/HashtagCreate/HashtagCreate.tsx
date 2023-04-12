import React, { useState } from 'react';
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link } from 'react-router-dom';
import HashtagList from '../HashtagList/HashtagList';

const HashtagCreate = () => {
  const [value, setValue] = useState('');

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
          <Box component="form" sx={{ mt: 3, width: '50%' }}>
            <Grid container sx={{ flexDirection: 'column' }} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Название хэштега"
                  name="hashtag"
                  type="text"
                  autoComplete="current-password"
                  fullWidth
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                />
              </Grid>
              <Grid display="flex" justifyContent="space-between" item>
                <Button variant="contained">Создать</Button>

                <Button component={Link} to={'hashtag_list'} variant="contained">
                  Список
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <HashtagList />
      </Container>
    </Container>
  );
};

export default HashtagCreate;
