import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as actionCreator from './store/action/actionCreator';

class test extends Component {
    constructor(props) {
        super(props);
        this.props.onLoad();
    }

    render() {
        return (
            <div>
                {console.log(this.props.userInfo)}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad: (id) => {
            dispatch(actionCreator.GET_USERS());
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo : state.blog.users
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(test);