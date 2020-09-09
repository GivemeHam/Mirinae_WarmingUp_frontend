import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroller';
import * as boardActions from 'redux/modules/board';
import storage from '../../lib/storage';
import axios from 'axios';

const api = {
    baseUrl: 'http://localhost:4000'
};

class BoardList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tracks: [],
            hasMoreItems: true,
            nextHref: null
        };
    }


    componentWillMount() {
        boardActions.boardList();
    }

    loadItems(page) {
        var self = this;

        var url = api.baseUrl + '/api/board/boardList';
        if (this.state.nextHref) {
            url = this.state.nextHref;
        }
        axios.get(url, {
            //  linked_partitioning: 1,
            //   page_size: 10
        }, {
            cache: true
        })
            .then(function (response) {
                if (response) {
                    var tracks = self.state.tracks;

                    //console.log(tracks);

                    response.data.map((track, i) => {
                        if (track.artwork_url == null) {
                            track.artwork_url = '/board/boardView/' + track['_id'];
                            //console.log(track);
                        }
                        // console.log(track.artwork_url);
                        tracks.push(track);
                    });

                    if (response.next_href) {
                        self.setState({
                            tracks: tracks,
                            nextHref: response.next_href
                        });
                    } else {
                        self.setState({
                            hasMoreItems: false
                        });
                    }
                }
            });
    }
    render() {
        const loader = <div className="loader">Loading ...</div>;

        let items = [];
        console.log(this.state);
        this.state.tracks.map((track, i) => {
            items.push(
                <div className="track" key={i}>
                    <a href={track.artwork_url} target="_blank">
                        {track.title} / {track.writer} / {track.createAt}
                    </a>
                </div>
            );
        });
        //let data = storage.get("boardList");
        //console.log(data.length);


        return (
            <div>
                제목 / 작성자 / 작성날짜
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadItems.bind(this)}
                    hasMore={true || false}
                    loader={loader}
                    userWindow={false}
                >
                    <div className="tracks">
                        {items}
                    </div>
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