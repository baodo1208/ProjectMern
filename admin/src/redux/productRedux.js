import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    isFetching: false,
    error: false
}

export const productSlice = createSlice( {
    name: 'admin',
    initialState,
    reducers: {
        startFetchProduct: ( state ) => {
            state.isFetching = true
        },
        fetchSuccess: ( state, action ) => {
            state.products = action.payload;
            state.isFetching = false;
        },
        fetchFailure: ( state ) => {
            state.isFetching = false;
            state.error = true
        },
        createProductSuccess: ( state, action ) => {
            const oldProducts = state.products.map( product => ( { ...product } ) );
            state.products = [ ...oldProducts, action.payload ];
        },
        updateProductSuccess: ( state, action ) => {
            const oldProducts = state.products.map( product => ( { ...product } ) );
            const index = oldProducts.findIndex( product => product._id === action.payload._id );
            oldProducts[ index ] = action.payload;
            state.products = oldProducts;
        },
        deleteProductSuccess: ( state, action ) => {
            const newProducts = state.products.filter( product => product._id !== action.payload );
            state.products = newProducts;
        },
        failure: ( state ) => {
            state.error = true;
        }
    },
} )

export const { startFetchProduct, fetchSuccess, fetchFailure, createProductSuccess, updateProductSuccess, deleteProductSuccess, failure } = productSlice.actions

export default productSlice.reducer