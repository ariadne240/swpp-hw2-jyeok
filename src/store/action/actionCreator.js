import * as actionTypes from './actionTypes';
import axios from 'axios';

export const GET_LOGIN_INFO = () => {
    return dispatch => {
        return axios.get('/api/user/1')
        .then(res => {
            dispatch(GET_LOGIN_INFO_(res.data));
        })
    }
}

export const GET_LOGIN_INFO_ = (userInfo) => {
    return {
        type: actionTypes.GET_LOGIN_INFO,
        account: userInfo,
        redirectUrl: userInfo.logged_in ? '/articles': '/login',
    }
}

export const LOGIN = (email, password) => {
    return dispatch => {
        return axios.get('/api/user/1')
        .then(res => {
            if(res.data.email === email && res.data.password === password) {
                const loginedUser = {
                    ...res.data, logged_in: true
                };

                axios.put('/api/user/1', loginedUser)
                .then(dispatch(LOGIN_SUCCESS(loginedUser)));
            }
            else {
                alert("Email or password is wrong");
                dispatch(LOGIN_FAILED());
            }
        });
    }
}

export const LOGIN_FAILED = () => {
    return {
        type: actionTypes.LOGIN_FAILED
    }
}
export const LOGIN_SUCCESS = (loginedUser) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        account: loginedUser,
        redirectUrl: '/articles'
    }
}

export const LOGOUT = (account) => {
    return dispatch => {
        const newAccountState = {
            ...account,
            logged_in : false
        }
        return axios.put('/api/user/1', newAccountState)
        .then(
            dispatch(LOGOUT_(newAccountState))
        );
    }
}

export const LOGOUT_ = (account) => {
    return {
        type: actionTypes.LOGOUT,
        account: account,
        redirectUrl: '/login'
    }
}

export const GET_ARTICLE = (id) => {
    return dispatch => {
        return axios.get('/api/articles/' + id)
        .then(res => {
            dispatch(GET_ARTICLE_(res));
        })
    }
}

export const GET_ARTICLE_ = (res) => {
    const articleInformation = {
        id: res.data.id,
        title: res.data.title,
        content: res.data.content,
        author_id: res.data.author_id,
        author: ''
    }

    return {
        type: actionTypes.GET_ARTICLE,
        article: articleInformation
    }
}

export const GET_ARTICLES = () => {
    return dispatch => {
        return axios.get('/api/articles')
        .then(res => {
            dispatch(GET_ARTICLES_(res));
        })
    }
}

export const GET_ARTICLES_ = (res) => {
    return {
        type: actionTypes.GET_ARTICLES,
        articles: res.data
    }
}

export const GET_USERS = () => {
    return dispatch => {
        return axios.get('/api/user')
        .then(
            (res) => dispatch(GET_USERS_(res.data))
        );
    }
}

export const GET_USERS_ = (data) => {
    return {
        type: actionTypes.GET_USERS,
        users: data
    }
}

export const GET_COMMENTS = (articleId) => {
    return dispatch => {
        return axios.get('/api/comments')
        .then((res) =>
            dispatch(GET_COMMENTS_(articleId, res.data))
        )
    }
}

export const GET_COMMENTS_ = (articleId, comments) => {
    let articleComments = comments.filter(c => c.article_id == articleId);
    return {
        type: actionTypes.GET_COMMENTS,
        data: articleComments
    }
}

export const POST_ARTICLE = (articleInfo) => {
    return dispatch => {
        return axios.post('/api/articles', articleInfo)
        .then(res => dispatch(POST_ARTICLE_(res)));
    }
}

export const POST_ARTICLE_ = (res) => {
    return {
        type: actionTypes.POST_ARTICLE,
        data: res.data
    }
}

export const EDIT_ARTICLE = (url, info) => {
    return dispatch => {
        return axios.patch(url, info)
        .then(res => dispatch(EDIT_ARTICLE_(res)));
    }
}

export const EDIT_ARTICLE_ = (res) => {
    return {
        type: actionTypes.EDIT_ARTICLE,
        data: res.data
    }
}

export const EDIT_COMMENT = (url, comment) => {
    return dispatch => {
        return axios.patch(url, comment)
        .then(res => dispatch(EDIT_COMMENT_(res)))
    }
}

export const EDIT_COMMENT_ = (res) => {
    return {
        type: actionTypes.GET_ARTICLES,
        data: res.data
    }
}

export const DELETE_ARTICLE = (url) => {
    return dispatch => {
        return axios.delete(url)
        .then((res) => {
        axios.get('/api/articles')
            .then(dispatch(DELETE_ARTICLE_(res)))
        })
    }
}

export const DELETE_ARTICLE_ = (res) => {
    return {
        type: actionTypes.DELETE_ARTICLE,
        data: res.data
    }
}