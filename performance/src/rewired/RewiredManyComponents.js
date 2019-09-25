// @flow

import React from 'react';
import { RewiredStore } from './rewired-store';
import { StressTest } from '../common/stress-test';

const componentNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

type RewiredComponentStoreProps = {| num: number |};
type RewiredComponentOwnProps = {| name: string |};
type RewiredComponentProps = {| ...RewiredComponentStoreProps, ...RewiredComponentOwnProps |};

const RewiredComponentContainer = ({ name, num }: RewiredComponentProps) => (
    <div className="key-and-num">
        {name}: {num}
    </div>
);

const RewiredComponent = RewiredStore.wire<RewiredComponentStoreProps, RewiredComponentOwnProps>(
    RewiredComponentContainer,
    ({ manyComponents }) => ({ num: manyComponents })
);

const ManyComponents = (): Array<React$Node> =>
    componentNames.map((name, key) => <RewiredComponent name={name} key={key} />);

const onClick = (num: number) => RewiredStore.set({ manyComponents: num });

let renderCounter = 0;
export const RewiredManyComponents = () => (
    <div className="many-components">
        <ManyComponents />
        <StressTest.ButtonDoX onClick={onClick} times={10000} />
        <div className="render-counter">{++renderCounter}</div>
    </div>
);
