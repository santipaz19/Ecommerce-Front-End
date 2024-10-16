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
            // Buscar el último índice que coincida con el id
            const index = state.items.findLastIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items.splice(index, 1);  // Elimina solo ese elemento del array
            }
        },
        clearCart: (state) => {
            state.items = [];  // Vacía el carrito
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
