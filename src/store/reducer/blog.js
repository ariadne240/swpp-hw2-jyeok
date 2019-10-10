import * as actionTypes from '../action/actionTypes';
import React from 'react';
import Axios from 'axios';

const initialState = {
    account: {
        email: '',
        id: -1,
        logged_in: false,
        name: '',
        password: ''
    },

    redirectUrl: '',
    currentArticle: {},
    users: {},
    comments: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_LOGIN_INFO:
            const userState = {
                ...state,
                account: action.account,
                redirectUrl: action.redirectUrl
            };
            return userState;

        case actionTypes.LOGIN_SUCCESS:
            const loginedState = {
                ...state,
                account: action.account,
                redirectUrl: action.redirectUrl
            };
            return loginedState;

        case actionTypes.LOGIN_FAILED:
            console.log("For debug; Login failed", action.account);
            break;

        case actionTypes.LOGOUT:
            const logoutedState = {
                ...state,
                account: action.account,
                redirectUrl: action.redirectUrl
            };
            return logoutedState;

        case actionTypes.GET_ARTICLE:
            const articleState = {
                ...state,
                currentArticle: action.article
            };
            return articleState;

        case actionTypes.GET_USERS:
            let idAndKey = {};
            action.users.forEach(el => {
                idAndKey[el.id] = el.name;                
            })
            const usersState = {
                ...state,
                users: idAndKey
            };
            return usersState;
        
        case actionTypes.GET_COMMENTS:
            return {
                ...state,
                comments: action.data
            };

        default:
            break;
    }
    return state;
}

export default reducer;