// @flow

import { combineReducers } from 'redux';
import type { Action } from './action-types';

const dummyReducer = (state: number = 0, action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const liveCodingReducer = combineReducers({ dummy: dummyReducer });
