import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as boardActions from 'redux/modules/board';
import MUIRichTextEditor from 'mui-rte';
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import { TextField, Button, Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

let ctnt_data;
const save = (data) => {
    console.log(data);
    ctnt_data = data;
};

class BoardWrite extends Component {

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

    handleBoardRegister = async (e) => {
        const { form, BoardActions, error, history } = this.props;
        const { title, writer } = form.toJS();

        const contents = ctnt_data;
        console.log(contents);

        const { validate } = this;

        if (error) return;
        //제목, 글이 입력되었는지
        console.log(validate['title'](title) + " // " + validate['contents'](contents));
        if (!validate['title'](title) || !validate['contents'](contents)) {
            return;
        }
        try {
            console.log("log : " + title + writer + contents);
            await BoardActions.boardRegister({
                title, writer, contents
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
                                <MUIRichTextEditor
                                    id="contents"
                                    label="Type something here..."
                                    onSave={save}
                                    inlineToolbar={true}

                                >
                                </MUIRichTextEditor>
                            </TableRow>
                            <br />
                            <br />
                            <TableRow>
                                <Button variant="contained" color="primary" onClick={this.handleBoardRegister}>등록</Button>
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
)(BoardWrite);