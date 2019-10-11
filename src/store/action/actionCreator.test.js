import axios from 'axios';
import * as actionCreators from './actionCreator';
import {store} from '../store';

describe('actionCreators', () => {
    afterEach(() => {
        jest.clearAllMocks();

        const windowSpy = jest.spyOn(window, 'alert').mockImplementation(()=>{});
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

       it('LOGIN should success when email and pw are correct', (done) => {
         const correctUserInfo = {
          "id": 1,
          "email": "test@snu.ac.kr",
          "password": "test",
          "name": "Software Lover",
          "logged_in": true
         };
         const spyGet = jest.spyOn(axios, 'get')
         .mockImplementation(url => {
           return new Promise((res, rej) => {
             const result = {
               data: correctUserInfo,
               status: 200
             };
             res(result);
           })
         });
         const spyPut = jest.spyOn(axios, 'put')
         .mockImplementation((url, obj) => {
           return new Promise((res, rej) => {
             const result = {
               data: obj,
               status: 304
             };
             res(result);
           });
         });
       

         store.dispatch(actionCreators.LOGIN("test@snu.ac.kr", "test")).then(() => {
           expect(spyGet).toHaveBeenCalledTimes(1);
           expect(spyPut).toHaveBeenCalledTimes(1);
           expect(store.getState().blog.redirectUrl).toBe('/articles')
           expect(store.getState().blog.account).toEqual(correctUserInfo);
           done();
         })
       });

       it('LOGIN should fail when email and pw are not correct', (done) => {
        const stubInput = {
         "email": "test2@snu.ac.kr",
         "password": "test2",
        };
        const correctInput = {
          "id": 1,
          "email": "test@snu.ac.kr",
          "password": "test",
          "name": "Software Lover",
          "logged_in": false
        }
        const spyGet = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
          return new Promise((res, rej) => {
            const result = {
              data: correctInput,
              status: 200
            };
            res(result);
          })
        });

        store.dispatch(actionCreators.LOGIN(stubInput.email, stubInput.password)).then(() => {
          expect(spyGet).toHaveBeenCalledTimes(1);
          expect(store.getState().blog.account).not.toEqual(correctInput);
          done();
        })
      });

      it('should LOGOUT Success', (done) => {
        const stubAccount = {
          "id": 1,
          "email": "test@snu.ac.kr",
          "password": "test",
          "name": "Software Lover",
          "logged_in": true
        };
        
        const spy = jest.spyOn(axios, 'put')
        .mockImplementation((url, account) => {
          return new Promise((res, rej) => {
            const result = {
              status: 304,
              data: {
                ...stubAccount,
                "logged_in": false
              }
            };
            res(result);
          })
        });

        store.dispatch(actionCreators.LOGOUT(stubAccount)).then( () => {
          expect(spy).toHaveBeenCalledTimes(1);
          expect(store.getState().blog.account.logged_in).toBeFalsy();
        });
        done();
      });

      it('should get article correctly', (done) => {
        const stubArticle = {
          "id": 11,
          "author_id": 1,
          "title": "test_title",
          "content": "test_content"
        }
        const spyGet = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
          return new Promise((res, rej) => {
            const result = {
              status: 200,
              data: stubArticle
            }
            res(result);
          });
        });

        store.dispatch(actionCreators.GET_ARTICLE('11')).then(() => {
          expect(spyGet).toHaveBeenCalledTimes(1);
          expect(store.getState().blog.currentArticle).not.toBeFalsy();
        });
        done();
      });

      it('should get users', (done) => {
        const stubUsers = [
          {
            "id": 1,
            "email": "swpp@snu.ac.kr",
            "password": "iluvswpp",
            "name": "Software Lover",
            "logged_in": false
          },
          {
            "id": 2,
            "email": "alan@turing.com",
            "password": "iluvswpp",
            "name": "Alan Turing",
            "logged_in": false
          },
          {
            "id": 3,
            "email": "edsger@dijkstra.com",
            "password": "iluvswpp",
            "name": "Edsger Dijkstra",
            "logged_in": false
          }
        ];

        const spyOn = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
          return new Promise((res, rej) => {
            const result = {
              status: 200,
              data: stubUsers
            };
            res(result);
          });
        });

        store.dispatch(actionCreators.GET_USERS()).then(() => {
          expect(spyOn).toHaveBeenCalledTimes(1);
          expect(store.getState().blog.users).toEqual({
            '1': 'Software Lover',
            '2': 'Alan Turing',
            '3': 'Edsger Dijkstra'
          });
        });
        done();
      });

      it('should get comments', (done) => {
        const stubComments = [
          {
            "id": 1,
            "article_id": 0,
            "author_id": 2,
            "content": "What do you mean wow?"
          },
          {
            "id": 2,
            "article_id": 0,
            "author_id": 3,
            "content": "I was surprised"
          },
          {
            "id": 4,
            "article_id": 11,
            "author_id": 3,
            "content": "I agree with you"
          },
        ];

        const spyOn = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
          return new Promise((res, rej) => {
            const result = {
              status: 200,
              data: stubComments
            };
            res(result);
          });
        });

        store.dispatch(actionCreators.GET_COMMENTS(0, 3)).then(() => {
          expect(spyOn).toHaveBeenCalledTimes(1);
        })
        done();
      });

      it('should get articles ', (done) => {
        const stubArticles = [
          {id: 0, author_id: 1, title:'test1'}, {id: 1, author_id: 2, title:'test2'}, {id:3, author_id: 3, title:'test3'}
        ];

        const spyOnGetArticles = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
          return new Promise((res, rej) => {
            const result = {
              status: 200,
              data: stubArticles
            };
            res(result);
          })
        });

        store.dispatch(actionCreators.GET_ARTICLES()).then(() => {
          expect(spyOnGetArticles).toHaveBeenCalledTimes(1);
          expect(store.getState().blog.articles).toEqual(stubArticles);
          done();
        })
      });

      it('should post article', (done) => {
        const stubArticle = {
          author_id: 1,
          title: 'test_title',
          content: 'test_content'
        };

        const spy = jest.spyOn(axios, 'post')
        .mockImplementation((info) => {
          return new Promise((res, rej) => {
            const result = {
              status: 304,
              data: {
                ...info,
                id: 10
              }
            };
            return res(result);
          });
        });

        store.dispatch(actionCreators.POST_ARTICLE(stubArticle)).then(
          () => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
          }
        )
      });

      it('should edit article', (done) => {
        const stubArticle = {
            id: 0,
            author_id: 1,
            title: 'title',
            content: 'content'
        };
        const stubPrevArticle = {
          id: 0,
          author_id: 1,
          title: 'prevtitle',
          content: 'prevcontent'
        }

        const spyEdit = jest.spyOn(axios, 'patch')
        .mockImplementation((url, info) => {
            return new Promise((res, rej) => {
              const result = {
                status: 304,
                data: {
                  ...stubPrevArticle,
                  title: stubArticle.title,
                  content: stubArticle.content
                }
              };
              res(result);
            });
        });

        store.dispatch(actionCreators.EDIT_ARTICLE('/articles/999', stubArticle)).then(() => {
          expect(spyEdit).toHaveBeenCalledTimes(1);
          done();
        });
    });

    it('should edit comments', (done) => {
      const stubNewComment = {
        id: 0,
        author_id:0,
        article_id:0,
        content: 'asdflfgladsf'
      };

      const spyEdit = jest.spyOn(axios, 'patch')
      .mockImplementation((url, info) => {
        return new Promise((res, rej) => {
          const result = {
            status: 304,
            data: stubNewComment
          }

          res(result);
        });
      })

      store.dispatch(actionCreators.EDIT_COMMENT('path', stubNewComment)).then(() => {
        expect(spyEdit).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should delete articles', (done) => {
      const spyDel = jest.spyOn(axios, 'delete')
      .mockImplementation((url) => {
        return new Promise((res, rej) => {
          const result = {
            status: 200,
            data: spyDel
          }
          res(result);
        });
      })

      store.dispatch(actionCreators.DELETE_ARTICLE("url"))
      .then(() => {
        expect(spyDel).toHaveBeenCalledTimes(1);
        done();
      })
    });
})