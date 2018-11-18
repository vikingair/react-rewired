// @flow

import { type RerenderKeys, Store } from './store';

const increaseCounter = (name: RerenderKeys) =>
    Store.set(({ rerenders }) => ({ rerenders: { [name]: rerenders[name] + 1 } }));

const increaseCounterNextTick = (name: RerenderKeys) => window.setTimeout(() => increaseCounter(name), 0);

type RerenderCounterProps = {| name: RerenderKeys |};

export const RerenderCounter = ({ name }: RerenderCounterProps) => {
    increaseCounterNextTick(name);
    return null;
};
