import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchTerm: '',  // Término de búsqueda
    visible: false,  // Estado visible de la barra de búsqueda, inicializado en false
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;  // Establece el término de búsqueda
        },
        toggleSearchVisibility: (state) => {
            state.visible = !state.visible;  // Alterna la visibilidad de la barra de búsqueda
        },
        clearSearch: (state) => {
            state.searchTerm = '';  // Limpia el término de búsqueda
        },
    },
});

export const { setSearchTerm, toggleSearchVisibility, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
