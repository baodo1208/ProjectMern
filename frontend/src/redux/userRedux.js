import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isFetching: false,
    error: false
}

export const userSlice = createSlice( {
    name: 'user',
    initialState,
    reducers: {
        loginStart: ( state ) => {
            state.isFetching = true
        },
        loginSuccess: ( state, action ) => {
            const { token, ...others } = action.payload;
            localStorage.setItem( "accessToken", token );
            state.user = others;
            state.isFetching = false;
        },
        loginByTokenSuccess: ( state, action ) => {
            ( !state.user ) && ( state.user = action.payload );
            state.isFetching = false;
        },
        loginByGoogleSuccess: ( state, action ) => {
            const { token, ...others } = action.payload;
            localStorage.setItem( "accessToken", token );
            state.user = others;
            state.isFetching = false;
        },
        loginFailure: ( state ) => {
            state.isFetching = false;
            state.error = true
        },
        register: ( state, action ) => {
            const { token, ...others } = action.payload;
            localStorage.setItem( "accessToken", token );
            state.user = others;
            state.isFetching = false;
        },
        resetUser: ( state ) => {
            localStorage.removeItem( "accessToken" );
            state.user = null;
            state.isFetching = false;
            state.error = false
        }
    },
} )

export const { loginStart, loginSuccess, loginFailure, loginByTokenSuccess, loginByGoogleSuccess, resetUser, register } = userSlice.actions

export default userSlice.reducer