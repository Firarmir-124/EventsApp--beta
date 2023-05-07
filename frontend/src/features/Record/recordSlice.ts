import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {},
});

export const recordReducer = recordSlice.reducer;
