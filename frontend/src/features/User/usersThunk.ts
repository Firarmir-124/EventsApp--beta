import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, RegisterMutation, ValidationError, RegisterResponse, LoginMutation, GlobalError } from '../../types';
import axiosApi from '../../axios';
import { isAxiosError } from 'axios';
import { unsetUser } from './usersSlice';

export const fetchAlertsUser = createAsyncThunk<User | null>('users/fetchAlertsUser', async () => {
  const response = await axiosApi.get('/users');
  return response.data;
});

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
  'users/register',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users', registerMutation);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError }>(
  'users/login',
  async (LoginMutation, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/sessions', LoginMutation);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  },
);

export const logout = createAsyncThunk('users/logout', async (_, { dispatch }) => {
  await axiosApi.delete('/users/sessions');
  dispatch(unsetUser());
});
