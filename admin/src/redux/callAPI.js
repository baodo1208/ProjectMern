import { publicRequest, userRequest } from "../requestMethod";
import { loginByTokenSuccess, loginFailure, loginStart, loginSuccess, } from "./adminRedux";
import { hideLoading, showLoading } from "./loadingRedux";
import { fetchFailure, fetchSuccess, startFetchProduct, failure, createProductSuccess, updateProductSuccess, deleteProductSuccess } from "./productRedux";
import { getUserFailure, start, getUserSuccess, createSuccess, deleteSuccess, updateSuccess, actionFailure } from "./userRedux";


export const login = async ( dispatch, admin, history ) => {
    dispatch( loginStart() );
    dispatch( showLoading() );
    try {
        const res = await publicRequest.post( "/auth/login", admin );
        dispatch( loginSuccess( res.data ) );
        history.push( "/app" );
        dispatch( hideLoading() );
    } catch ( e ) {
        dispatch( loginFailure() );
        console.log( e );
        dispatch( hideLoading() );
    }
}

export const loginByToken = async ( dispatch ) => {
    dispatch( loginStart() );
    dispatch( showLoading() );
    try {
        const token = localStorage.getItem( "accessToken" );
        const res = await userRequest( token ).get( "/users/loginByToken" );
        dispatch( loginByTokenSuccess( res.data ) );
        dispatch( hideLoading() );
    } catch ( e ) {
        dispatch( loginFailure() );
        console.log( e );
        dispatch( hideLoading() );
    }
}

export const getUser = async ( dispatch ) => {
    dispatch( start() );
    try {
        const token = localStorage.getItem( "accessToken" );
        const res = await userRequest( token ).get( "/users" );
        dispatch( getUserSuccess( res.data ) );
    } catch ( e ) {
        console.log( e );
        dispatch( getUserFailure() );
    }
}

export const createUser = async ( dispatch, newUser ) => {
    dispatch( showLoading() );
    try {
        const token = localStorage.getItem( "accessToken" );
        const res = await userRequest( token ).post( "/users", newUser );
        dispatch( createSuccess( res.data ) );
        dispatch( hideLoading() );
    } catch ( e ) {
        console.log( e );
        dispatch( actionFailure() );
        dispatch( hideLoading() );
    }
}


export const deleteUser = async ( dispatch, id, ) => {
    try {
        const token = localStorage.getItem( "accessToken" );
        await userRequest( token ).delete( `/users/${ id }` );
        dispatch( deleteSuccess( id ) );
    } catch ( e ) {
        console.log( e );
        dispatch( actionFailure() );
    }
}

export const updateUser = async ( dispatch, id, userUpdate ) => {
    dispatch( showLoading() );
    try {
        const token = localStorage.getItem( "accessToken" );
        const res = await userRequest( token ).put( `/users/${ id }`, userUpdate );
        dispatch( updateSuccess( res.data ) );
        dispatch( hideLoading() );
    } catch ( e ) {
        console.log( e );
        dispatch( actionFailure() );
        dispatch( hideLoading() );
    }
}

export const getProducts = async ( dispatch ) => {
    dispatch( startFetchProduct() );
    try {
        const res = await publicRequest.get( "/products" );
        dispatch( fetchSuccess( res.data ) );
    } catch ( e ) {
        console.log( e );
        dispatch( fetchFailure() );
    }
}

export const createProduct = async ( dispatch, newProduct ) => {
    dispatch( showLoading() );
    try {
        const token = localStorage.getItem( "accessToken" );
        const res = await userRequest( token ).post( "/products", newProduct );
        dispatch( createProductSuccess( res.data ) );
        dispatch( hideLoading() );
    } catch ( e ) {
        console.log( e );
        dispatch( failure() );
        dispatch( hideLoading() );
    }
}

export const updateProduct = async ( dispatch, id, updateProduct ) => {
    dispatch( showLoading() );
    try {
        const token = localStorage.getItem( "accessToken" );
        const res = await userRequest( token ).put( `/products/${ id }`, updateProduct );
        dispatch( updateProductSuccess( res.data ) );
        dispatch( hideLoading() );
    } catch ( e ) {
        console.log( e );
        dispatch( failure() );
        dispatch( hideLoading() );
    }
}

export const deleteProduct = async ( dispatch, id ) => {
    try {
        const token = localStorage.getItem( "accessToken" );
        await userRequest( token ).delete( `/products/${ id }` );
        dispatch( deleteProductSuccess( id ) );
    } catch ( e ) {
        console.log( e );
        dispatch( failure() )
    }
}
