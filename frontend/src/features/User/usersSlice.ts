import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, User, ValidationError } from '../../types';
import { RootState } from '../../app/store';
import { fetchAlertsUser, login, logout, patchViewed, register } from './usersThunk';

interface UsersState {
  user: User | null;
  usersList: User[];
  loginError: GlobalError | null;
  registerError: ValidationError | null;
  loginLoading: boolean;
  registerLoading: boolean;
  deleteOneLoading: boolean;
  logoutLoading: boolean;
  alertsUser: User | null;
  fetchAlertsUserLoading: boolean;
  patchViewedLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  usersList: [],
  loginError: null,
  registerError: null,
  deleteOneLoading: false,
  loginLoading: false,
  registerLoading: false,
  logoutLoading: false,
  alertsUser: null,
  fetchAlertsUserLoading: false,
  patchViewedLoading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAlertsUser.pending, (state) => {
      state.fetchAlertsUserLoading = true;
    });
    builder.addCase(fetchAlertsUser.fulfilled, (state, { payload: user }) => {
      state.fetchAlertsUserLoading = false;
      state.alertsUser = user;
    });
    builder.addCase(fetchAlertsUser.rejected, (state) => {
      state.fetchAlertsUserLoading = false;
    });

    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, { payload: user }) => {
      state.registerLoading = false;
      state.user = user;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });

    builder.addCase(patchViewed.pending, (state) => {
      state.patchViewedLoading = true;
    });
    builder.addCase(patchViewed.fulfilled, (state) => {
      state.patchViewedLoading = false;
    });
    builder.addCase(patchViewed.rejected, (state) => {
      state.patchViewedLoading = false;
    });

    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const { unsetUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLogoutLoading = (state: RootState) => state.users.logoutLoading;
export const selectAlertsUser = (state: RootState) => state.users.alertsUser;
export const selectFetchAlertsUserLoading = (state: RootState) => state.users.fetchAlertsUserLoading;
export const selectPatchViewedLoading = (state: RootState) => state.users.patchViewedLoading;
