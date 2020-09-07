import { createStore } from 'redux';

import modules from './modules';
import { initial } from 'lodash';

const configureStore = (initialState) => {
    const store = createStore(modules, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    if (module.hot) {
        module.hot.accept('./modules', () => {
            const nextRootReducer = require('./modules').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

export default configureStore;