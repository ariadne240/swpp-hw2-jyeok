import React, {Component} from 'react';
import './App.css';
import { ConnectedRouter } from 'connected-react-router';
import { Redirect, Route, Switch} from 'react-router-dom';
import * as actionCreator from './store/action/actionCreator';
import {connect} from 'react-redux';
import Login from './container/Login/'
import ArticleList from './container/Article/ArticleList/'
import ArticleCreate from './container/Article/ArticleCreate'
import ArticleDetail from './container/Article/ArticleDetail'
import ArticleEdit from './container/Article/ArticleEdit/'

const mapDispatchToProps = (dispatch) => {
    return {
      fetchLoginInfo: () => {
        dispatch(actionCreator.GET_LOGIN_INFO())
      }
    }
}

const mapStateToProps = (state) => {
  return {
    account: state.blog.account,
    redirectUrl: state.blog.redirectUrl
  }
}

class App extends Component {
  componentDidMount() {
    this.props.fetchLoginInfo()
  }

  componentDidUpdate() {
    if(!this.props.account.logged_in) this.props.history.push(this.props.redirectUrl);
  }

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div className="App">
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/articles' component={ArticleList} />
            <Route exact path='/articles/create' component={ArticleCreate} />
            <Route exact path='/articles/:id' component={ArticleDetail} />
            <Route exact path='/articles/:id/edit' component={ArticleEdit} />
            <Redirect to={this.props.redirectUrl} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);