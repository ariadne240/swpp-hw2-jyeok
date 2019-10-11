import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Login from './Login';
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
    articles: [],
    users: {},
    comments: []
}

const stubLoggedInState = {
    ...stubInitialState,
    account: {
        email: 'swpp@snu.ac.kr',
        id: 0,
        logged_in: true,
        name:'adsf',
        password: 'asdf'
    }
};

const loggedinStore = getMockStore(stubLoggedInState);
const mockStore = getMockStore(stubInitialState);

describe('<Login/>', () => {
    let login, spyFetch;
    beforeEach(() => {
        jest.clearAllMocks();
        login = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Login/>
                </ConnectedRouter>
            </Provider>
        );
        spyFetch = jest.spyOn(actionCreators, 'GET_LOGIN_INFO')
        .mockImplementation(() => {
            return dispatch => {
                return {
                    type: ''
                }
            }
        });
    });
    
    it('should check login information on load', () => {
        const spy = jest.spyOn(actionCreators, 'GET_LOGIN_INFO')
        .mockImplementation(() => {
            return dispatch => {
                return {type:''}
        }});
        const comp = mount(login);
        expect(spy).toHaveBeenCalledTimes(1);
    });
    
    it('should push to articles page if user is logged in', () => {
        const spy = jest.spyOn(history, 'push')
        .mockImplementation(() => {});
        const comp = mount(<Provider store={loggedinStore}>
            <ConnectedRouter history={history}>
                <Login/>
            </ConnectedRouter>
        </Provider>);
        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should call login', () => {
        const spyLogin = jest.spyOn(actionCreators, 'LOGIN')
        .mockImplementation((e, p) => {
            return dispatch => {
                return {type:''}
        }});
        const comp = mount(login);
        const wrp = comp.find('#login-button');
        wrp.simulate('click');
        expect(spyLogin).toHaveBeenCalledTimes(1);
    });

    it('should reflect email state changes', () => {
        const email = 'TEST_EMAIL';
        const comp = mount(login);
        const wrp = comp.find('#email-input');
        wrp.simulate('change', { target: {value: email}});
        const inst = comp.find(Login.WrappedComponent).instance();
        expect(inst.state.account.email).toEqual(email);
        expect(inst.state.account.password).toEqual('');
    });

    it('should reflect pw state changes', () => {
        const pw = 'TEST_PW';
        const comp = mount(login);
        const wrp = comp.find('#pw-input');
        wrp.simulate('change', { target: {value: pw}});
        const inst = comp.find(Login.WrappedComponent).instance();
        expect(inst.state.account.password).toEqual(pw);
        expect(inst.state.account.email).toEqual('');
    });
});