import React, { Component } from 'react'
import Logout from '../../Logout'
import Axios from 'axios'
import {connect} from 'react-redux'
import * as actionCreators from '../../../store/action/actionCreator'
class ArticleEdit extends Component {
    state= {
        title: '',
        content: '',
        edit: true,
        id: 0,
        submitted: false
    }

    componentDidMount() {
         this.setState({
            title: this.props.article.title,
            content: this.props.article.content,
            id: this.props.article.id
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.submitted)
            this.props.history.push('/articles/' + this.state.id);
    }
    
    
    onClickEdit = async () => {
        this.props.onEdit('/articles/' + this.state.id, {
            title: this.state.title,
            content: this.state.content
        });

        this.setState({
            ...this.state,
            submitted: true
        });
    }
    
    render() {
        return (
            <div className='ArticleEdit'>
                <div className='ArticleEdit-Common'>
                    <button id='write-tab-button' name='write-tab-button' onClick={(e) => this.setState({
                        edit: true
                    })}>Write</button>
                    <button id='preview-tab-button' name='preview-tab-button' onClick={() => 
                    this.setState({
                        edit: false
                    })}>Preview</button>
                    <button id='confirm-edit-article-button' name='confirm-edit-article-button' disabled={this.state.title === '' || this.state.content === ''} onClick={ () => this.onClickEdit()}>Confirm</button>
                    <button id='back-edit-article-button' name='back-edit-article-button' onClick={() => this.props.history.push('/articles/'+ this.state.id)}>Back</button>
                </div>
                
                {this.state.edit && <div className='ArticleEdit-Write'>
                <h2> Article Write </h2>
                    <input type='text' id='article-title-input' name='article-title-input' placeholder='title here' value={this.state.title} onChange={(e) => {
                        this.setState({
                            title: e.target.value
                        })
                    }} /> <br/>
                    <textarea id='article-content-input' name='article-content-input' placeholder='content here' value={this.state.content} onChange={(e) => {
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
        onEdit: (url, article) => {
            return dispatch(actionCreators.EDIT_ARTICLE(url, article))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);