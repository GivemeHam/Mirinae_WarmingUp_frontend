import React, { Component } from 'react';
import { TextField, Button } from "@material-ui/core";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as boardActions from 'redux/modules/board';

//import { RichTextEditor } from 'components/Board';

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
        console.log(this.props);
        const { title, writer, contents } = form.toJS();
        console.log("1");

        const { validate } = this;
        console.log("2");

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
            history.push('/');
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
                글작성
                <br />
                <TextField
                    name="title"
                    label="제목"
                    onChange={handleChange}

                />
                <br />
                <TextField
                    name="contents"
                    label="내용"
                    multiline
                    rows={10}
                    placeholder="내용을 입력해주세요."
                    onChange={handleChange}
                />
                <Button variant="contained" color="primary" onClick={this.handleBoardRegister}>등록</Button>
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
)(BoardWrite);