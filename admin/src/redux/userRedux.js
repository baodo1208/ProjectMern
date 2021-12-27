import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listUser: [],
    isFetching: false,
    error: false
}

export const userSlice = createSlice( {
    name: 'user',
    initialState,
    reducers: {
        start: ( state ) => {
            state.isFetching = true
        },
        getUserSuccess: ( state, action ) => {
            state.listUser = action.payload;
            state.isFetching = false;
        },
        getUserFailure: ( state ) => {
            state.isFetching = false;
            state.error = true
        },
        createSuccess: ( state, action ) => {
            const oldUser = state.listUser.map( user => ( { ...user } ) );
            const newListUser = [ ...oldUser, action.payload ];
            state.listUser = newListUser;
        },
        deleteSuccess: ( state, action ) => {
            const oldUser = state.listUser.map( user => ( { ...user } ) );
            const newListUser = oldUser.filter( user => user._id !== action.payload );
            state.listUser = newListUser;
        },
        updateSuccess: ( state, action ) => {
            const oldUser = state.listUser.map( user => ( { ...user } ) );
            const index = oldUser.findIndex( user => user._id === action.payload._id );
            oldUser[ index ] = action.payload;
            state.listUser = oldUser;
        },
        actionFailure: ( state ) => {
            state.error = true;
        }
    },
} )

export const { start, getUserSuccess, getUserFailure, createSuccess, deleteSuccess, updateSuccess, actionFailure } = userSlice.actions

export default userSlice.reducer