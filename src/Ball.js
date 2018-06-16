// @flow

import React from 'react';
import { Store } from './store';

export const Ball = Store.wire(
    ({ color, top, left }: { color: string, top: number, left: number }) => (
        <div
            className="ball"
            style={{
                backgroundColor: color,
                top: top - 20 + 'px',
                left: left - 20 + 'px',
            }}
        />
    ),
    state => ({
        top: state.ball.position.top,
        left: state.ball.position.left,
        color: state.ball.color,
    })
);
