import * as actionTypes from './actionTypes';
import axios from '../../axiosConfig';
import '../../global';

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
    localStorage.removeItem('userProfileID');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');

    
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

export const setUserID = (username, password) => {
        axios.post("authenticate/", {
                username: username,
                password: password
            }).then(res => localStorage.setItem('userProfileID', res.data.id))
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('api/v1/rest-auth/login/',{
            username: username,
            password: password
        })
        .then (res => {
            setUserID(username, password);

            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600*1000 );
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            if(!err.response){
                dispatch(authFail(521));
            }
            else if(err.response){
                dispatch(authFail(err.response.data));
            }
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('api/v1/rest-auth/registration/',{
            username: username,
            password1: password1,
            password2: password2,
            email: email
        })
        .then (res => {
            setUserID(username, password1);
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600*1000 );
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            if(!err.response){
                dispatch(authFail(521));
            }
            else if(err.response){
                dispatch(authFail(err.response.data));
            }        })
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
            
            if(expirationDate <= new Date()){
                dispatch(logout());
            }
            else{
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
                
        }
    }
}