import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axios';
import { CommercialLinkTypeMutation, contentLinkType, Link } from '../../types';

export const createCommLink = createAsyncThunk<Link | null, CommercialLinkTypeMutation>(
  'commercialLink/createCommLink',
  async (arg) => {
    const response = await axiosApi.post<Link>('/link', arg);
    const jsn = response.data;

    if (!jsn) {
      throw new Error('not found');
    }

    return jsn;
  },
);

export const fetchEventLink = createAsyncThunk<contentLinkType, string>(
  'commercialLink/fetchLocationLink',
  async (id) => {
    const response = await axiosApi.get<contentLinkType>('/link/event/' + id);
    return response.data;
  },
);
