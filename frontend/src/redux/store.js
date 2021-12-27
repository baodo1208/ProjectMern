import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userRedux";
import cartReducer from "./cartRedux";
import productReducer from "./productRedux";
import loadingReducer from "./loadingRedux";

export const store = configureStore( {
    reducer: {
        user: userReducer,
        cart: cartReducer,
        product: productReducer,
        loading: loadingReducer
    },
} )