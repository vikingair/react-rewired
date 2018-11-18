// @flow

import { Wired, type WiredNode } from './react-rewired';

type BallState = { position: { top: number, left: number }, color: string };
const ballInitialState: BallState = { position: { top: 200, left: 200 }, color: '#000000' };

type Rerenders = { App: number, Ball: number };
export type RerenderKeys = $Keys<Rerenders>;
const initialRerenders: Rerenders = { App: 0, Ball: 0 };

export type State = {
    ball: WiredNode<BallState>,
    rerenders: WiredNode<Rerenders>,
};

export const Store = Wired.store<State>({
    ball: Wired.node(ballInitialState),
    rerenders: Wired.node(initialRerenders),
});
