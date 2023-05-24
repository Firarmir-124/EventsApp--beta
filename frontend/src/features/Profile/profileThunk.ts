import { createAsyncThunk } from '@reduxjs/toolkit';
import { FavoritesType } from '../../types';
import axiosApi from '../../axios';

export const fetchFavorites = createAsyncThunk<FavoritesType | null>('profile/fetch_favorites', async () => {
  const response = await axiosApi.get<FavoritesType | null>('/favorites');
  return response.data;
});

export const addFavorites = createAsyncThunk<void, string>('profile/add_favorites', async (id) => {
  await axiosApi.post('/favorites', { event: { list: id } });
});

type removeType =
  | {
      deleteOne: string | undefined;
      deleteAll: string | undefined;
      deleteSelect: boolean | undefined;
    }
  | undefined;

export const removeFavorites = createAsyncThunk<void, removeType>('profile/remove_favorites', async (arg) => {
  let url = '/favorites';

  if (arg) {
    if (arg.deleteSelect) {
      url = `/favorites?deleteSelected=true`;
    } else if (arg.deleteOne) {
      url = `/favorites?deleteOne=${arg.deleteOne}`;
    }
  }

  await axiosApi.delete(url);
});

export const showFavorites = createAsyncThunk<void, string>('profile/show_favorites', async (id) => {
  await axiosApi.patch('/favorites/' + id);
});
