import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        user: null,
        isLoggedIn: localStorage.getItem("isLoggedIn") === 'true', 
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        login: (state) => {
            state.isLoggedIn = true; // Set isLoggedIn to true when login happens
            localStorage.setItem('isLoggedIn', 'true');
          },
        logout: (state) => {
            state.isLoggedIn = false; // Set isLoggedIn to false when logout happens
            localStorage.setItem('isLoggedIn', 'false');
        },
    }
})

export const { setUser, login, logout } = usersSlice.actions;
export default usersSlice.reducer;