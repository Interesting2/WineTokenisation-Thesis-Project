import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedItem: null
}

export const selectedItemSlice = createSlice({ 
    name: 'selectedItem',
    initialState,
    reducers: {
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload;
        },
        clearSelectedItem: (state) => {
            state.selectedItem = null;
        },
    }
})

export const { setSelectedItem, clearSelectedItem } = selectedItemSlice.actions;
export default selectedItemSlice.reducer;