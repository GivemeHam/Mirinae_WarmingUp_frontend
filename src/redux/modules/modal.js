import { createAction, handleActions } from 'redux-actions';

//moal
const CHANGE_PAGE = 'board/CHANGE_PAGE';
const CLICK_ROW = 'board/CLICK_ROW';
const CLOSE_MODAL = 'board/CLOSE_MODAL';



//생성 함수 추가
export const clickRow = (rowData) => ({
    type: CLICK_ROW,
    payload: rowData
})

export const closeModal = () => ({
    type: CLOSE_MODAL,
})


//modal
const initialState = {
    pageNumber: 0,
    pageSize: "",//BOARD_PAGE_SIZE,
    selectedData: [],
    isModalOpen: false, // 모달을 열거나 닫을 때 사용한다.
    modalData: {} // 모달을 열었을 때 보여줄 데이터
}

export default handleActions({
    [CHANGE_PAGE]: (state, action) => ({
        ...state,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
        selectedData: action.payload.selectedData
    }),
    [CLICK_ROW]: (state, action) => ({ // 모달을 연다
        ...state,
        isModalOpen: true,
        modalData: action.payload,
    }),
    [CLOSE_MODAL]: (state, action) => ({ // 모달을 닫는다.
        ...state,
        isModalOpen: false,
        modalData: {},
    })
}, initialState);
