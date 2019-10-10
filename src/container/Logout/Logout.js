import React, { Component } from 'react'
import {connect} from 'react-redux';
import * as actionCreator from '../../store/action/actionCreator';

const Logout = (props) => { 
        const logoutHandler = () => {
            props.onLogout(props.account)
            props.history.push('/login')
        }
        
        return (
            <div className="Logout">
                <br/><br/><button id="logout-button" onClick={logoutHandler}> Logout! </button>
            </div>
        )   
    }

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: (account) => {
            dispatch(actionCreator.LOGOUT(account))            
        },
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.blog.account
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);