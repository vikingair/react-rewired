// @flow

import React from 'react';
import { RusStore, useRusSub } from './rus-store';
import { StressTest } from '../common/stress-test';

const flatNames = 'abcdefghijklmnopqrstuvwxyz'.split('');

const manyFlatUpdate = (next: number): { [string]: number } =>
    flatNames.reduce((p, c) => {
        p[c] = next;
        return p;
    }, {});

const onClick = (num: number) => RusStore.set({ manyFlat: manyFlatUpdate(num) });

let renderCounter = 0;
export const RusManyFlat = () => {
    const { manyFlat } = useRusSub(({ manyFlat }) => ({ manyFlat }));
    return (
        <div className="many-flat">
            {Object.keys(manyFlat).map(key => (
                <div className="key-and-num" key={key}>
                    {key}: {manyFlat[key]}
                </div>
            ))}
            <StressTest.ButtonDoX onClick={onClick} times={50000} />
            <div className="render-counter">{++renderCounter}</div>
        </div>
    );
};
