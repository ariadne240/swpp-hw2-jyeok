import * as actionTypes from '../action/actionTypes';

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
    articles: [],
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

        case actionTypes.GET_ARTICLES:
            return {
                ...state,
                articles: action.articles
            };

        case actionTypes.POST_ARTICLE:
            return {
                ...state,
                currentArticle: action.data
            };
        
        case actionTypes.EDIT_COMMENT:
            return {
                ...state,
                comments: [
                    ...state.comments,
                    action.data
                ]
            };

        default:
            break;
    }
    return state;
}

export default reducer;