import { GlobalError, HashtagListType, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { deleteHashtag, editHashtag, fetchHashtagList, fetchOneHashtag } from './hashtagThunk';

interface HashtagType {
  hashtagList: HashtagListType[];
  hashtagListLoading: boolean;
  hashtagCreateLoading: boolean;
  hashtagEditLoading: boolean;
  hashtagRemoveLoading: boolean;
  hashtagOne: HashtagListType | null;
  hashtagOneLoading: boolean;
  hashtagError: ValidationError | null;
  hashtagErrorRemove: GlobalError | null;
}

const initialState: HashtagType = {
  hashtagList: [],
  hashtagListLoading: false,
  hashtagCreateLoading: false,
  hashtagEditLoading: false,
  hashtagRemoveLoading: false,
  hashtagOne: null,
  hashtagOneLoading: false,
  hashtagError: null,
  hashtagErrorRemove: null,
};

const hashtagSlice = createSlice({
  name: 'hashtag',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHashtagList.pending, (state) => {
      state.hashtagListLoading = true;
    });
    builder.addCase(fetchHashtagList.fulfilled, (state, { payload: hashtagList }) => {
      state.hashtagListLoading = false;
      state.hashtagList = hashtagList;
      state.hashtagErrorRemove = null;
    });
    builder.addCase(fetchHashtagList.rejected, (state) => {
      state.hashtagListLoading = false;
    });

    builder.addCase(deleteHashtag.pending, (state) => {
      state.hashtagRemoveLoading = true;
    });
    builder.addCase(deleteHashtag.fulfilled, (state) => {
      state.hashtagRemoveLoading = false;
    });
    builder.addCase(deleteHashtag.rejected, (state, { payload: error }) => {
      state.hashtagRemoveLoading = false;
      state.hashtagErrorRemove = error || null;
    });

    builder.addCase(fetchOneHashtag.pending, (state) => {
      state.hashtagOneLoading = true;
      state.hashtagOne = null;
    });
    builder.addCase(fetchOneHashtag.fulfilled, (state, { payload: hashtag }) => {
      state.hashtagOneLoading = false;
      state.hashtagOne = hashtag;
    });
    builder.addCase(fetchOneHashtag.rejected, (state) => {
      state.hashtagOneLoading = false;
    });

    builder.addCase(editHashtag.pending, (state) => {
      state.hashtagEditLoading = true;
    });
    builder.addCase(editHashtag.fulfilled, (state) => {
      state.hashtagEditLoading = false;
    });
    builder.addCase(editHashtag.rejected, (state) => {
      state.hashtagEditLoading = false;
    });
  },
});

export const hashtagReducer = hashtagSlice.reducer;

export const selectHashtagList = (state: RootState) => state.hashtag.hashtagList;
export const selectCreateHashtagLoading = (state: RootState) => state.hashtag.hashtagCreateLoading;
export const selectEditHashtagLoading = (state: RootState) => state.hashtag.hashtagEditLoading;
export const selectRemoveHashtagLoading = (state: RootState) => state.hashtag.hashtagRemoveLoading;
export const selectHashtagOne = (state: RootState) => state.hashtag.hashtagOne;
export const selectHashtagOneLoading = (state: RootState) => state.hashtag.hashtagOneLoading;
export const selectHashtagError = (state: RootState) => state.hashtag.hashtagError;
export const selectHashtagListLoading = (state: RootState) => state.hashtag.hashtagListLoading;
export const selectHashtagErrorError = (state: RootState) => state.hashtag.hashtagErrorRemove;
