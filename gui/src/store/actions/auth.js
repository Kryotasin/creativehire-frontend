import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart =() => {
    return{
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    console.log("Logging out before");
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    console.log("Logging out after");

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const dispatchLogout = () => {
    return dispatch => {
        dispatch(logout());
    }
}

export const checkAuthTimeout = expirationDate => {
    return dispatch => {
        setTimeout(dispatchLogout, expirationDate * 3600 * 1000 * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/',{
            username: username,
            password: password
        })
        .then (res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600*1000 );
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        console.log(username, password1, password2, email);
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/',{
            username: username,
            password1: password1,
            password2: password2,
            email: email
        })
        .then (res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600*1000 );
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if(token === undefined) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            
            console.log(expirationDate);
            if(expirationDate <= new Date()){
                dispatch(logout());
                console.log("Here, logging out");
            }
            else{
                dispatch(authSuccess(token));
                console.log("Here, not logging out");
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
           
                console.log(expirationDate);
                console.log(localStorage.getItem('token'));
                console.log((expirationDate.getTime() - new Date().getTime())/1000); }
                
        }
    }
}