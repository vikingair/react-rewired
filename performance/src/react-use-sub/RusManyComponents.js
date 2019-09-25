// @flow

import React from 'react';
import { RusStore, useRusSub } from './rus-store';
import { StressTest } from '../common/stress-test';

const componentNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const RusComponent = ({ name }: {| name: string |}) => {
    const { num } = useRusSub(({ manyComponents }) => ({ num: manyComponents }));
    return (
        <div className="key-and-num">
            {name}: {num}
        </div>
    );
};

const ManyComponents = (): Array<React$Node> =>
    componentNames.map((name, key) => <RusComponent name={name} key={key} />);

const onClick = (num: number) => RusStore.set({ manyComponents: num });

let renderCounter = 0;
export const RusManyComponents = () => (
    <div className="many-components">
        <ManyComponents />
        <StressTest.ButtonDoX onClick={onClick} times={10000} />
        <div className="render-counter">{++renderCounter}</div>
    </div>
);
