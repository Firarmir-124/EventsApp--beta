import { createSlice } from '@reduxjs/toolkit';
import { postRecordUser } from './recordThunk';
import { RootState } from '../../app/store';

interface initialStateType {
  postRecordUserLoading: boolean;
}

const initialState: initialStateType = {
  postRecordUserLoading: false,
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
  },
});

export const recordReducer = recordSlice.reducer;
export const selectPostRecordUserLoading = (state: RootState) => state.record.postRecordUserLoading;
