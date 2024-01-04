import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk('user/fetchUser', async (token) => {
  const response = await axios.get('/api/user', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

// Async thunk to update user data
export const updateUser = createAsyncThunk('user/updateUser', async ({ token, userData }) => {
  const response = await axios.put('/api/user', userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
});

// User slice]
const initialState = {
    user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOut: (state) => null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectUser = (state) => state.user;