import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import ArticleDetail from './ArticleDetail';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/action/actionCreator';

const stubInitialState = {
    account: {
        email: '',
        id: 1,
        logged_in: true,
        name: 'mock_user',
        password: ''
    },

    redirectUrl: '',
    currentArticle: {id:1, author_id:1, title:'test_title', content:'test_content'},
    articles: [],
    users: {1: 'user1', 2:'user2', 3:'user3'},
    comments: [{id:0, articleId: 0, author_id: 1, content:'aa'}, {id:1, articleId: 0, author_id: 2, content:'bb'}, {id:2, articleId: 0, author_id: 3, content:'cc'}]
}

const stub_no_my_articleState = {
    ...stubInitialState,
    currentArticle: {
        id: 1, author_id: 0, title: 'test', content: 'test'
    }
}

const stub_no_my_comments = {
    ...stubInitialState,
    comments: [{id:0, articleId: 0, author_id: 2, content:'aa'}, {id:1, articleId: 0, author_id: 2, content:'bb'}, {id:2, articleId: 0, author_id: 3, content:'cc'}]
}

const notMyArticleStore = getMockStore(stub_no_my_articleState);
const noMyCommentsStore = getMockStore(stub_no_my_comments);
const mockStore = getMockStore(stubInitialState);

describe('<ArticleDetail /> when usual', () => {
    let articleDetail, spyGetComments, spyGetArticle, spyGetLogin, spyGetUsers
    beforeEach(() => {
        jest.clearAllMocks();
        articleDetail = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                         <ArticleDetail history={history}></ArticleDetail>
                    </Switch>
                </ConnectedRouter>
            </Provider>  
        );
        spyGetComments = jest.spyOn(actionCreators, 'GET_COMMENTS')
        .mockImplementation(() => {
            return dispatch => {
                return {
                    type: ''
                }
            }
        });

        spyGetArticle = jest.spyOn(actionCreators, 'GET_ARTICLE')
        .mockImplementation((id) => {
            return dispatch => {
                return {
                    type: ''
                }
            }
        });

        spyGetLogin = jest.spyOn(actionCreators, 'GET_LOGIN_INFO')
        .mockImplementation(() => {
            return dispatch => {
                return {
                    type: ''
                }
            }
        });

        spyGetUsers = jest.spyOn(actionCreators, 'GET_USERS')
        .mockImplementation(() => {
            return dispatch => {
                return {
                    type: ''
                }
            }
        });
    });

    it('should render', () => {
        const comp = mount(articleDetail);
        const wrp = comp.find('.ArticleDetail');
        expect(wrp.length).toBe(1);
        expect(comp.find('#article-title').length).toBe(1)
        expect(comp.find('#article-author').length).toBe(1)
        expect(comp.find('#article-content').length).toBe(1)
    });

    it('should handle back behavior', () => {
        const comp = mount(articleDetail);
        const wrp = comp.find('#back-detail-article-button');
        const spyBack = jest.spyOn(history, 'push')
        .mockImplementation((url) => {});
        wrp.simulate('click');
        expect(spyBack).toHaveBeenCalledWith('/articles/');
    });

    it('should handle article edit behavior', () => {
        const comp = mount(articleDetail);
        const wrp = comp.find("#edit-article-button");
        const spyDelete = jest.spyOn(history, 'push')
        .mockImplementation((url) => {});
        wrp.simulate('click');
        expect(spyDelete).toHaveBeenCalledTimes(1);
    });

    it('should edit comment', () => {
        const comp = mount(articleDetail);
        const wrp = comp.find("#edit-comment-button");
        const spyPrompt = jest.spyOn(window, 'prompt')
        .mockImplementation(() => {
            return "Abc"
        });
        const spyEdit = jest.spyOn(actionCreators, 'EDIT_COMMENT')
        .mockImplementation(() => {
            return dispatch => {
                return {
                    type: ''
                }
            }
        });
        const spyPush = jest.spyOn(actionCreators, 'GET_COMMENTS')
        .mockImplementation(() => {
            return dispatch => {
                return {
                    type: ''
                }
            }
        });
        wrp.simulate('click');
        expect(spyPrompt).toHaveBeenCalledTimes(1);
        expect(spyEdit).toHaveBeenCalledTimes(1);
        expect(spyPush).toHaveBeenCalledTimes(2);
    });

    it('should not render article button', () => {
        const comp = mount(<Provider store={notMyArticleStore}>
            <ConnectedRouter history={history}>
                <Switch>
                     <ArticleDetail history={history}></ArticleDetail>
                </Switch>
            </ConnectedRouter>
        </Provider>);
    
        const editArticle = comp.find('#edit-article-button');
        const deleteArticle = comp.find('#delete-article-button');
        expect(editArticle.length).toBe(0);
        expect(deleteArticle.length).toBe(0);
    });

    it('should not redner edit button', () => {
        const comp = mount(<Provider store={noMyCommentsStore}>
            <ConnectedRouter history={history}>
                <Switch>
                     <ArticleDetail history={history}></ArticleDetail>
                </Switch>
            </ConnectedRouter>
        </Provider>);

        const editComment = comp.find('#edit-comment-button');
        const deleteComment = comp.find('#delete-comment-button');
        expect(editComment.length).toBe(0);
        expect(deleteComment.length).toBe(0);
    })

    it('should delete article', () => {
        const comp = mount(articleDetail);
        const wrp = comp.find("#delete-article-button");
        const spy = jest.spyOn(actionCreators, 'DELETE_ARTICLE')
        .mockImplementation((id) => {
            return dispatch => {
                return {type: ''}
            }
        });
        wrp.simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    })
})