import { EventListType, EventOne, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface HashtagType {
  hashtagList: EventListType[];
  hashtagCreateLoading: boolean;
  hashtagEditLoading: boolean;
  hashtagRemoveLoading: boolean;
  hashtagOne: EventOne | null;
  hashtagOneLoading: boolean;
  hashtagError: ValidationError | null;
}

const initialState: HashtagType = {
  hashtagList: [],
  hashtagCreateLoading: false,
  hashtagEditLoading: false,
  hashtagRemoveLoading: false,
  hashtagOne: null,
  hashtagOneLoading: false,
  hashtagError: null,
};

const hashtagSlice = createSlice({
  name: 'hashtag',
  initialState,
  reducers: {},
});

export const hashtagReducer = hashtagSlice.reducer;

export const selectHashtagList = (state: RootState) => state.hashtagReducer.hashtagList;
export const selectCreateHashtagLoading = (state: RootState) => state.hashtagReducer.hashtagCreateLoading;
export const selectEditHashtagLoading = (state: RootState) => state.hashtagReducer.hashtagEditLoading;
export const selectRemoveHashtagLoading = (state: RootState) => state.hashtagReducer.hashtagRemoveLoading;
export const selectHashtagOne = (state: RootState) => state.hashtagReducer.hashtagOne;
export const selectHashtagOneLoading = (state: RootState) => state.hashtagReducer.hashtagOneLoading;
export const selectHashtagError = (state: RootState) => state.hashtagReducer.hashtagError;
