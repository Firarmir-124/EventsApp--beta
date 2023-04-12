import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axios';
import { EventListType, EventMutation, ValidationError } from '../../types';
import { isAxiosError } from 'axios/index';

export const fetchEventList = createAsyncThunk<EventListType[]>('event/fetch_eventList', async () => {
  const response = await axiosApi.get<EventListType[]>('/eventPlan');
  return response.data;
});

export const createEvent = createAsyncThunk<void, EventMutation, { rejectValue: ValidationError }>(
  'event/create_event',
  async (eventMutation, { rejectWithValue }) => {
    const formData = new FormData();
    const keys = Object.keys(eventMutation) as (keyof EventMutation)[];

    keys.forEach((id) => {
      const value = eventMutation[id];

      if (value !== null) {
        formData.append(id, value);
      }
    });

    try {
      await axiosApi.post<EventMutation>('/eventPlan', formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
    }
  },
);
