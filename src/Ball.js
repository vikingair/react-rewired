// @flow

import React from 'react';
import { store, type State } from './store';

const UnwiredBall = ({ color, top, left }) => (
    <div
        className="ball"
        style={{
            backgroundColor: color,
            top: top - 20 + 'px',
            left: left - 20 + 'px',
        }}
    />
);

export const Ball = store.wire(UnwiredBall, (state: State) => ({
    top: state.ball.position.top,
    left: state.ball.position.left,
    color: state.ball.color,
}));
