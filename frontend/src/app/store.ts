import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import { usersReducer } from '../features/User/usersSlice';
import { eventReducer } from '../features/Event/eventSlice';
import { hashtagReducer } from '../features/Hashtag/hashtagSlice';
import { recordReducer } from '../features/Request/recordSlice';
import { profileReducer } from '../features/Profile/profileSlice';
import { commercialLinkReducer } from '../features/CommercialLink/commercialLinkSlice';

const usersPersistConfig = {
  key: 'petProject:users',
  storage,
  whitelist: ['user'],
};

const settingsPersistConfig = {
  key: 'petProject:settings',
  storage,
  whitelist: ['cellTable', 'perPage', 'selectedEventId'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  event: persistReducer(settingsPersistConfig, eventReducer),
  hashtag: hashtagReducer,
  record: recordReducer,
  profile: profileReducer,
  commercialLink: commercialLinkReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
