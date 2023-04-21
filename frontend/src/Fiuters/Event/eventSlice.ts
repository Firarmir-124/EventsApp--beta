import { EventListFull, EventOne, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createEvent, fetchEventList } from './ecentThunk';

interface EventType {
  eventList: EventListFull;
  eventListLoading: boolean;
  eventCreateLoading: boolean;
  eventEditLoading: boolean;
  eventRemoveLoading: boolean;
  eventOne: EventOne | null;
  eventOneLoading: boolean;
  eventError: ValidationError | null;
}

const initialState: EventType = {
  eventList: {
    eventPlanListLength: 0,
    eventPlanList: [],
  },
  eventListLoading: false,
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
  extraReducers: (builder) => {
    builder.addCase(fetchEventList.pending, (state) => {
      state.eventListLoading = true;
    });
    builder.addCase(fetchEventList.fulfilled, (state, { payload: eventList }) => {
      state.eventListLoading = false;
      state.eventList = eventList;
    });
    builder.addCase(fetchEventList.rejected, (state) => {
      state.eventListLoading = false;
    });

    builder.addCase(createEvent.pending, (state) => {
      state.eventCreateLoading = true;
    });
    builder.addCase(createEvent.fulfilled, (state) => {
      state.eventCreateLoading = false;
    });
    builder.addCase(createEvent.rejected, (state) => {
      state.eventCreateLoading = false;
    });
  },
});

export const eventReducer = eventSlice.reducer;

export const selectEventList = (state: RootState) => state.eventReducer.eventList;
export const selectCreateLoading = (state: RootState) => state.eventReducer.eventCreateLoading;
export const selectEditLoading = (state: RootState) => state.eventReducer.eventEditLoading;
export const selectRemoveLoading = (state: RootState) => state.eventReducer.eventRemoveLoading;
export const selectEventOne = (state: RootState) => state.eventReducer.eventOne;
export const selectEventOneLoading = (state: RootState) => state.eventReducer.eventOneLoading;
export const selectEventError = (state: RootState) => state.eventReducer.eventError;
export const selectEventLoading = (state: RootState) => state.eventReducer.eventListLoading;
