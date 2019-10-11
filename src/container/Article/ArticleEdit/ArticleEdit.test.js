import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import ArticleEdit from './ArticleEdit';
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
    currentArticle: {id:0, author_id:0, title:'test_title', content:'test_content'},
    articles: [],
    users: {},
    comments: []
}

const mockStore = getMockStore(stubInitialState);

describe('<ArticleEdit />', () => {
    let articleEdit, spyGetArticle;

    beforeEach(() => {
        jest.clearAllMocks();
        articleEdit = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                         <ArticleEdit history={history}></ArticleEdit>
                    </Switch>
                </ConnectedRouter>
            </Provider>  
        );

        spyGetArticle = jest.spyOn(actionCreators, 'GET_ARTICLE')
        .mockImplementation(() => {
            return dispatch => {
            return {type: ''}
        }});
    });

    it('should write', () => {
        const comp = mount(articleEdit);
        const wrp = comp.find('.ArticleEdit');
        expect(wrp.length).toBe(1);
    });

    it('should get article', () => {
        const comp = mount(articleEdit);
        expect(spyGetArticle).toHaveBeenCalledTimes(0);
    })

    it('should handle write', () => {
        const comp = mount(articleEdit);
        const wrp = comp.find('#confirm-edit-article-button');
        expect(wrp.length).toBe(1); 
    });

    it('should reflect title state change', () => {
        const title = 'TEST_TITLE';
        const comp = mount(articleEdit);
        const wrp = comp.find('#article-title-input');
        wrp.simulate('change', { target: {value: title}});
        const inst = comp.find(ArticleEdit.WrappedComponent).instance();
        expect(inst.state.title).toEqual(title);
        expect(inst.state.content).toEqual('test_content');
    });

    it('should reflect content state change', () => {
        const content = 'TEST_CONTENT';
        const comp = mount(articleEdit);
        const wrp = comp.find('#article-content-input');
        wrp.simulate('change', { target: {value: content}});
        const inst = comp.find(ArticleEdit.WrappedComponent).instance();
        expect(inst.state.title).toEqual('test_title');
        expect(inst.state.content).toEqual(content);
    });

    it('should toggle to edit status', () => {
        const title = 'TITLE';
        const content = 'TEST_CONTENT';
        const comp = mount(articleEdit);
        const contentWrp = comp.find('#article-content-input');
        contentWrp.simulate('change', {target: {value: content}});
        const titleWrp = comp.find('#article-title-input');
        titleWrp.simulate('change', {target: {value: title}});
        const btnWrp = comp.find('#write-tab-button');
        btnWrp.simulate('click');
        const inst = comp.find(ArticleEdit.WrappedComponent).instance();
        expect(inst.state.title).toEqual(title);
        expect(inst.state.content).toEqual(content);
        expect(inst.state.edit).toBeTruthy();
    });

    it('should toggle to preview status', () => {
        const title = 'TITLE';
        const content = 'TEST_CONTENT';
        const comp = mount(articleEdit);
        const contentWrp = comp.find('#article-content-input');
        contentWrp.simulate('change', {target: {value: content}});
        const titleWrp = comp.find('#article-title-input');
        titleWrp.simulate('change', {target: {value: title}});
        const btnWrp = comp.find('#preview-tab-button');
        btnWrp.simulate('click');
        const inst = comp.find(ArticleEdit.WrappedComponent).instance();
        expect(inst.state.title).toEqual(title);
        expect(inst.state.content).toEqual(content);
        expect(inst.state.edit).not.toBeTruthy();
    });

    it('should handle back behavior', () => {
        const comp = mount(articleEdit);
        const wrp = comp.find('#back-edit-article-button');
        const spyBack = jest.spyOn(history, 'push')
        .mockImplementation((url) => {});
        wrp.simulate('click');
        expect(spyBack).toHaveBeenCalledWith('/articles/0');
    });

    it('should handle posting', () => {
        const stubInput = {
            title: 'stub_title',
            content: 'stub_content'
        }
        const spyEdit = jest.spyOn(actionCreators, 'EDIT_ARTICLE')
        .mockImplementation(info => {
            return dispatch => {
                return {type:''}
            }
        });
        const spyPush = jest.spyOn(history, 'push')
        .mockImplementation(url => {});
    
        const comp = mount(articleEdit);
        const wrp = comp.find('#confirm-edit-article-button');
        const inst = comp.find(ArticleEdit.WrappedComponent).instance();
        inst.setState({
            title: stubInput.title,
            content: stubInput.content
        });
        wrp.simulate('click');
        expect(spyEdit).toHaveBeenCalledTimes(1);
        expect(spyPush).toHaveBeenCalledWith('/articles/0')
    });
});