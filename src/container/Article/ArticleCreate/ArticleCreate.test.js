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
        email: 'adsaf@sa.com',
        id: 0,
        logged_in: true,
        name: 'mock_user',
        password: 'asdffasdf'
    },

    redirectUrl: '',
    currentArticle: {
        id: 0,
        title: '',
        content: '',
        author_id: 3
    },
    articles: [],
    users: {},
    comments: []
}

const mockStore = getMockStore(stubInitialState);

describe('<ArticleCreate />', () => {
    let articleCreate;

    beforeEach(() => {
        jest.clearAllMocks();
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

    it('should reflect title state change', () => {
        const title = 'TEST_TITLE';
        const comp = mount(articleCreate);
        const wrp = comp.find('#article-title-input');
        wrp.simulate('change', { target: {value: title}});
        const inst = comp.find(ArticleCreate.WrappedComponent).instance();
        expect(inst.state.title).toEqual(title);
        expect(inst.state.content).toEqual('');
    });

    it('should reflect content state change', () => {
        const content = 'TEST_CONTENT';
        const comp = mount(articleCreate);
        const wrp = comp.find('#article-content-input');
        wrp.simulate('change', { target: {value: content}});
        const inst = comp.find(ArticleCreate.WrappedComponent).instance();
        expect(inst.state.title).toEqual('');
        expect(inst.state.content).toEqual(content);
    });

    it('should toggle to edit status', () => {
        const title = 'TITLE';
        const content = 'TEST_CONTENT';
        const comp = mount(articleCreate);
        const contentWrp = comp.find('#article-content-input');
        contentWrp.simulate('change', {target: {value: content}});
        const titleWrp = comp.find('#article-title-input');
        titleWrp.simulate('change', {target: {value: title}});
        const btnWrp = comp.find('#write-tab-button');
        btnWrp.simulate('click');
        const inst = comp.find(ArticleCreate.WrappedComponent).instance();
        expect(inst.state.title).toEqual(title);
        expect(inst.state.content).toEqual(content);
        expect(inst.state.edit).toBeTruthy();
    });

    it('should toggle to preview status', () => {
        const title = 'TITLE';
        const content = 'TEST_CONTENT';
        const comp = mount(articleCreate);
        const contentWrp = comp.find('#article-content-input');
        contentWrp.simulate('change', {target: {value: content}});
        const titleWrp = comp.find('#article-title-input');
        titleWrp.simulate('change', {target: {value: title}});
        const btnWrp = comp.find('#preview-tab-button');
        btnWrp.simulate('click');
        const inst = comp.find(ArticleCreate.WrappedComponent).instance();
        expect(inst.state.title).toEqual(title);
        expect(inst.state.content).toEqual(content);
        expect(inst.state.edit).not.toBeTruthy();
    });

    it('should handle back behavior', () => {
        const comp = mount(articleCreate);
        const wrp = comp.find('#back-create-article-button');
        const spyBack = jest.spyOn(history, 'push')
        .mockImplementation((url) => {});
        wrp.simulate('click');

        expect(spyBack).toHaveBeenCalledWith('/articles/');
    });

    it('should handle posting', () => {
        const stubInput = {
            title: 'stub_title',
            content: 'stub_content'
        }
        const spyPost = jest.spyOn(actionCreators, 'POST_ARTICLE')
        .mockImplementation(info => {
            return dispatch => {
                return {type:''}
            }
        });
        const spyPush = jest.spyOn(history, 'push')
        .mockImplementation(url => {});
    
        const comp = mount(articleCreate);
        const wrp = comp.find('#confirm-create-article-button');
        const inst = comp.find(ArticleCreate.WrappedComponent).instance();
        inst.setState({
            title: stubInput.title,
            content: stubInput.content
        });
        wrp.simulate('click');
        expect(spyPost).toHaveBeenCalledTimes(1);
    });
});