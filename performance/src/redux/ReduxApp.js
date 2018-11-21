// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { ReduxAppContent } from './ReduxAppContent';
import { ReduxStore } from './redux-store';
import { type RouteValue } from '../routes';

type ReduxAppProps = {| current: RouteValue |};

export const ReduxApp = ({ current }: ReduxAppProps) => (
    <Provider store={ReduxStore}>
        <ReduxAppContent current={current} />
    </Provider>
);
