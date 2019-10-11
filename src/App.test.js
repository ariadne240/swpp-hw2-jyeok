import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import App from './App';
import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';
import * as actionCreators from './store/action/actionCreator';

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
const mockLoggedOutStore = getMockStore({
    ...stubInitialState,
    account: {
        ...stubInitialState.account,
        logged_in : false
    }
});

describe('<App />', () => {
    let app, spyLogin;
    const stubAccount = {
        email: '',
        id: 0,
        logged_in: true,
        name: 'mock_user',
        password: ''
    };

    beforeEach(() => {
        app = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                         <App history={history}></App>
                    </Switch>
                </ConnectedRouter>
            </Provider>  
        );

        spyLogin = jest.spyOn(actionCreators, 'GET_LOGIN_INFO')
        .mockImplementation(() => {
            return dispatch => {
                return {type:''}
            }
        });
    });

    it('should render', () => {
        const comp = mount(app);
        const wrp = comp.find('.App');
        expect(wrp.length).toBe(1);
    });

    it('should push when not logged in', () => {
        const spyPush = jest.spyOn(history, 'push')
        .mockImplementation((url) => {});

        const comp = mount(<Provider store={mockLoggedOutStore}>
            <ConnectedRouter history={history}>
                <Switch>
                    <App history={history}>
                    </App>
                </Switch>
            </ConnectedRouter>
        </Provider>);

        expect(spyPush).toHaveBeenCalledTimes(1);
    })
})