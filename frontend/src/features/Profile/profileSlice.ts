import { FavoritesType } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { addFavorites, fetchFavorites, removeFavorites, showFavorites } from './profileThunk';

interface ProfileType {
  favoritesList: FavoritesType | null;
  favoritesFetchLoading: boolean;
  addFavoritesLoading: boolean;
  removeFavoritesLoading: boolean;
  showFavoritesLoading: boolean;
}

const initialState: ProfileType = {
  favoritesList: null,
  favoritesFetchLoading: false,
  addFavoritesLoading: false,
  removeFavoritesLoading: false,
  showFavoritesLoading: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state) => {
      state.favoritesFetchLoading = true;
    });
    builder.addCase(fetchFavorites.fulfilled, (state, { payload: favorites }) => {
      state.favoritesFetchLoading = false;
      state.favoritesList = favorites;
    });
    builder.addCase(fetchFavorites.rejected, (state) => {
      state.favoritesFetchLoading = false;
    });

    builder.addCase(addFavorites.pending, (state) => {
      state.addFavoritesLoading = true;
    });
    builder.addCase(addFavorites.fulfilled, (state) => {
      state.addFavoritesLoading = false;
    });
    builder.addCase(addFavorites.rejected, (state) => {
      state.addFavoritesLoading = false;
    });

    builder.addCase(removeFavorites.pending, (state) => {
      state.removeFavoritesLoading = true;
    });
    builder.addCase(removeFavorites.fulfilled, (state) => {
      state.removeFavoritesLoading = false;
    });
    builder.addCase(removeFavorites.rejected, (state) => {
      state.removeFavoritesLoading = false;
    });

    builder.addCase(showFavorites.pending, (state) => {
      state.showFavoritesLoading = true;
    });
    builder.addCase(showFavorites.fulfilled, (state) => {
      state.showFavoritesLoading = false;
    });
    builder.addCase(showFavorites.rejected, (state) => {
      state.showFavoritesLoading = false;
    });
  },
});

export const profileReducer = profileSlice.reducer;

export const selectFavoritesList = (state: RootState) => state.profile.favoritesList;
export const selectFavoritesFetchLoading = (state: RootState) => state.profile.favoritesFetchLoading;
export const selectFavoritesAddLoading = (state: RootState) => state.profile.addFavoritesLoading;
export const selectFavoritesRemoveLoading = (state: RootState) => state.profile.removeFavoritesLoading;
export const selectShowFavoritesLoading = (state: RootState) => state.profile.showFavoritesLoading;
