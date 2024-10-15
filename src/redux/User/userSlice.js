import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: false,
    userData: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.loggedIn = true;
            state.userData = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.loggedIn = false;
            state.userData = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
