import React, {Component} from 'react'
import {connect} from 'react-redux'
import Logout from '../../Logout';
import * as actionCreators from '../../../store/action/actionCreator';

class ArticleList extends Component {
    componentDidMount() {
        this.props.onGetArticles();
        this.props.onGetUsers();
    }
    
    clickHandler = (id) => {
        this.props.history.push('/articles/'+id);
    }

    render() {
        let articles = this.props.articles.map(article => {
            return <div className="ArticleEntry" key={article.id}><span className="ArticleList-id">{article.id}</span>
            <button className="ArticleList-title" onClick={() => this.clickHandler(article.id)}>{article.title}</button>
            <span className="ArticleList-author">{this.props.users[article.author_id]}</span></div>
            });

        return (  
            <div className="ArticleList">
                {articles}
                <button className="ArticleCreate" id="create-article-button" name="create-article-button" onClick={() => this.props.history.push('/articles/create')}>Create</button> <br/>
                <Logout history={this.props.history} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.blog.articles,
        users: state.blog.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetArticles: () => {
            dispatch(actionCreators.GET_ARTICLES())
        },

        onGetUsers: () => {
            dispatch(actionCreators.GET_USERS())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);