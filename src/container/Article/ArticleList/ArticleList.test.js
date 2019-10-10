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
    users: {},
    comments: []
}

const mockStore = getMockStore(stubInitialState);

describe('<ArticleList/>', () => {
    let ArticleList;
    let stubArticleList = [
        
    ]
    beforeEach(() => {
        ArticleList = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                         <ArticleList history={history}></ArticleList>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });
});
