import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'redux/modules/base';
import { Route } from 'react-router-dom';
import { Login, Register } from 'containers/Auth';
import { BoardList } from 'containers/Board';

class Auth extends Component {
    render() {
        return (
            <div>
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/register" component={Register} />
                <Route path="/auth/test" component={BoardList} />
            </div>
        );
    }
}

export default connect(
    (state) => ({
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Auth);