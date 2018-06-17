/**
 * This file is part of react-rewired which is released under MIT license.
 *
 * The LICENSE file can be found in the root directory of this project.
 *
 * @flow
 */

import React, { Component } from 'react';
import { type UnwiredComponent, WiredComponent } from './wired-component';

export type SetFunctionParam<S> = $Shape<S> | (S => $Shape<S>);
type SetFunction<S> = (SetFunctionParam<S>) => void;
type RootProps = {| children: React$Element<*> |};
type Root = React$ComponentType<RootProps>;

export type _WiredStore<State: Object> = {
    set: SetFunction<State>,
    data: State,
    root: Root,
    wire: <StoreProps: Object, OwnProps: Object>(
        component: UnwiredComponent<StoreProps, OwnProps>,
        storeToProps: (State) => StoreProps
    ) => React$ComponentType<OwnProps>,
};

const nodeSymbol: any = Symbol.for('__WIRED_NODE__');

export const node = <N: Object>(data: N): $Shape<N> => {
    data[nodeSymbol] = true;
    return data;
};

// ATTENTION: No keys can be added afterwards. You need at least to initialize them with undefined
const updateIfRequired = <State: Object>(prevData: State, nextData: Object): State => {
    const result = {};
    const keys = Object.keys(prevData);
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const prev = prevData[key];
        const next = nextData[key];
        if (!(key in nextData) || prev === next) {
            result[key] = prev;
        } else if (prev[nodeSymbol]) {
            result[key] = node(updateIfRequired(prev, next));
        } else {
            result[key] = next;
        }
    }
    return (result: any);
};

export const internalSet = <State: Object>(Store: _WiredStore<State>, param: Object | Function): void => {
    const nextParams = typeof param === 'function' ? param(Store.data) : param;
    Store.data = updateIfRequired(Store.data, nextParams);
};

export const create = <State: Object>(initialData: State): _WiredStore<State> => {
    const context = React.createContext(initialData);
    const s = {
        set: (d: SetFunctionParam<State>): void => internalSet((s: any), d),
        data: initialData,
        root: ((undefined: any): Root), // little flow hack
        wire: WiredComponent.wireWith(context),
    };
    s.root = rootFor(context, s);
    return s;
};

const rootFor = <State: Object>(Context: any, Store: _WiredStore<State>): Root =>
    class WiredRoot extends Component<RootProps, { s: State }> {
        setStore = <S>(d: SetFunctionParam<S>): void => {
            WiredStoreUtil.internalSet(Store, (d: any));
            this.setState({ s: Store.data });
        };
        state = { s: Store.data };
        componentDidMount = () => (Store.set = this.setStore);
        render = () => <Context.Provider value={this.state.s}>{this.props.children}</Context.Provider>;
    };

export const WiredStoreUtil = { create, node, internalSet };
