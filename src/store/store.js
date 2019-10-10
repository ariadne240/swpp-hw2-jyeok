import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import blogReducer from './reducer/blog';
import { connectRouter, routerMiddleware} from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

export const history = createBrowserHistory();
const rootReducer = combineReducers({
    blog: blogReducer,
    router: connectRouter(history)
});

const logger = createLogger();
export const middlewares = [thunk, routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(...middlewares)));