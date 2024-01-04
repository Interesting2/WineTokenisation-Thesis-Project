import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (_, { getState }) => {
    const token = getState().user.token;
    const response = await axios.get('http://localhost:3500/api/listings', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const addListing = createAsyncThunk(
  'listings/addListing',
  async (newListing, { getState }) => {
    const token = getState().user.token;
    const response = await axios.post('http://localhost:3500/api/listings', newListing, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const updateListing = createAsyncThunk(
  'listings/updateListing',
  async ({ index, updatedListing }, { getState }) => {
    const token = getState().user.token;
    const response = await axios.put(`http://localhost:3500/api/listings/${updatedListing._id}`, updatedListing, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { index, updatedListing: response.data };
  }
);

export const removeListing = createAsyncThunk(
  'listings/removeListing',
  async (listingId, { getState }) => {
    const token = getState().user.token;
    await axios.delete(`http://localhost:3500/api/listings/${listingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return listingId;
  }
);

const listingSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addListing.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state[action.payload.index] = action.payload.updatedListing;
      })
      .addCase(removeListing.fulfilled, (state, action) => {
        return state.filter((listing) => listing._id !== action.payload);
      });
  },
});

export const selectListings = (state) => state.listings;

export default listingSlice.reducer;