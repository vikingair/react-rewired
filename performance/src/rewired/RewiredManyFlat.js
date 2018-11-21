// @flow

import React from 'react';
import { RewiredStore } from './rewired-store';
import { StressTest } from '../common/stress-test';

const flatNames = 'abcdefghijklmnopqrstuvwxyz'.split('');

const manyFlatUpdate = (next: number): { [string]: number } =>
    flatNames.reduce((p, c) => {
        p[c] = next;
        return p;
    }, {});

const onClick = (num: number) => RewiredStore.set({ manyFlat: manyFlatUpdate(num) });

type RewiredManyFlatStoreProps = {| manyFlat: { [string]: number } |};
type RewiredManyFlatOwnProps = {||};
type RewiredManyFlatProps = {| ...RewiredManyFlatStoreProps, ...RewiredManyFlatOwnProps |};

let renderCounter = 0;
const RewiredManyFlatContainer = ({ manyFlat }: RewiredManyFlatProps) => (
    <div className="many-flat">
        {Object.keys(manyFlat).map(key => (
            <div className="key-and-num" key={key}>
                {key}: {manyFlat[key]}
            </div>
        ))}
        <StressTest.ButtonDoX onClick={onClick} times={2000} />
        <div className="render-counter">{++renderCounter}</div>
    </div>
);

export const RewiredManyFlat = RewiredStore.wire<RewiredManyFlatStoreProps, RewiredManyFlatOwnProps>(
    RewiredManyFlatContainer,
    ({ manyFlat }) => ({ manyFlat })
);
