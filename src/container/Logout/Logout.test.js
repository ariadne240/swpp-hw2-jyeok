import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Logout from './Logout';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/action/actionCreator';

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

describe('<Logout />', () => {
    let logout, spyFetchLoginInfo;
    beforeEach(() => {
        logout = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                         <Logout history={history}></Logout>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });
    
    it('should render logout', () => {
        const comp = mount(logout);
        const wrp = comp.find(".Logout");
        expect(wrp.length).toBe(1);
    });

    it('should call onLogout', () => {
        const spy = jest.spyOn(actionCreators, 'LOGOUT')
        .mockImplementation(() => {
            return dispatch => {
                return {
                    type: ''
                 }
              }
            });
        const spyPush = jest.spyOn(history, 'push')
        .mockImplementation((url) => {
        });

        const comp = mount(logout);
        const wrp = comp.find('#logout-button');
        wrp.simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spyPush).toHaveBeenCalledTimes(1);
        expect(spyPush).toHaveBeenCalledWith('/login');
    });
})