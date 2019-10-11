import React, {Component} from 'react'
import Logout from '../../Logout'
import {connect} from 'react-redux';
import * as actionCreator from '../../../store/action/actionCreator';
import Axios from 'axios';

class ArticleDetail extends Component { 
    constructor(props) {
        super(props);
        this.props.fetchLoginInfo();
        const id = this.props.history.location.pathname.replace('/articles/', '');
        this.props.loadUsers();
        this.props.loadArticle(id);
        this.props.loadComments(id);
    }

    state = {
        commentInput: ''
    }

    onEdit = (c) => {
        let editedComment = prompt("Enter the comment", c.content)
        console.log(editedComment);
        if(editedComment && editedComment !== '') {
            this.props.editComments('/api/comments/' + c.id, {
                content: editedComment
            })
            this.props.loadComments(this.props.article.id);
        }
    }

    onDelete = (url) => {
        this.props.deleteArticle('/api/articles/'+url);
        this.props.history.push('/articles');
    }

    render() {
        let commentsRender = this.props.comments.map(
            (c, idx) => {
                return (<div key={idx} id={"comment-"+c.id} className='commentEntry'>
                    <span className="comment-author"><b>{this.props.userList[c.author_id]}</b></span><br/>
                    <span id={"comment-content-"+c.id}>{c.content}</span>
                    {c.author_id == this.props.currentUser && <button id='edit-comment-button' onClick={
                        (e) => {
                            this.onEdit(c);
                        }
                    }>Edit</button>}
                    {c.author_id == this.props.currentUser && <button id='delete-comment-button' onClick={
                        () => {
                            Axios.delete('/api/comments/' + c.id)
                            .then(() => this.props.loadComments(this.props.history.location.pathname.replace('/articles/', '')));
                        }
                    }>Delete</button>}
                    </div>);
            }
        ) 
    return (
        <div className='ArticleDetail'>
            <div className='ArticleContainer'>
                <h2> Article Detail</h2>
                <h3 id='article-title'>{this.props.article.title}</h3>
                <h3 id='article-author'>{this.props.userList[this.props.article.author_id]}</h3>
                <div id='article-content'>{this.props.article.content}</div>
            </div>

            <div className='ArticleDetail-Button'>
                {this.props.article.author_id === this.props.currentUser && <button id='edit-article-button' onClick={
                    () => {
                        const url = this.props.history.location.pathname + '/edit'
                        this.props.history.push(url);
                    }
                }>Edit</button>}
                {this.props.article.author_id === this.props.currentUser && <button id='delete-article-button' onClick={
                    () => {
                        this.onDelete(this.props.article.id);
                    }
                }>Delete</button>}
                <button id='back-detail-article-button' onClick={() => this.props.history.push('/articles/')}>Back</button>
            </div>
            <br/>
            <hr />
            <div className="comment">
                {commentsRender}
                <input id='new-comment-content-input' onChange={(e) => {
                    this.setState({
                        commentInput: e.target.value
                    });
                }}/>
                <button id='confirm-create-comment-button' disabled = {this.state.commentInput === ''} onClick={ () => {
                    Axios.post('/api/comments', {
                        article_id: this.props.history.location.pathname.replace('/articles/', ''),
                        author_id: this.props.currentUser,
                        content: this.state.commentInput
                    }).then(
                        res => this.props.loadComments(this.props.history.location.pathname.replace('/articles/', ''))
                    )
                }
                }>Submit</button> <br/>
            </div>
            <Logout history={this.props.history}/>
        </div>
    )
}
}

const mapStateToProps = (state) => {
    return {
        userList: state.blog.users,
        article: state.blog.currentArticle,
        currentUser: state.blog.account.id,
        comments: state.blog.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsers: () => {
            return dispatch(actionCreator.GET_USERS());
        },

        loadArticle: (id) => {
            return dispatch(actionCreator.GET_ARTICLE(id));
        },

        loadComments: (articleId) => {
            return dispatch(actionCreator.GET_COMMENTS(articleId));
        },

        fetchLoginInfo: () => {
            return dispatch(actionCreator.GET_LOGIN_INFO());
        },

        editComments: (url, comment) => {
            return dispatch(actionCreator.EDIT_COMMENT(url, comment))
        },

        deleteArticle: (url) => {
            return dispatch(actionCreator.DELETE_ARTICLE(url))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ArticleDetail);