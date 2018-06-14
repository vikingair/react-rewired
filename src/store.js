// @flow

import { Wire } from './wired-react';

export const store = Wire.store({
    ball: Wire.leaf({
        position: { top: 200, left: 200 },
        color: '#000000',
    }),
});

window.store = store;
export type State = typeof store.data;
