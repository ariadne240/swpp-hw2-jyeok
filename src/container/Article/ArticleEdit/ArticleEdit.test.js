import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import ArticleEdit from './ArticleEdit';
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
    users: {},
    comments: []
}

const mockStore = getMockStore(stubInitialState);

describe('<ArticleEdit />', () => {
    let articleEdit, spyGetArticle;

    beforeEach(() => {
        articleEdit = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                         <ArticleEdit history={history}></ArticleEdit>
                    </Switch>
                </ConnectedRouter>
            </Provider>  
        );

        spyGetArticle = jest.spyOn(actionCreators, 'GET_ARTICLE')
        .mockImplementation(() => {
            return dispatch => {
            return {type: ''}
        }});
    });

    it('should write', () => {
        const comp = mount(articleEdit);
        const wrp = comp.find('.ArticleEdit');
        expect(wrp.length).toBe(1);
    });

    it('should get article', () => {
        const comp = mount(articleEdit);
        expect(spyGetArticle).toHaveBeenCalledTimes(0);
    })

    it('should toggle', () => {

    });

    it('should handle write', () => {
        const comp = mount(articleEdit);
        const wrp = comp.find('#confirm-edit-article-button');
        expect(wrp.length).toBe(1); 
    });
});