
import { publicRequest, userRequest } from "../requestMethod";
import { getCart, updateCart } from "./cartRedux";
import { hideLoading, showLoading } from "./loadingRedux";
import { fetchingError, fetchingSuccess, startFetching } from "./productRedux";
import { loginByTokenSuccess, loginFailure, loginStart, loginSuccess, register, loginByGoogleSuccess } from "./userRedux";
import axios from "axios";

export const login = async ( dispatch, userInfo, history ) => {
    dispatch( loginStart() );
    try {
        const res = await publicRequest.post( "/auth/login", userInfo );
        dispatch( loginSuccess( res.data ) );
        history.goBack();
    } catch ( e ) {
        dispatch( loginFailure() );
    }
}

export const loginByToken = async ( dispatch ) => {
    dispatch( showLoading() );
    dispatch( loginStart() );
    try {
        const token = localStorage.getItem( "accessToken" );
        const res = await userRequest( token ).get( "/users/loginByToken" );
        dispatch( loginByTokenSuccess( res.data ) );
        dispatch( hideLoading() );
    } catch ( e ) {
        dispatch( loginFailure() );
        dispatch( hideLoading() );
    }
}


export const loginByGoogle = async ( dispatch ) => {
    dispatch( loginStart() );
    try {
        const res = await axios.get( "https://backend-project-intern.herokuapp.com/auth/success", {
            withCredentials: true,
        } );
        dispatch( loginByGoogleSuccess( res.data.user ) );
    } catch ( e ) {
    }
}

export const registerUser = async ( dispatch, userInfo, history ) => {
    dispatch( showLoading() );
    try {
        const res = await publicRequest.post( "/auth/register", userInfo );
        dispatch( register( res.data ) );
        history.goBack();
        dispatch( hideLoading() );
    } catch ( e ) {
        console.log( e );
        dispatch( hideLoading() );
    }
}

export const getCartByUserId = async ( dispatch, user ) => {
    try {
        const token = localStorage.getItem( "accessToken" );
        const res = await userRequest( token ).get( `/carts/find/${ user._id }` );
        if ( res.data ) {
            dispatch( getCart( res.data ) );
        }
    } catch ( e ) {
        console.log( e )
    }
}

export const addCart = async ( dispatch, newCart ) => {
    try {
        const token = localStorage.getItem( "accessToken" );
        const res = await userRequest( token ).put( `/carts/${ newCart.userId }`, newCart );
        if ( res.data ) {
            dispatch( updateCart( res.data ) );
        }
    } catch ( e ) {
        console.log( e )
    }
}

export const createCart = async ( dispatch, cart ) => {
    try {
        const token = localStorage.getItem( "accessToken" );
        const res = await userRequest( token ).post( `/carts`, cart );
        if ( res.data ) {
            dispatch( updateCart( res.data ) );
        }
    } catch ( e ) {
        console.log( e )
    }
}

export const hanldeCart = async ( dispatch, cartUpdate ) => {
    try {
        const token = localStorage.getItem( "accessToken" );
        const res = await userRequest( token ).put( `/carts/${ cartUpdate.userId }`, cartUpdate );
        if ( res.data ) {
            dispatch( updateCart( res.data ) );
        }
    } catch ( e ) {
        console.log( e );
    }
}

export const getProducts = async ( dispatch, cat ) => {
    dispatch( startFetching() );
    try {
        const res = cat ? await publicRequest.get( `products?category=${ cat }` )
            : await publicRequest.get( `products` );
        dispatch( fetchingSuccess( res.data ) );
    } catch ( e ) {
        console.log( e );
        dispatch( fetchingError() );
    }
}