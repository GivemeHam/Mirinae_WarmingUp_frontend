import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroller';
import * as boardActions from 'redux/modules/board';
import storage from '../../lib/storage';
import axios from 'axios';
import { Button, Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import MUIRichTextEditor from 'mui-rte';

//sample
import { Container, Box } from '@material-ui/core';

const api = {
    baseUrl: 'http://localhost:4000'
};
let loader = <div className="loader">Loading ...</div>;


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
        //    boardActions.boardList();
    }

    loadItems(page) {
        if (!this.state.hasMoreItems) return;
        var self = this;

        let limit_value = 5;                //몇개 출력
        let skip_value = limit_value * page;  //몇개 스킵

        var url = api.baseUrl + `/api/board/findBoardForInfiniteScroll/0/${limit_value}`;

        let next_url = `/api/board/findBoardForInfiniteScroll/${skip_value}/${limit_value}`;

        if (this.state.nextHref) {
            url = this.state.nextHref;
        }

        axios.get(url, {
            //  linked_partitioning: 1,
            page_size: 3
        }, {
            cache: true
        })
            .then(function (response) {
                if (response) {
                    var tracks = self.state.tracks;

                    response.data.map((track, i) => {
                        track.board_id = track['_id'];
                        tracks.push(track);
                    });

                    if (response.data.length !== 0) {
                        self.setState({
                            tracks: tracks,
                            nextHref: next_url
                        });
                    } else {
                        loader = <div>끝</div>;
                        self.setState({
                            hasMoreItems: false
                        });
                    }
                }
            });
    }

    deleteBoard = (id, event) => {
        event.preventDefault();
        axios.delete(`http://localhost:4000/api/board/boardDelete/` + id)
            .then(res => {
                //this.setState({ redirect: "/board/boardList" });

                window.location.replace("/board/boardList");
            })
    }
    modifyBoard = (id, title, contents, event) => {
        event.preventDefault();
        storage.set("modify_id", id);
        storage.set("modify_title", title);
        storage.set("modify_contents", contents);
        window.location = `/board/boardModify`;

    }
    state = { redirect: null };
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        let items = [];
        this.state.tracks.map((track, i) => {
            const parsed_data = JSON.parse(track.contents);

            items.push(
                <div>
                    <Box bgcolor="" p={1} border={1} borderRadius={16} marginTop={2}>
                        <TableCell>
                            <TableRow className="tracks">
                                <TableCell>No.{i + 1}</TableCell>
                                <TableCell>{track.title}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>작성자 : {track.writer}</TableCell>
                                <TableCell>작성날짜 : {track.createAt}</TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell>내용</TableCell>
                                <TableCell>
                                    <MUIRichTextEditor
                                        id="contents"
                                        defaultValue={JSON.stringify(parsed_data)}
                                        onSave={this.saveContents}
                                        inlineToolbar={true}
                                        readOnly={true}
                                        controls={["my-style"]}
                                        customControls={[
                                            {
                                                name: "my-style",
                                                type: "inline",
                                                inlineStyle: {
                                                    backgroundColor: "black",
                                                    color: "white"
                                                }
                                            }
                                        ]}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableCell>
                        <TableCell>
                            <TableRow>
                                <Button variant="outlined" color="primary" onClick={(e) => this.modifyBoard(track.board_id, track.title, track.contents, e)}>수정</Button>
                                <Button variant="outlined" color="secondary" onClick={(e) => this.deleteBoard(track.board_id, e)}>삭제</Button>
                            </TableRow>
                        </TableCell>
                    </Box>
                </div>
            );
        });
        //let data = storage.get("boardList");
        //console.log(data.length);


        return (
            <div>
                <Container bgcolor="palevioletred">
                    <Paper>
                        <Table>
                            <TableHead>
                                <Box border={2}>
                                    <TableRow>
                                        <TableCell>List</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" href="/board/boardWrite">작성</Button>
                                        </TableCell>
                                    </TableRow>
                                </Box>
                            </TableHead>
                            <TableBody>
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={this.loadItems.bind(this)}
                                    hasMore={true || false}
                                    loader={loader}
                                    userWindow={false}
                                    threshold={10}
                                >
                                    {items}
                                </InfiniteScroll>
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>
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