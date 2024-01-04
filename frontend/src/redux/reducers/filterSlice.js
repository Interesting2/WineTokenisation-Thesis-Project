
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  maxPrice: 1000,
  brand: 'Any',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setMaxPrice_: (state, action) => {
      state.maxPrice = action.payload;
    },
    setBrand_: (state, action) => {
      state.brand = action.payload;
    },
  },
});

export const { setMaxPrice_, setBrand_ } = filterSlice.actions;

export default filterSlice.reducer;
