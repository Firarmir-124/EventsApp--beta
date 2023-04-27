import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axios';
import { EventListFull, EventMutation, EventOne, ValidationError } from '../../../types';
import { isAxiosError } from 'axios';

interface eventListType {
  idHashtag: string | undefined;
  page: number;
}

export const fetchEventList = createAsyncThunk<EventListFull, eventListType>('event/fetch_eventList', async (arg) => {
  const response = await axiosApi.get<EventListFull>(
    arg.idHashtag ? '/eventPlan?hashtag=' + arg.idHashtag : '/eventPlan?page=' + arg.page,
  );
  return response.data;
});

export const createEvent = createAsyncThunk<void, EventMutation, { rejectValue: ValidationError }>(
  'event/create_event',
  async (eventMutation, { rejectWithValue }) => {
    const formData = new FormData();
    const keys = Object.keys(eventMutation) as (keyof EventMutation)[];

    keys.forEach((id) => {
      const value = eventMutation[id] as string;

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

interface updateType {
  event: EventMutation;
  id: string;
}

export const updateEvent = createAsyncThunk<void, updateType, { rejectValue: ValidationError }>(
  'event/update_event',
  async (arg, { rejectWithValue }) => {
    const formData = new FormData();
    const keys = Object.keys(arg.event) as (keyof EventMutation)[];

    keys.forEach((id) => {
      const value = arg.event[id] as string;

      if (value !== null) {
        formData.append(id, value);
      }
    });

    try {
      await axiosApi.put<EventMutation>('/eventPlan/' + arg.id, formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
    }
  },
);

export const fetchOneEvent = createAsyncThunk<EventOne | null, string>('event/fetch_eventOne', async (id) => {
  const response = await axiosApi.get<EventOne | null>('/eventPlan/' + id);
  if (!response.data) {
    throw new Error('not found');
  }
  return response.data;
});

export const removeEvent = createAsyncThunk<void, string>('event/remove_event', async (id) => {
  await axiosApi.delete('/eventPlan/' + id);
});