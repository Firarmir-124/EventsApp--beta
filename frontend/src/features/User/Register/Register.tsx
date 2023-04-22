import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, CircularProgress, Container, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectRegisterError, selectRegisterLoading } from '../usersSlice';
import { RegisterMutation } from '../../../types';
import { register } from '../usersThunk';
import Layout from '../../../components/Layout/Layout';

const Register = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRegisterLoading);
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    displayName: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <>
      <Layout>
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={submitFormHandler} sx={{ mt: 3, width: '520px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    autoComplete="new-username"
                    fullWidth
                    value={state.email}
                    onChange={inputChangeHandler}
                    error={Boolean(getFieldError('email'))}
                    helperText={getFieldError('email')}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="DisplayName"
                    name="displayName"
                    autoComplete="new-username"
                    fullWidth
                    value={state.displayName}
                    onChange={inputChangeHandler}
                    error={Boolean(getFieldError('displayName'))}
                    helperText={getFieldError('displayName')}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    fullWidth
                    value={state.password}
                    onChange={inputChangeHandler}
                    error={Boolean(getFieldError('password'))}
                    helperText={getFieldError('password')}
                    required
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                {!loading ? 'Sign Up' : <CircularProgress size={27} />}
              </Button>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Link component={RouterLink} to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Layout>
    </>
  );
};

export default Register;
