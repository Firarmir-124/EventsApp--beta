import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axios';
import { HashtagListType, HashtagMutation, ValidationError } from '../../types';
import { isAxiosError } from 'axios';

export const fetchHashtagList = createAsyncThunk<HashtagListType[]>('hashtag/fetch_hashtagList', async () => {
  const response = await axiosApi.get<HashtagListType[]>('/hashtag');
  return response.data;
});

export const createHashtag = createAsyncThunk<void, HashtagMutation, { rejectValue: ValidationError }>(
  'hashtag/create_hashtag',
  async (hashtagMutation, { rejectWithValue }) => {
    const formData = new FormData();
    const keys = Object.keys(hashtagMutation) as (keyof HashtagMutation)[];

    keys.forEach((id) => {
      const value = hashtagMutation[id];

      if (value !== null) {
        formData.append(id, value);
      }
    });

    try {
      await axiosApi.post<HashtagMutation>('/hashtag', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
    }
  },
);
