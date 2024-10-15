import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './Search/searchSlice';
import cartSlice from './Cart/cartSlice';
import userSlice from './User/userSlice';

const store = configureStore({
    reducer: {
        search: searchSlice,
        cart: cartSlice,
        user: userSlice,
    },
});

export default store;
