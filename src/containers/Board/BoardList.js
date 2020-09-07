import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

class BoardList extends Component {

    render() {
        return (
            <div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.handleLoadMore}
                    hasMore={true || false}
                    loader={<div className="loader" key={0}>Loading...</div>}
                    userWindow={false}
                >
                    tttt
                </InfiniteScroll>
            </div>
        );
    }
}

export default BoardList;