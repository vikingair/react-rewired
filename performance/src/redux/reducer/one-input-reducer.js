// @flow

import { combineReducers } from 'redux';
import { type Action } from './action-types';
import { Util } from '../../common/util';

const valueReducer = (state: string = '', action: Action) => {
    switch (action.type) {
        case 'ONE_INPUT_CHANGED':
            return action.change;
        default:
            return state;
    }
};

const colorReducer = (state: string = '#eeff8e', action: Action) => {
    switch (action.type) {
        case 'ONE_INPUT_CHANGED':
            return Util.randomColor();
        default:
            return state;
    }
};

export const oneInputReducer = combineReducers({ value: valueReducer, color: colorReducer });
