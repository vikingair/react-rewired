// @flow

import React from 'react';
import { RusStore, useRusSub } from './rus-store';
import { StressTest } from '../common/stress-test';

const onClick = (num: number) => RusStore.set({ deeplyNested: { a: { b: { c: { d: { e: { f: { g: num } } } } } } } });

let renderCounter = 0;
export const RusDeeplyNested = () => {
    const { num } = useRusSub(({ deeplyNested }) => ({ num: deeplyNested.a.b.c.d.e.f.g }));
    return (
        <div className="deeply-nested">
            <div className="big-num">{num}</div>
            <StressTest.ButtonDoX onClick={onClick} times={100000} />
            <div className="render-counter">{++renderCounter}</div>
        </div>
    );
};
