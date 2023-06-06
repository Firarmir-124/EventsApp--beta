import { createSlice } from '@reduxjs/toolkit';
import { Link } from '../../types';
import { RootState } from '../../app/store';
import { createCommLink } from './CommercialLinkThunk';

interface commercialLinkType {
  url: Link | null;
  createLinkLoading: boolean;
}

const initialState: commercialLinkType = {
  url: null,
  createLinkLoading: false,
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
  },
});

export const commercialLinkReducer = commercialLinkSlice.reducer;
export const selectUrl = (state: RootState) => state.commercialLink.url;
export const selectCreateLinkLoading = (state: RootState) => state.commercialLink.createLinkLoading;
