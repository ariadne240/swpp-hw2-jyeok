// import React from 'react';
// import { shallow, mount } from 'enzyme';
// import { Provider } from 'react-redux';
// import { connectRouter, ConnectedRouter } from 'connected-react-router';
// import { Route, Redirect, Switch } from 'react-router-dom';

// import ArticleEdit from './ArticleEdit';
// import { getMockStore } from '../../../test-utils/mocks';
// import { history } from '../../../store/store';
// import * as actionCreators from '../../../store/action/actionCreator';

// describe('<ArticleEdit />', () => {
//     let articleEdit;
//     const stubInitialState = {
//         account: {
//             email: '',
//             id: -1,
//             logged_in: false,
//             name: '',
//             password: ''
//         },
    
//         redirectUrl: '',
//         currentArticle: {},
//         users: {},
//         comments: []
//     }
//     const mockStore = getMockStore(stubInitialState);
//     const mockArticle = {
//         "id": 0,
//       "author_id": 1,
//       "title": "TEST_TITLE",
//       "content": "TSET_CONTENT"
//     }

//     beforeEach(() => {
//         articleEdit = (
//             <Provider store={mockStore}>
//                 <ConnectedRouter history={history}>
//                     <Route path='/articles/0/edit' component={ArticleEdit} />
//                 </ConnectedRouter>
//             </Provider>
//         )    
//     });
// });