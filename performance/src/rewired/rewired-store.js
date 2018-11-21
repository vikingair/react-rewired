// @flow

import { Wired, type WiredNode } from 'react-rewired';

type OneInputState = { value: string, color: string };
const initialOneInput = {
    value: '',
    color: '#eeff8e',
};

const deeplyNested = Wired.node({
    a: Wired.node({
        b: Wired.node({ c: Wired.node({ d: Wired.node({ e: Wired.node({ f: Wired.node({ g: 0 }) }) }) }) }),
    }),
});

const initialManyFlat: { [string]: number } = 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .reduce((p, c) => (p[c] = 0) || p, {});

type LifeCodingState = {};

type State = {
    oneInput: WiredNode<OneInputState>,
    deeplyNested: typeof deeplyNested,
    manyFlat: typeof initialManyFlat,
    liveCoding: WiredNode<LifeCodingState>,
    manyComponents: number,
};

export const RewiredStore = Wired.store<State>({
    oneInput: Wired.node(initialOneInput),
    deeplyNested,
    manyFlat: Wired.node(initialManyFlat),
    liveCoding: Wired.node({}),
    manyComponents: 0,
});

window.RewiredStore = RewiredStore;
