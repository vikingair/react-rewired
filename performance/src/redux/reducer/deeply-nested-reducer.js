// @flow

import { combineReducers } from 'redux';
import type { Action } from './action-types';

const endpointReducer = (state: number = 0, action: Action) => {
    switch (action.type) {
        case 'DEEP_UPDATE':
            return action.update;
        default:
            return state;
    }
};

export const deeplyNestedReducer = combineReducers({
    a: combineReducers({
        b: combineReducers({
            c: combineReducers({
                d: combineReducers({ e: combineReducers({ f: combineReducers({ g: endpointReducer }) }) }),
            }),
        }),
    }),
});
