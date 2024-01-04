import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: ''
}

export const searchTermSlice = createSlice({ 
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        clearSearchTerm: (state) => {
            state.searchTerm = '';
        },
    }
})

export const { setSearchTerm, clearSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;