// @flow

import { type Action } from './action-types';

export const manyComponentsReducer = (state: number = 0, action: Action) => {
    switch (action.type) {
        case 'MANY_COMPONENTS_UPDATE':
            return action.update;
        default:
            return state;
    }
};
