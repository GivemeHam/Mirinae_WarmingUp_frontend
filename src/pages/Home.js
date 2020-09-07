import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'redux/modules/base';
import { Route } from 'react-router-dom';

import { BoardList } from 'containers/Board';

class Home extends Component {
    render() {
        return (
            <div>
                home
                <Route path="/Board" component={BoardList} />

            </div>
        );
    }
}

export default Home;