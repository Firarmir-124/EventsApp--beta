import { createAsyncThunk } from '@reduxjs/toolkit';
import { RecordUser, RecordUserList } from '../../types';
import axiosApi from '../../axios';

export const postRecordUser = createAsyncThunk<void, RecordUser>('record/postRecordUser', async (recordMutation) => {
  await axiosApi.post('/userRecord', recordMutation);
});

export const fetchRecordsUser = createAsyncThunk<RecordUserList[]>('record/fetchRecordsUser', async () => {
  const response = await axiosApi.get<RecordUserList[]>('/userRecord');
  return response.data;
});

export const removeRecordUser = createAsyncThunk<void, string>('record/removeRecordUser', async (id) => {
  await axiosApi.delete('/userRecord/' + id);
});
