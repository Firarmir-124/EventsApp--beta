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
    try {
      await axiosApi.post<HashtagMutation>('/hashtag', hashtagMutation);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
    }
  },
);

export const deleteHashtag = createAsyncThunk<void, string>('hashtag/delete_hashtag', async (id) => {
  await axiosApi.delete('/hashtag/' + id);
});
