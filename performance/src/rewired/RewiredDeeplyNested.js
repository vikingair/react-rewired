// @flow

import React from 'react';
import { RewiredStore } from './rewired-store';
import { StressTest } from '../common/stress-test';

const onClick = (num: number) =>
    RewiredStore.set({ deeplyNested: { a: { b: { c: { d: { e: { f: { g: num } } } } } } } });

type RewiredDeeplyNestedStoreProps = {| num: number |};
type RewiredDeeplyNestedOwnProps = {||};
type RewiredDeeplyNestedProps = {| ...RewiredDeeplyNestedStoreProps, ...RewiredDeeplyNestedOwnProps |};

let renderCounter = 0;
const RewiredDeeplyNestedContainer = ({ num }: RewiredDeeplyNestedProps) => (
    <div className="deeply-nested">
        <div className="big-num">{num}</div>
        <StressTest.ButtonDoX onClick={onClick} times={100000} />
        <div className="render-counter">{++renderCounter}</div>
    </div>
);

export const RewiredDeeplyNested = RewiredStore.wire<RewiredDeeplyNestedStoreProps, RewiredDeeplyNestedOwnProps>(
    RewiredDeeplyNestedContainer,
    ({ deeplyNested }) => ({
        num: deeplyNested.a.b.c.d.e.f.g,
    })
);
