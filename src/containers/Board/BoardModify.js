import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as boardActions from 'redux/modules/board';

import { TextField, Button, Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

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

    handleBoardModify = async (e) => {
        const { form, BoardActions, error, history } = this.props;
        const { title, writer, contents } = form.toJS();

        const { validate } = this;

        if (error) return;
        //제목, 글이 입력되었는지
        console.log(validate['title'](title) + " // " + validate['contents'](contents));
        if (!validate['title'](title) || !validate['contents'](contents)) {
            return;
        }
        try {
            console.log("log : " + title + writer + contents);
            await BoardActions.boardModify({
                id, title, writer, contents
            })
            history.push('/board/boardList');
        } catch (e) {
            if (e.responce.status === 400) {
                return this.setError('400 error');
            }
            this.setError('알 수 없는 에러가 발생했습니다.');
        }
    }

    render() {
        const { handleChange } = this;
        const { params } = this.props.match;  //파라미터 받아오기
        return (
            <div>
                <Paper>
                    <Table>
                        <TableHead>글 작성</TableHead>
                        <TableBody>
                            <TableRow>
                                <TextField
                                    name="title"
                                    label="제목"
                                    onChange={handleChange}

                                />
                            </TableRow>
                            <TableRow>
                                <TextField
                                    name="contents"
                                    label="내용"
                                    multiline
                                    rows={10}
                                    placeholder="내용을 입력해주세요."
                                    onChange={handleChange}
                                />
                            </TableRow>
                            <TableRow>

                                <Button variant="contained" color="primary" onClick={this.handleBoardModify}>등록</Button>
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