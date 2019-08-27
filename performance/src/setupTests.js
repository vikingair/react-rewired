// @flow

import React from 'react';
// enzyme
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
// rewired mock
import { Spy } from 'spy4js';
import { RewiredStore } from '../src/rewired/rewired-store';

// enzyme
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });

// rewired mock (btw: same is possible for redux)
const StoreWireHandler = (store: *) => (Component, mapStateToProps) => {
    const result = props => <Component {...mapStateToProps(store.get())} {...props} />;
    result.displayName = `Wired(${Component.name})`;
    return result;
};
Spy.on(RewiredStore, 'wire')
    .configure({ persistent: true })
    .calls(StoreWireHandler(RewiredStore));

// custom helpers
window.nextTick = (): Promise<void> => new Promise(resolve => process.nextTick(resolve));
