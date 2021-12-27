import { configureStore } from '@reduxjs/toolkit';
import adminReducer from "./adminRedux";
import userReducer from "./userRedux";
import productReducer from "./productRedux";
import loadingReducer from "./loadingRedux";


export const store = configureStore( {
    reducer: {
        admin: adminReducer,
        users: userReducer,
        products: productReducer,
        loading: loadingReducer
    },
} )