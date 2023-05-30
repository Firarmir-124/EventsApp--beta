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

interface publishedType {
  id: string;
  query: boolean;
  userId: string;
  eventId: string;
}

export const publishedRecordUser = createAsyncThunk<void, publishedType>('record/publishedRecordUser', async (arg) => {
  let url = `/userRecord/${arg.id}/isPublished`;

  if (arg.query) {
    url = `/userRecord/${arg.id}/isPublished?close=${arg.query}`;
  }

  await axiosApi.patch(url, { idUser: arg.userId, idEvent: arg.eventId });
});

export const removeRecordUser = createAsyncThunk<void, string>('record/removeRecordUser', async (id) => {
  await axiosApi.delete('/userRecord/' + id);
});
