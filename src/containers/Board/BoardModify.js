import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as boardActions from 'redux/modules/board';
import axios from 'axios';
import storage from '../../lib/storage';
import MUIRichTextEditor from 'mui-rte';

import { TextField, Button, Paper, Table, TableHead, TableBody, TableRow } from '@material-ui/core';

class BoardModify extends Component {

    componentWillMount() {
        const { BoardActions } = this.props;
        BoardActions.initializeForm('register');


    }

    setError = (message) => {
        const { BoardActions } = this.props;
        BoardActions.setError({
            form: 'register',
            message
        });
    }

    validate = {
        title: (value) => {
            if (!value) {
                this.setError('제목을 입력하세요.');
                return false;
            }
            return true;
        },
        contents: (value) => {
            if (!value) {
                this.setError('내용을 입력하세요.');
                return false;
            }
            return true;
        }

    }

    handleChange = (e) => {
        const { BoardActions } = this.props;
        const { name, value } = e.target;

        BoardActions.changeInput({
            name,
            value,
            form: 'register'
        });
    }


    save = (data) => {
        const id = storage.get("params_id");
        const title = storage.get("params_title");

        this.handleBoardModify(id, title, data);

    };

    handleBoardModify = async (id, title, ctnt_data) => {
        const { error, history } = this.props;
        //let { id, title } = form.toJS();
        const contents = ctnt_data;
        const { validate } = this;



        if (error) return;
        //제목, 글이 입력되었는지
        if (!validate['title'](title)) {
            //title = params_title;
            //return;
        }
        if (!validate['contents'](contents)) {

            alert("저장눌러주세요.");
            return;
            //return;
        }
        try {
            await axios.patch(`http://localhost:4000/api/board/boardUpdate/${id}`, { title, contents })
                .then(res => {

                })

            history.push('/board/boardList');
        } catch (e) {
            /*if (e.res.status === 400) {
                return this.setError('400 error');
            }*/
            this.setError('알 수 없는 에러가 발생했습니다.');
        }
    }
    render() {
        const { handleChange } = this;
        //const { params } = this.props.match;  //파라미터 받아오기

        storage.set("params_id", storage.get("modify_id"));
        storage.set("params_title", storage.get("modify_title"));
        const contents = storage.get("modify_contents")

        return (
            <div>
                <Paper>
                    <Table>
                        <TableHead>글 수정</TableHead>
                        <TableBody>
                            <TableRow>
                                <TextField
                                    name="id"
                                    type="hidden"
                                    value={storage.get("modify_id")}>

                                </TextField>
                                <TextField
                                    name="title"
                                    label="제목"
                                    defaultValue={storage.get("modify_title")}
                                    onChange={handleChange}

                                />
                            </TableRow>
                            <TableRow>
                                <MUIRichTextEditor
                                    id="contents"
                                    defaultValue={JSON.stringify(contents)}
                                    onSave={this.save}
                                    inlineToolbar={true}

                                >


                                </MUIRichTextEditor>
                            </TableRow>
                            <br />
                            <br />
                            <TableRow>

                                {/*<Button variant="contained" color="primary" onClick={() => this.handleBoardModify(`${params.id}`, `${params.title}`, `${params.contents}`)}>수정</Button>*/}
                                <Button variant=" contained" color="primary" href="/board/boardList">목록</Button>

                            </TableRow>
                        </TableBody>

                    </Table>
                </Paper>
            </div >
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
)(BoardModify);