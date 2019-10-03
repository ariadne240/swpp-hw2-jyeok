import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import blogReducer from './store/reducer/blog';
import { connectRouter, routerMiddleware} from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

const history = createBrowserHistory();
const rootReducer = combineReducers({
    blog: blogReducer,
    router: connectRouter(history)
});
const logger = createLogger();

const store = createStore(rootReducer, applyMiddleware(logger, thunk, routerMiddleware(history)));

ReactDOM.render(<Provider store={store}><App history={history} /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
