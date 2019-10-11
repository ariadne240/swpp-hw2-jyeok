import React, { Component } from 'react'
import Logout from '../../Logout'
import {connect} from 'react-redux';
import Axios from 'axios';
import * as actionCreator from '../../../store/action/actionCreator';
class ArticleCreate extends Component {
    state = {
        title: '',
        content: '',
        edit: true,
    };

    onClickPost = async () => {
        this.props.onPost({
            author_id: this.props.account.id,
            title: this.state.title,
            content: this.state.content
        });
    }  

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.currentArticle.id !== this.props.currentArticle.id)
            this.props.history.push('/articles/' + this.props.currentArticle.id);
    }
      
    render() {
        return (
            <div className='ArticleCreate'>
                <div className='ArticleCreate-Common'>
                    <button id='write-tab-button' name='write-tab-button' value={this.state.title} onClick={(e) => this.setState({
                        edit: true
                    })}>Write</button>
                    <button id='preview-tab-button' name='preview-tab-button' value={this.state.title} onClick={() => this.setState({
                        edit: false
                    })}>Preview</button>
                    <button id='confirm-create-article-button' name='confirm-create-article-button' disabled={this.state.title === '' || this.state.content === ''} onClick={this.onClickPost}>Confirm</button>
                    <button id='back-create-article-button' name='back-create-article-button' onClick={() => {
                        this.props.history.push('/articles/')
                    }}>Back</button>
                </div>
                
                {this.state.edit && <div className='ArticleCreate-Write'>
                <h2> Article Write </h2>
                    <input type='text' id='article-title-input' name='article-title-input' placeholder='title here' onChange={(e) => {
                        this.setState({
                            title: e.target.value
                        })
                    }} value={this.state.title}/> <br/>
                    <textarea id='article-content-input' name='article-content-input' placeholder='content here' value={this.state.content} onChange={(e) => {
                        this.setState({
                            content: e.target.value
                        })
                    }}/> <br/>
                    <Logout history={this.props.history} />
                </div>}

    

                {!this.state.edit && <div className='ArticleCreate-Preview'>
                <h2> Article Preview</h2>
                    <h3 id='article-author'>{this.props.account.name}</h3>
                    <h3 id='article-title'>{this.state.title}</h3>
                    <div id='article-content'>{this.state.content}</div>
                    <Logout history={this.props.history}/>
                </div>}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.blog.account,
        currentArticle: state.blog.currentArticle
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPost : (info) => {
            return dispatch(actionCreator.POST_ARTICLE(info))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreate);