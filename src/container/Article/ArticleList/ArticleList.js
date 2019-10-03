import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import Logout from '../../Logout';
import axios from 'axios';

class ArticleList extends Component {
    state = {
        articleShow : []
    }
    articles = [];
    users = {};

    componentDidMount() {
        axios.get('/api/user')
        .then((res) => {
            res.data.forEach(element => {
                var num = element.id
                this.users[num] = element.name
            });
        });
        axios.get('/api/articles')
        .then((res) => {
            this.articles = res.data.map((article) => {
                return {
                    articleID: article.id, 
                    title: article.title,
                    author: article.author_id
                }
            });
        })
        .then(() => {
            this.setState({
                articleShow: this.articles.map(article => {
                return <div className="ArticleEntry" key={article.articleID}><span className="ArticleList-id">{article.articleID}</span>
                <button className="ArticleList-title" onClick={() => this.clickHandler(article.articleID)}>{article.title}</button>
                <span className="ArticleList-author">{this.users[article.author]}</span></div>
                })
            });
        });
    }
    
    clickHandler = (id) => {
        this.props.history.push('/articles/'+id);
    }

    render() {
        return (  
            <div className="ArticleList">
                {this.state.articleShow}
                <button className="ArticleCreate" id="create-article-button" name="create-article-button" onClick={() => this.props.history.push('/articles/create')}>Create</button> <br/>
                <Link to='/login'>Login Page</Link>
                <Logout history={this.props.history} />
            </div>
        );
    }
}

export default (ArticleList);