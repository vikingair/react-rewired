// @flow

import { Wired } from './react-rewired';

export const store = Wired.store({
    ball: Wired.leaf({
        position: { top: 200, left: 200 },
        color: '#000000',
    }),
});

window.store = store;
export type State = typeof store.data;
