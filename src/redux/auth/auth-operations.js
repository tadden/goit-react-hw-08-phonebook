import * as authAPI from 'services/user-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

const register = createAsyncThunk(
  'auth/register ',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await authAPI.register(credentials);
      authAPI.token.set(user.token);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const logIn = createAsyncThunk(
  'auth/login ',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await authAPI.logIn(credentials);
      authAPI.token.set(user.token);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const logOut = createAsyncThunk(
  'auth/logout ',
  async (credentials, { rejectWithValue }) => {
    try {
      await authAPI.logOut();
      authAPI.token.unset();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      thunkAPI.rejectWithValue();
    }

    authAPI.token.set(persistedToken);

    try {
      const user = authAPI.fetchCurrentUser();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default operations;
