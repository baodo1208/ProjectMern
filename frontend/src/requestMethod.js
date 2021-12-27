import axios from 'axios';

const BASE_URL = 'https://backend-project-intern.herokuapp.com/';

const publicRequest = axios.create( {
    baseURL: BASE_URL,
} );

const userRequest = ( token ) => {
    return axios.create( {
        baseURL: BASE_URL,
        headers: {
            token: `Bearer ${ token }`
        }
    } )
};

export { publicRequest, userRequest };

