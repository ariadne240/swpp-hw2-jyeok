import React, { Component } from 'react'
import {connect} from 'react-redux';
import * as actionCreator from '../../store/action/actionCreator';

class Logout extends Component { 
    render() {
        const logoutHandler = () => {
            this.props.onLogout(this.props.account)
            this.props.history.push('/login')
        }
        
        return (
        <div>
            <div className="Logout">
                <br/><br/><button id="logout-button" onClick={logoutHandler}> {this.props.account.name}, Logout! </button>
            </div>
        </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: (account) => {
            dispatch(actionCreator.LOGOUT(account))            
        },

        fetchLoginInfo: () => {
            dispatch(actionCreator.GET_LOGIN_INFO())
        }
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.blog.account
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);