// @flow

import React from 'react';
import { Store } from './store';
import type { State } from './store';
import { RerenderCounter } from './RerenderCounter';

type BallStoreProps = {| color: string, top: number, left: number |};
type BallOwnProps = {||};
type BallProps = {| ...BallOwnProps, ...BallStoreProps |};

const BallContainer = ({ color, top, left }: BallProps) => (
    <div
        className="ball"
        style={{
            backgroundColor: color,
            top: top - 20 + 'px',
            left: left - 20 + 'px',
        }}>
        <RerenderCounter name="Ball" />
    </div>
);

export const Ball = Store.wire<BallStoreProps, BallOwnProps>(BallContainer, (state: State) => ({
    top: state.ball.position.top,
    left: state.ball.position.left,
    color: state.ball.color,
}));
