import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Login from './Login';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/action/actionCreator';

describe('<Login/>', () => {
    it('should ', () => {
        
    });
});