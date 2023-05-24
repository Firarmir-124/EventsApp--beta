import { createAsyncThunk } from '@reduxjs/toolkit';
import { RecordUser } from '../../types';
import axiosApi from '../../axios';

export const postRecordUser = createAsyncThunk<void, RecordUser>('record/postRecordUser', async (recordMutation) => {
  await axiosApi.post('/userRecord', recordMutation);
});
