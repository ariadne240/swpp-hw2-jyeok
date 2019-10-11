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
        id: 0,
        logged_in: true,
        name: 'mock_user',
        password: ''
    },

    redirectUrl: '',
    currentArticle: {id:0, author_id:0, title:'test_title', content:'test_content'},
    articles: [],
    users: {1: 'user1', 2:'user2', 3:'user3'},
    comments: [{id:0, articleId: 0, author_id: 1, content:'aa'}, {id:1, articleId: 0, author_id: 2, content:'bb'}, {id:2, articleId: 0, author_id: 3, content:'cc'}]
}

const mockStore = getMockStore(stubInitialState);

describe('<ArticleDetail />', () => {
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

    it('should disable add comment behavior', () => {
        const comp = mount(articleDetail);
        const wrp = comp.find('#confirm-create-comment-button');
        const inst = comp.find(ArticleDetail.WrappedComponent).instance();
        inst.setState({
            commentInput: ''
        });
        expect(wrp.props().disabled).toBeTruthy();
    });
})