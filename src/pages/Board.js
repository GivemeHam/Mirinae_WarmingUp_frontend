import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'redux/modules/base';
import { Route } from 'react-router-dom';

import { BoardList, BoardWrite, BoardView } from 'containers/Board';

class Board extends Component {
    render() {
        return (
            <div>
                <Route path="/board/boardList" component={BoardList} />
                <Route path="/board/boardWrite" component={BoardWrite} />
                <Route path="/board/boardView" component={BoardView} />
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
)(Board);