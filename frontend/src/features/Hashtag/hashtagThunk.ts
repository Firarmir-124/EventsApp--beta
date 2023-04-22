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

export const fetchOneHashtag = createAsyncThunk<HashtagListType | null, string>(
  'hashtag/fetch_hashtagOne',
  async (id) => {
    const response = await axiosApi.get<HashtagListType | null>('/hashtag/' + id);

    if (!response.data) {
      throw new Error('not found');
    }

    return response.data;
  },
);

interface EditType {
  id: string;
  hashtag: HashtagMutation;
}

export const editHashtag = createAsyncThunk<void, EditType>('hashtag/edit_hashtag', async (arg) => {
  await axiosApi.put('/hashtag/' + arg.id, arg.hashtag);
});

export const deleteHashtag = createAsyncThunk<void, string>('hashtag/delete_hashtag', async (id) => {
  await axiosApi.delete('/hashtag/' + id);
});
