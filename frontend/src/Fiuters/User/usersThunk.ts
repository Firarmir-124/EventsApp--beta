import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, RegisterMutation, ValidationError, RegisterResponse, LoginMutation, GlobalError } from '../../types';
import axiosApi from '../../axios';
import { isAxiosError } from 'axios';

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
