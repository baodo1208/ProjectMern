import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: null,
    products: [],
    total: 0
}

export const userSlice = createSlice( {
    name: 'carts',
    initialState,
    reducers: {
        getCart: ( state, action ) => {
            const { userId, products } = action.payload;
            let total = 0;
            products.forEach( product => {
                total += product.quantity * product.price;
            } )
            state.total = total;
            state.userId = userId;
            state.products = products;
        },
        updateCart: ( state, action ) => {
            const { userId, products } = action.payload;
            let total = 0;
            products.forEach( product => {
                total += product.quantity * product.price;
            } )
            state.total = total;
            state.userId = userId;
            state.products = products;
        },
        hanlderQuantity: ( state, action ) => {
            const { index, type } = action.payload;
            const newProducts = state.products.map( product => ( { ...product } ) )
            if ( type === "inc" ) {
                newProducts[ index ].quantity = newProducts[ index ].quantity + 1;
                state.total += newProducts[ index ].quantity * newProducts[ index ].price;
            } else {
                if ( newProducts[ index ].quantity > 1 ) {
                    newProducts[ index ].quantity = newProducts[ index ].quantity - 1;
                    state.total -= newProducts[ index ].quantity * newProducts[ index ].price;
                }
            }
            state.products = newProducts;
        },
        resetCart: ( state ) => {
            state.userId = null;
            state.products = [];
            state.total = 0
        }
    },
} )

export const { getCart, updateCart, hanlderQuantity, resetCart } = userSlice.actions

export default userSlice.reducer