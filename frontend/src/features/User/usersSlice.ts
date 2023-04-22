import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, User, ValidationError } from '../../types';
import { RootState } from '../../app/store';
import { login, logout, register } from './usersThunk';

interface UsersState {
  user: User | null;
  usersList: User[];
  oneUser: User | null;
  getOneLoading: boolean;
  getAllLoading: boolean;
  loginError: GlobalError | null;
  registerError: ValidationError | null;
  loginLoading: boolean;
  registerLoading: boolean;
  deleteOneLoading: boolean;
  editOneLoading: boolean;
  logoutLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  usersList: [],
  oneUser: null,
  loginError: null,
  registerError: null,
  getOneLoading: false,
  getAllLoading: false,
  deleteOneLoading: false,
  editOneLoading: false,
  loginLoading: false,
  registerLoading: false,
  logoutLoading: false,
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
export const selectOneUser = (state: RootState) => state.users.oneUser;
export const selectOneUserLoading = (state: RootState) => state.users.getOneLoading;
export const selectEditOneUserLoading = (state: RootState) => state.users.editOneLoading;
export const selectDeleteOneUserLoading = (state: RootState) => state.users.deleteOneLoading;
export const selectUsersList = (state: RootState) => state.users.usersList;
export const selectUsersListLoading = (state: RootState) => state.users.getAllLoading;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLogoutLoading = (state: RootState) => state.users.logoutLoading;
