import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    isFetching: false,
    error: false
}

export const productSlice = createSlice( {
    name: 'products',
    initialState,
    reducers: {
        startFetching: ( state ) => {
            state.isFetching = true;
        },
        fetchingSuccess: ( state, action ) => {
            state.isFetching = false;
            state.products = action.payload;
            state.error = false;
        },
        fetchingError: ( state ) => {
            state.isFetching = false;
            state.error = true;
        }
    },
} )

export const { startFetching, fetchingSuccess, fetchingError } = productSlice.actions;

export default productSlice.reducer