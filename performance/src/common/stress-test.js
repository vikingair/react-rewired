// @flow

import React from 'react';
import { EventDispatcher } from './event-dispatcher';

// optimized as much as possible
// call this function without arguments to generate a new uuid
type UuidParam = void;
const uuid = (a: UuidParam): string =>
    a ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16) : (([1e7]: any) + -1e3 + -4e3).replace(/[018]/g, uuid);

const doXTimes = (times: number, handler: number => void) => () => {
    let counter = 0;
    const start = performance.now();
    const _handler = () => {
        counter++;
        handler(counter);
        if (counter === times) console.log('duration ms', Math.ceil(performance.now() - start));
    };
    for (let i = 0; i < times; i++) window.setTimeout(_handler, 0);
};

const changeXTimesInput = (times: number, inputId: string) => () => {
    const input = document.getElementById(inputId);
    if (input && input.tagName.toLowerCase() === 'input')
        doXTimes(times, index => EventDispatcher.change(input, String(index) + ' - ' + uuid()))();
};

// 100'000 changes take for both ~ 200 sec
// 10'000 changes take for both ~ 15 - 16 sec --> should be the ideal choice for demonstration
// 1'000 changes take for both ~ 1.5 - 1.6 sec
const ButtonChangeX = ({ inputId, times }: {| inputId: string, times: number |}) => (
    <button onClick={changeXTimesInput(times, inputId)}>Change {times} times</button>
);

const ButtonDoX = ({ onClick, times }: {| onClick: number => void, times: number |}) => (
    <button onClick={doXTimes(times, onClick)}>Do {times} times</button>
);

export const StressTest = { ButtonChangeX, ButtonDoX };
