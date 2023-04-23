import { EventListFull, EventOne, ValidationError } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createEvent, fetchEventList, fetchOneEvent, removeEvent } from './eventThunk';

interface EventType {
  eventList: EventListFull;
  eventListLoading: boolean;
  eventCreateLoading: boolean;
  eventEditLoading: boolean;
  eventRemoveLoading: boolean;
  eventOne: EventOne | null;
  eventOneLoading: boolean;
  eventError: ValidationError | null;
  snackbar: {
    status: boolean;
    parameter: string;
  };
  modal: boolean;
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
  snackbar: {
    status: false,
    parameter: '',
  },
  modal: false,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    openSnackbar: (state, { payload: obj }: PayloadAction<{ status: boolean; parameter: string }>) => {
      state.snackbar = obj;
    },
    openModal: (state) => {
      state.modal = true;
    },
    closeModal: (state) => {
      state.modal = false;
    },
  },
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

    builder.addCase(fetchOneEvent.pending, (state) => {
      state.eventOneLoading = true;
      state.eventOne = null;
    });
    builder.addCase(fetchOneEvent.fulfilled, (state, { payload: eventOne }) => {
      state.eventOneLoading = false;
      state.eventOne = eventOne;
    });
    builder.addCase(fetchOneEvent.rejected, (state) => {
      state.eventOneLoading = false;
    });

    builder.addCase(removeEvent.pending, (state) => {
      state.eventRemoveLoading = true;
    });
    builder.addCase(removeEvent.fulfilled, (state) => {
      state.eventRemoveLoading = false;
    });
    builder.addCase(removeEvent.rejected, (state) => {
      state.eventRemoveLoading = false;
    });
  },
});

export const eventReducer = eventSlice.reducer;
export const { openSnackbar, openModal, closeModal } = eventSlice.actions;

export const selectEventList = (state: RootState) => state.eventReducer.eventList;
export const selectCreateEventLoading = (state: RootState) => state.eventReducer.eventCreateLoading;
export const selectEditLoading = (state: RootState) => state.eventReducer.eventEditLoading;
export const selectRemoveEventLoading = (state: RootState) => state.eventReducer.eventRemoveLoading;
export const selectEventOne = (state: RootState) => state.eventReducer.eventOne;
export const selectEventOneLoading = (state: RootState) => state.eventReducer.eventOneLoading;
export const selectEventError = (state: RootState) => state.eventReducer.eventError;
export const selectEventLoading = (state: RootState) => state.eventReducer.eventListLoading;
export const selectSnackbarState = (state: RootState) => state.eventReducer.snackbar;
export const selectModal = (state: RootState) => state.eventReducer.modal;
