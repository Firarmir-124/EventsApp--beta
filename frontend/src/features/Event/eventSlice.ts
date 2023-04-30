import { AllEvents, EventListFull, EventOne, TypesCallTable, ValidationError } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createEvent, fetchEventList, fetchEventsAll, fetchOneEvent, removeEvent } from './eventThunk';

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
  cellTable: {
    id: string;
    fullName: string;
    name: string;
    show: boolean;
  }[];
  drawerState: boolean;
  idHashtag: string;
  perPage: number;
  localSettings: TypesCallTable[];
  localSettingsLoading: boolean;
  eventsAll: AllEvents[];
  resetFilter: boolean;
}

const initialState: EventType = {
  eventList: {
    length: 0,
    perPage: 8,
    eventList: [],
    pages: 0,
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
  cellTable: [
    {
      id: '1',
      fullName: 'title',
      name: 'Название',
      show: true,
    },
    {
      id: '2',
      fullName: 'time',
      name: 'Время',
      show: true,
    },
    {
      id: '3',
      name: 'Гости',
      fullName: 'null',
      show: true,
    },
    {
      id: '4',
      fullName: 'speaker',
      name: 'Спикеры',
      show: true,
    },
    {
      id: '5',
      fullName: 'hashtag',
      name: 'Хэштег',
      show: true,
    },
  ],
  drawerState: false,
  idHashtag: '',
  perPage: 0,
  localSettings: [],
  localSettingsLoading: false,
  eventsAll: [],
  resetFilter: false,
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
    toggleShowCellTable: (state, { payload: id }: PayloadAction<string>) => {
      if (state.localSettings.length !== 0) {
        const index = state.localSettings.findIndex((item) => item.id === id);
        state.localSettings[index].show = state.localSettings[index].show !== true;
      } else {
        const index = state.cellTable.findIndex((item) => item.id === id);
        state.cellTable[index].show = state.cellTable[index].show !== true;
      }
    },
    openDrawer: (state) => {
      state.drawerState = true;
    },
    closeDrawer: (state) => {
      state.drawerState = false;
    },
    addIdHashtag: (state, { payload: id }: PayloadAction<string>) => {
      state.idHashtag = id;
    },
    createPerPage: (state, { payload: perPage }: PayloadAction<number>) => {
      state.perPage = perPage;
    },
    getSettingLocal: (state) => {
      const local = localStorage.getItem('setting');

      if (local) {
        state.localSettings = JSON.parse(local);
      }
    },
    saveSettingLocal: (state) => {
      localStorage.setItem(
        'setting',
        JSON.stringify(state.localSettings.length !== 0 ? state.localSettings : state.cellTable),
      );
    },
    resetFilterType: (state, { payload: type }: PayloadAction<boolean>) => {
      state.resetFilter = type;
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

    builder.addCase(fetchEventsAll.pending, (state) => {
      state.localSettingsLoading = true;
    });
    builder.addCase(fetchEventsAll.fulfilled, (state, { payload: eventsAll }) => {
      state.eventsAll = eventsAll;
      state.localSettingsLoading = false;
    });
    builder.addCase(fetchEventsAll.rejected, (state) => {
      state.localSettingsLoading = false;
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
export const {
  openSnackbar,
  openModal,
  closeModal,
  toggleShowCellTable,
  openDrawer,
  closeDrawer,
  createPerPage,
  saveSettingLocal,
  getSettingLocal,
  resetFilterType,
} = eventSlice.actions;

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
export const selectCellTable = (state: RootState) => state.eventReducer.cellTable;
export const selectDrawerState = (state: RootState) => state.eventReducer.drawerState;
export const selectIdHashtag = (state: RootState) => state.eventReducer.idHashtag;
export const selectPerPage = (state: RootState) => state.eventReducer.perPage;
export const selectSettingsLocal = (state: RootState) => state.eventReducer.localSettings;
export const selectEventsAll = (state: RootState) => state.eventReducer.eventsAll;
export const selectSettingsLocalLoading = (state: RootState) => state.eventReducer.localSettingsLoading;
export const selectFilterReset = (state: RootState) => state.eventReducer.resetFilter;
