import React, { Component } from 'react'
import Logout from '../../Logout'
import Axios from 'axios'
import {connect} from 'react-redux'
import * as actionCreators from '../../../store/action/actionCreator'
class ArticleEdit extends Component {
    state= {
        title: '',
        content: '',
        edit: true
    }

    componentDidMount() {
        let id = /(\d+)/.exec(this.props.history.location.pathname)[1];
        this.props.getArticle(id);
        document.getElementById('article-title-input').value = this.props.article.title;
        document.getElementById('article-content-input').value = this.props.article.content;
        this.setState({
            title: this.props.article.title,
            content: this.props.article.content
        })
    }
    
    onPost = () => {
        const id = /(\d+)/.exec(this.props.history.location.pathname)[1];

        Axios.patch('/articles/' + id, {
            title: this.state.title,
            content: this.state.content
        })
        .then(res => {
            this.props.history.push('/articles/'+id)
        });
    }

    render() {
        return (
            <div className='ArticleEdit'>
                <div className='ArticleEdit-Common'>
                    <button id='write-tab-button' name='write-tab-button' onClick={(e) => this.setState({
                        edit: true
                    }, (e) => {
                        document.getElementById('article-title-input').setAttribute('value', this.state.title);
                        document.getElementById('article-content-input').value = this.state.content;
                    })}>Write</button>
                    <button id='preview-tab-button' name='preview-tab-button' onClick={() => 
                    this.setState({
                        edit: false
                    })}>Preview</button>
                    <button id='confirm-create-article-button' name='confirm-create-article-button' disabled={this.state.title === '' || this.state.content === ''} onClick={ () => this.onPost()}>Confirm</button>
                    <button id='back-create-article-button' name='back-create-article-button' onClick={() => this.props.history.push('/articles/'+ (/(\d+)/.exec(this.props.history.location.pathname)[1]))}>Back</button>
                </div>
                
                {this.state.edit && <div className='ArticleEdit-Write'>
                <h2> Article Write </h2>
                    <input type='text' id='article-title-input' name='article-title-input' placeholder='title here' onChange={(e) => {
                        this.setState({
                            title: e.target.value
                        })
                    }} /> <br/>
                    <textarea id='article-content-input' name='article-content-input' placeholder='content here' onChange={(e) => {
                        this.setState({
                            content: e.target.value
                        })
                    }} /> <br/>
                    <Logout history={this.props.history} />
                </div>}

                {!this.state.edit && <div className='ArticleEdit-Preview'>
                <h2> Article Preview</h2>
                    <h3 id='article-author'>
                        {this.props.account.name}
                    </h3>
                    <h3 id='article-title'>
                        {this.state.title}
                    </h3>
                    <div id='article-content'>
                        {this.state.content}
                    </div>
                    <Logout history={this.props.histoy} />
                </div>}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.blog.account,
        article: state.blog.currentArticle
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticle: (id) => {
            dispatch(actionCreators.GET_ARTICLE(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);