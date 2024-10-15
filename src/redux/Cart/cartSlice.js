import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],  // Arreglo que contiene los productos del carrito
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);  // Agrega un producto al carrito
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);  // Elimina un producto del carrito
        },
        clearCart: (state) => {
            state.items = [];  // Vacía el carrito
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
