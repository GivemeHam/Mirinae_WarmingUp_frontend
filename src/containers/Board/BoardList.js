import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroller';
import * as boardActions from 'redux/modules/board';

class BoardList extends Component {

    componentWillMount() {
        //this.props = boardActions.boardList();
    }
    render() {

        console.log(this.props);
        const { form } = this.props;
        const { title, writer, contents } = form.toJS();

        return (
            <div>

                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.handleLoadMore}
                    hasMore={true || false}
                    loader={<div className="loader" key={0}>Loading...</div>}
                    userWindow={false}
                >
                    {title} / {writer} / {contents}
                </InfiniteScroll>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        form: state.board.getIn(['register', 'form']),
        //error: state.board.getIn(['register', 'error']),
        //result: state.board.get('result')
    }),
    (dispatch) => ({
        BoardActions: bindActionCreators(boardActions, dispatch)
    })
)(BoardList);