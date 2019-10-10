import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import ArticleList from './ArticleList';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/action/actionCreator';

const stubInitialState = {
    account: {
        email: '',
        id: -1,
        logged_in: false,
        name: '',
        password: ''
    },

    redirectUrl: '',
    currentArticle: {},
    articles: [{id: 0, author_id: 1, title:'test1'}, {id: 1, author_id: 2, title:'test2'}, {id:3, author_id: 3, title:'test3'}],
    users: {'1': 'Software Lover', '2': 'ABC', '3':'XYZ'},
    comments: []
}

const mockStore = getMockStore(stubInitialState);

describe('<ArticleList />', () => {
    let articleList, spyOn, spyUser;

    beforeEach(() => {
        articleList = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                         <ArticleList history={history}></ArticleList>
                    </Switch>
                </ConnectedRouter>
            </Provider>    
        );
        spyOn = jest.spyOn(actionCreators, 'GET_ARTICLES')
        .mockImplementation(() => {
            return dispatch => {
                return { type: ''}
            }
        });
        
        spyUser = jest.spyOn(actionCreators, 'GET_USERS')
        .mockImplementation(() => {
            return dispatch => {
                return {type: ''}
            }
        });
    });
    
    it('should render articles', () => {
        const comp = mount(articleList);
        const wrp = comp.find(".ArticleEntry");
        expect(spyOn).toHaveBeenCalledTimes(1);
        expect(spyUser).toHaveBeenCalledTimes(1);
        expect(wrp.length).toBe(3);
    });

    it('should call clickHandler', () => {
        const comp = mount(articleList);
        const wrp = comp.find(".ArticleList-title");
        const spyPush = jest.spyOn(history, 'push')
        .mockImplementation(path => {});
        wrp.at(0).simulate('click');
        expect(spyPush).toHaveBeenCalledWith('/articles/0');
        wrp.at(1).simulate('click');
        expect(spyPush).toHaveBeenCalledWith('/articles/1');
        wrp.at(2).simulate('click');
        expect(spyPush).toHaveBeenCalledWith('/articles/3');
    });

    it('should create articles', () => {
        const comp = mount(articleList);
        const wrp = comp.find("#create-article-button");
        const spyCreate = jest.spyOn(history, 'push')
        .mockImplementation(path => {});
        wrp.simulate('click');
        expect(spyCreate).toHaveBeenCalledWith('/articles/create')
    });
});