import React, { Component } from 'react';
import * as boardActions from 'redux/modules/board';

class BoardView extends Component {

    componentWillMount() {
        boardActions.boardView();
    }

    render() {
        const { params } = this.props.match;
        console.log(params);
        return (
            <div>

            </div>
        );
    }
}

export default BoardView;