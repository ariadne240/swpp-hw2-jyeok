import axios from 'axios';
import * as actionCreators from './actionCreator';
import {store} from '../store';

describe('actionCreators', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
        
    it('GET_LOGIN_INFO should fetch login info correctly when logged out', (done) => {
     const stubUserInfo = {
        email: '',
        id: -1,
        logged_in: false,
        name: '',
        password: ''
     };
     
     const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUserInfo
          };
          resolve(result);
        });
      })

      store.dispatch(actionCreators.GET_LOGIN_INFO()).then(() => {
      const newState = store.getState();
      expect(newState.blog.account).toBe(stubUserInfo);
      expect(newState.blog.redirectUrl).toBe('/login');
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
    });

    it('GET_LOGIN_INFO should fetch login info correctly when logged in', (done) => {
        const stubUserInfo = {
           email: '',
           id: -1,
           logged_in: true,
           name: '',
           password: ''
        };
        const spy = jest.spyOn(axios, 'get')
         .mockImplementation(url => {
           return new Promise((resolve, reject) => {
             const result = {
               status: 200,
               data: stubUserInfo
             };
             resolve(result);
           });
         })
   
         store.dispatch(actionCreators.GET_LOGIN_INFO()).then(() => {
         const newState = store.getState();
         expect(newState.blog.account).toBe(stubUserInfo);
         expect(newState.blog.redirectUrl).toBe('/articles');
         expect(spy).toHaveBeenCalledTimes(1);
         done();
       });
       });

})