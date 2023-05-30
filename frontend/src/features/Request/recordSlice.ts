import { createSlice } from '@reduxjs/toolkit';
import { fetchRecordsUser, postRecordUser, publishedRecordUser, removeRecordUser } from './recordThunk';
import { RootState } from '../../app/store';
import { RecordUserList } from '../../types';

interface initialStateType {
  postRecordUserLoading: boolean;
  listRecordsUser: RecordUserList[];
  fetchRecordsUserLoading: boolean;
  removeRecordUserLoading: boolean;
  publishedLoading: boolean;
}

const initialState: initialStateType = {
  postRecordUserLoading: false,
  listRecordsUser: [],
  fetchRecordsUserLoading: false,
  removeRecordUserLoading: false,
  publishedLoading: false,
};

const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postRecordUser.pending, (state) => {
      state.postRecordUserLoading = true;
    });
    builder.addCase(postRecordUser.fulfilled, (state) => {
      state.postRecordUserLoading = false;
    });
    builder.addCase(postRecordUser.rejected, (state) => {
      state.postRecordUserLoading = false;
    });

    builder.addCase(fetchRecordsUser.pending, (state) => {
      state.fetchRecordsUserLoading = true;
    });
    builder.addCase(fetchRecordsUser.fulfilled, (state, { payload: list }) => {
      state.fetchRecordsUserLoading = false;
      state.listRecordsUser = list;
    });
    builder.addCase(fetchRecordsUser.rejected, (state) => {
      state.fetchRecordsUserLoading = false;
    });

    builder.addCase(publishedRecordUser.pending, (state) => {
      state.publishedLoading = true;
    });
    builder.addCase(publishedRecordUser.fulfilled, (state) => {
      state.publishedLoading = false;
    });
    builder.addCase(publishedRecordUser.rejected, (state) => {
      state.publishedLoading = false;
    });

    builder.addCase(removeRecordUser.pending, (state) => {
      state.removeRecordUserLoading = true;
    });
    builder.addCase(removeRecordUser.fulfilled, (state) => {
      state.removeRecordUserLoading = false;
    });
    builder.addCase(removeRecordUser.rejected, (state) => {
      state.removeRecordUserLoading = false;
    });
  },
});

export const recordReducer = recordSlice.reducer;
export const selectPostRecordUserLoading = (state: RootState) => state.record.postRecordUserLoading;
export const selectListRecordsUser = (state: RootState) => state.record.listRecordsUser;
export const selectFetchRecordsUserLoading = (state: RootState) => state.record.fetchRecordsUserLoading;
export const selectRemoveRecordUserLoading = (state: RootState) => state.record.removeRecordUserLoading;
export const selectPublishedLoading = (state: RootState) => state.record.publishedLoading;
