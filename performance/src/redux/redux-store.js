// @flow

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducer/root-reducer';

export const ReduxStore = createStore(rootReducer, applyMiddleware(thunk));

window.ReduxStore = ReduxStore;
