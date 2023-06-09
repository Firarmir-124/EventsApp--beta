import { createSlice } from '@reduxjs/toolkit';
import { contentLinkType, Link } from '../../types';
import { RootState } from '../../app/store';
import { createCommLink, fetchEventLink } from './CommercialLinkThunk';

interface commercialLinkType {
  url: Link | null;
  createLinkLoading: boolean;
  fetchEventLinkLoading: boolean;
  listEventLink: contentLinkType;
}

const initialState: commercialLinkType = {
  url: null,
  createLinkLoading: false,
  fetchEventLinkLoading: false,
  listEventLink: {
    event: [],
    description: '',
    user: {
      _id: '',
      displayName: '',
    },
  },
};

const commercialLinkSlice = createSlice({
  name: 'commercialLink',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCommLink.pending, (state) => {
      state.createLinkLoading = true;
    });
    builder.addCase(createCommLink.fulfilled, (state, { payload: link }) => {
      state.createLinkLoading = false;
      state.url = link;
    });
    builder.addCase(createCommLink.rejected, (state) => {
      state.createLinkLoading = false;
    });

    builder.addCase(fetchEventLink.pending, (state) => {
      state.fetchEventLinkLoading = true;
    });
    builder.addCase(fetchEventLink.fulfilled, (state, { payload: locationListLink }) => {
      state.fetchEventLinkLoading = false;
      state.listEventLink = locationListLink;
    });
    builder.addCase(fetchEventLink.rejected, (state) => {
      state.fetchEventLinkLoading = false;
    });
  },
});

export const commercialLinkReducer = commercialLinkSlice.reducer;
export const selectUrl = (state: RootState) => state.commercialLink.url;
export const selectCreateLinkLoading = (state: RootState) => state.commercialLink.createLinkLoading;
export const selectFetchEventLinkLoading = (state: RootState) => state.commercialLink.fetchEventLinkLoading;
export const selectListEventLink = (state: RootState) => state.commercialLink.listEventLink;
