import { configureStore } from "@reduxjs/toolkit";
import searchTermReducer from './reducers/searchTermSlice'
import selectedItemReducer from './reducers/selectedItemSlice'
import componentsReducer from './reducers/componentsSlice'
import userReducer from './reducers/userSlice';
import listingSlice from "./reducers/listingSlice";
import filterReducer from './reducers/filterSlice';


export const store = configureStore({
    reducer: {
        listings: listingSlice,
        user: userReducer,
        searchTerm: searchTermReducer,
        selectedItem: selectedItemReducer,
        components: componentsReducer,
        filter: filterReducer,
    }
})