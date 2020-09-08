import { combineReducers } from 'redux';
import base from './base';
import board from './board';

export default combineReducers({
    base,
    board
});