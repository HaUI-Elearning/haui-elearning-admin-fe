import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: localStorage.getItem('userInfo') || null,
        accessToken: localStorage.getItem('accessToken') || null,
    },
    reducers: {
        setUser(state, action) {
            state.userInfo = action.payload.userInfo;
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('accessToken', action.payload.accessToken); 
            localStorage.setItem('userInfo',action.payload.userInfo)
        },
        logout(state) {
            state.userInfo = null;
            state.accessToken = null;
            localStorage.removeItem('accessToken'); 
            localStorage.removeItem('userInfo');
            localStorage.removeItem('cartItems');
            localStorage.removeItem('favoriteItems')
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;