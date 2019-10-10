import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import ArticleCreate from './ArticleCreate';
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
    currentArticle: {},
    articles: [],
    users: {},
    comments: []
}

const mockStore = getMockStore(stubInitialState);

describe('<ArticleCreate />', () => {
    let articleCreate;

    beforeEach(() => {
        articleCreate = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                         <ArticleCreate history={history}></ArticleCreate>
                    </Switch>
                </ConnectedRouter>
            </Provider>  
        );
    });

    it('should render', () => {
        const comp = mount(articleCreate);
        const wrp = comp.find('.ArticleCreate');
        expect(wrp.length).toBe(1);
    });
});