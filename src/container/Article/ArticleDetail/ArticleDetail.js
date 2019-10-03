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
    
    render() { 
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
                        Axios.delete('/api/articles/' + this.props.history.location.pathname.replace('/articles/', ''))
                        .then(() => this.props.history.push('/articles/'));
                    }
                }>Delete</button>}
                <button id='back-detail-article-button' onClick={() => this.props.history.push('/articles/')}>Back</button>
            </div>
            <br/>
            <hr />
            <div className="comment">
                {this.props.comments}
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
            dispatch(actionCreator.GET_USERS());
        },

        loadArticle: (id) => {
            dispatch(actionCreator.GET_ARTICLE(id));
        },

        loadComments: (articleId) => {
            dispatch(actionCreator.GET_COMMENTS(articleId));
        },

        fetchLoginInfo: () => {
            dispatch(actionCreator.GET_LOGIN_INFO());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ArticleDetail);