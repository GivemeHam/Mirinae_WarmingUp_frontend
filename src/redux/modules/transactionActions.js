export const SET_TRANSACTION_LIST = 'transaction/SET_TRANSACTION_LIST';

export function setTransactionList(transactions) {
    return {
        type: SET_TRANSACTION_LIST,
        payload: transactions
    };
}

const initState = {
    ids: [],
    entities: {},
};

export default (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_TRANSACTION_LIST: {
            const ids = payload.map(entity => entity['id']);
            const entities = payload.reduce((finalEntities, entity) => ({
                ...finalEntities,
                [entity['id']]: entity,
            }), {});
            return { ...state, ids, entities };
        }
        default:
            return state;
    }
};