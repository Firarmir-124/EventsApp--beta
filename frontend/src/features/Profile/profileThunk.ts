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

interface removeType {
  deleteOne: string | undefined;
  deleteAll: string | undefined;
  deleteSelect: string | undefined;
}

export const removeFavorites = createAsyncThunk<void, removeType>('profile/remove_favorites', async (arg) => {
  let url = `/favorites?deleteOne=${arg.deleteOne}`;

  if (arg.deleteAll) {
    url = `/favorites?deleteAll=${arg.deleteAll}`;
  } else if (arg.deleteSelect) {
    url = `/favorites?deleteSelect=true`;
  }

  await axiosApi.delete(url);
});
