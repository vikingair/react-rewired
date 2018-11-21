// @flow

import { combineReducers } from 'redux';
import type { Action } from './action-types';

const flatReducer = (state: number = 0, action: Action) => {
    switch (action.type) {
        case 'FLAT_UPDATE':
            return action.update;
        default:
            return state;
    }
};

const flatReducers = 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((p, c) => (p[c] = flatReducer) && p, {});

export const manyFlatReducer = combineReducers({
    ...flatReducers,
});
