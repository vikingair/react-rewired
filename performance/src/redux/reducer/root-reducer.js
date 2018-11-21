// @flow

import { combineReducers } from 'redux';
import { oneInputReducer } from './one-input-reducer';
import { deeplyNestedReducer } from './deeply-nested-reducer';
import { manyFlatReducer } from './many-flat-reducer';
import { liveCodingReducer } from './live-coding-reducer';
import { manyComponentsReducer } from './many-components-reducer';

export const rootReducer = combineReducers({
    oneInput: oneInputReducer,
    deeplyNested: deeplyNestedReducer,
    manyFlat: manyFlatReducer,
    manyComponents: manyComponentsReducer,
    liveCoding: liveCodingReducer,
});
