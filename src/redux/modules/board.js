import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map } from 'immutable';
import * as BoardAPI from 'lib/board';

//액션 타입
const CHANGE_INPUT = 'board/CHANGE_INPUT';   //인풋값 변경

const INITIALIZE_FORM = 'board/INITIALIZE_FORM';
const BOARD_REGISTER = 'board/BOARD_REGISTER';
const BOARD_LIST = 'board/BOARD_LIST';
const BOARD_VIEW = 'board/BOARD_VIEW';
//const BOARD_DELETE = 'board/BOARD_DELETE';

const SET_ERROR = 'board/SET_ERROR';


//액션 생성 함수
export const changeInput = createAction(CHANGE_INPUT); //form,name,value

export const initializeForm = createAction(INITIALIZE_FORM);
export const boardRegister = createAction(BOARD_REGISTER, BoardAPI.boardRegister);
export const boardList = createAction(BOARD_LIST, BoardAPI.boardList);
export const boardView = createAction(BOARD_VIEW, BoardAPI.boardView);
//export const boardDelete = createAction(BOARD_DELETE, BoardAPI.boardDelete);

export const setError = createAction(SET_ERROR);



//리듀서 초기값
const initialState = Map({
    register: Map({
        form: Map({
            id: '',
            title: '',
            writer: 'guest',
            contents: ''
        }),
        error: null
    }),
    reusult: Map({})
});



//리듀서
export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, 'form', name], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
        const initializeForm = initialState.get(action.payload);
        return state.set(action.payload, initializeForm);
    },
    ...pender({
        type: BOARD_REGISTER,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),
    [BOARD_LIST]: (state, action) => {
        return state.set('result', Map(action.payload.data))
    },
    [SET_ERROR]: (state, action) => {
        const { form, message } = action.payload;
        return state.setIn([form, 'error'], message);
    }

}, initialState);