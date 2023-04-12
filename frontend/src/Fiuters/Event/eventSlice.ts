import { EventListType, EventOne, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface EventType {
  eventList: EventListType[];
  eventCreateLoading: boolean;
  eventEditLoading: boolean;
  eventRemoveLoading: boolean;
  eventOne: EventOne | null;
  eventOneLoading: boolean;
  eventError: ValidationError | null;
}

const initialState: EventType = {
  eventList: [],
  eventCreateLoading: false,
  eventEditLoading: false,
  eventRemoveLoading: false,
  eventOne: null,
  eventOneLoading: false,
  eventError: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
});

export const eventReducer = eventSlice.reducer;

export const selectEventList = (state: RootState) => state.eventReducer.eventList;
export const selectCreateLoading = (state: RootState) => state.eventReducer.eventCreateLoading;
export const selectEditLoading = (state: RootState) => state.eventReducer.eventEditLoading;
export const selectRemoveLoading = (state: RootState) => state.eventReducer.eventRemoveLoading;
export const selectEventOne = (state: RootState) => state.eventReducer.eventOne;
export const selectEventOneLoading = (state: RootState) => state.eventReducer.eventOneLoading;
export const selectEventError = (state: RootState) => state.eventReducer.eventError;
