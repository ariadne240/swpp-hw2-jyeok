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
    // articleList: []
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
            let articleCommentsAuthor = action.data.map(
                c => {
                    return (<div key={c.id} id={"comment-"+c.id} className='commentEntry'>
                        <span className="comment-author"><b>{state.users[c.author_id]}</b></span><br/>
                        <span id={"comment-content-"+c.id}>{c.content}</span>
                        {c.author_id == state.account.id && <button id='edit-comment-button' onClick={
                            (e) => {
                                let editedComment = prompt("Enter the comment", c.content)
                                if(editedComment && editedComment !== '') {
                                    Axios.patch(
                                        '/api/comments/' + c.id,
                                        {
                                            content: editedComment
                                        }
                                    )
                                    document.getElementById("comment-content-" + c.id).innerText = editedComment;
                                }
                            }
                        }>Edit</button>}
                        {c.author_id == state.account.id && <button id='delete-comment-button' onClick={
                            () => {
                                Axios.delete('/api/comments/' + c.id);
                                document.getElementById("comment-"+c.id).parentNode.removeChild(document.getElementById("comment-"+c.id));
                            }
                        }>Delete</button>}
                        </div>);
                }
            )
            return {
                ...state,
                comments: articleCommentsAuthor
            };

        default:
            break;
    }
    return state;
}

export default reducer;