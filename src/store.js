// @flow

import { Wired } from './react-rewired';

type BallState = { position: { top: number, left: number }, color: string };
const ballInitialState: BallState = { position: { top: 200, left: 200 }, color: '#000000' };

export type State = {
    ball: BallState,
};

export const Store = Wired.store({
    ball: Wired.node(ballInitialState),
});

window.Store = Store;
