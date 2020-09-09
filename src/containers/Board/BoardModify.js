import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as boardActions from 'redux/modules/board';
import axios from 'axios';
import storage from '../../lib/storage';

import { TextField, Button, Paper, Table, TableHead, TableBody, TableRow, TableCell, Icon } from '@material-ui/core';
import Board from '../../pages/Board';


//import { RichTextEditor } from 'components/Board';

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

    handleBoardModify = async (params_id, params_title, params_contents) => {
        const { form, error, history } = this.props;

        console.log(form);
        let { id, title, contents } = form.toJS();
        const { validate } = this;
        if (error) return;
        //제목, 글이 입력되었는지
        console.log(title);
        if (!validate['title'](title)) {
            title = params_title;
            //return;
        }
        if (!validate['contents'](contents)) {
            contents = params_contents;
            //return;
        }
        try {
            await axios.patch(`http://localhost:4000/api/board/boardUpdate/${params_id}`, { title, contents })
                .then(res => {

                })

            history.push('/board/boardList');
        } catch (e) {
            console.log("e : " + e);
            /*if (e.res.status === 400) {
                return this.setError('400 error');
            }*/
            this.setError('알 수 없는 에러가 발생했습니다.');
        }
    }

    render() {
        const { handleChange } = this;
        const { params } = this.props.match;  //파라미터 받아오기

        console.log(params);
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
                                    value={params.id}>

                                </TextField>
                                <TextField
                                    name="title"
                                    label="제목"
                                    defaultValue={params.title}
                                    onChange={handleChange}

                                />
                            </TableRow>
                            <TableRow>
                                <TextField
                                    name="contents"
                                    label="내용"
                                    multiline
                                    rows={10}
                                    defaultValue={params.contents}
                                    onChange={handleChange}
                                />
                            </TableRow>
                            <TableRow>

                                <Button variant="contained" color="primary" onClick={() => this.handleBoardModify(`${params.id}`, `${params.title}`, `${params.contents}`)}>수정</Button>
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