import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    admin: null,
    isFetching: false,
    error: false
}

export const adminSlice = createSlice( {
    name: 'admin',
    initialState,
    reducers: {
        loginStart: ( state ) => {
            state.isFetching = true
        },
        loginSuccess: ( state, action ) => {
            const { token, ...others } = action.payload;
            localStorage.setItem( "accessToken", token );
            localStorage.setItem( "admin", JSON.stringify( others ) );
            state.admin = others;
            state.isFetching = false;
        },
        loginByTokenSuccess: ( state, action ) => {
            localStorage.setItem( "admin", JSON.stringify( action.payload ) );
            state.admin = action.payload;
            state.isFetching = false;
        },
        loginFailure: ( state ) => {
            state.isFetching = false;
            state.error = true
        },
        resetAdmin: ( state ) => {
            localStorage.removeItem( "accessToken" );
            localStorage.removeItem( "admin" );
            state.admin = null;
            state.isFetching = false;
            state.error = false
        }
    },
} )

export const { loginStart, loginSuccess, loginFailure, loginByTokenSuccess, loginByTokenFaulure, resetAdmin } = adminSlice.actions

export default adminSlice.reducer