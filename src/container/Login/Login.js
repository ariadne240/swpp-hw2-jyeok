import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actionCreator from '../../store/action/actionCreator';

class Login extends Component {
    state = {
        account : {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        this.props.fetchLoginInfo();
    }   

    componentDidUpdate(prevProps, prevState) {
        if(this.props.account.logged_in) this.props.history.push('/articles')
    }
    
    render() { 
        const loginHandler = () => {
            this.props.onLogin(
                this.state.account.email,
                this.state.account.password
            );
        }

        return (
             <div>
                <h1>Login</h1>
                <div className='LoginForm'>
                    Email: <input type="email" name="email-input" id="email-input" onChange={(e) => 
                    this.setState({
                        account: {
                            ...this.state.account,
                            email: e.target.value
                        }
                    })}/>
                    <br/>
                    Passowrd: <input type='password' name='pw-input' id='pw-input' onChange={(e) => this.setState({
                        account: {
                            ...this.state.account,
                            password: e.target.value
                        }
                    })}/>
                    <br/>
                    <button id="login-button" onClick={() => loginHandler()}>Login</button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email, password) => {
            dispatch(actionCreator.LOGIN(email, password));
        },

        fetchLoginInfo: () => {
            dispatch(actionCreator.GET_LOGIN_INFO());
        }
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.blog.account,
        redirectUrl: state.blog.redirectUrl
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);