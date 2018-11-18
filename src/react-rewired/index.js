/**
 * This file is part of react-rewired which is released under MIT license.
 *
 * The LICENSE file can be found in the root directory of this project.
 *
 * @flow
 */
import React from 'react';

type Combined<StoreProps, OwnProps> = $Exact<{ ...StoreProps, ...OwnProps }>;
export type UnwiredComponent<StoreProps, OwnProps> = React$ComponentType<Combined<StoreProps, OwnProps>>;

export type SetFunctionParam<S> = $Shape<S> | (S => $Shape<S>);
type SetFunction<S> = (SetFunctionParam<S>) => void;
type RootProps = {| children: React$Element<*> |};
type Root = React$ComponentType<RootProps>;

export type WiredStore<State: Object> = {
    set: SetFunction<State>,
    data: State,
    root: Root,
    wire: <StoreProps: Object, OwnProps: Object>(
        component: UnwiredComponent<StoreProps, OwnProps>,
        storeToProps: (State) => StoreProps
    ) => React$ComponentType<OwnProps>,
};
export type WiredNode<N: Object> = $Shape<N>;

const nodeSymbol: any = Symbol.for('__WIRED_NODE__');

const node = <N: Object>(data: N): WiredNode<N> => {
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
        } else if (prev && prev[nodeSymbol]) {
            result[key] = node(updateIfRequired(prev, next));
        } else {
            result[key] = next;
        }
    }
    return (result: any);
};

const internalSet = <State: Object>(Store: WiredStore<State>, param: Object | Function): void => {
    const nextParams = typeof param === 'function' ? param(Store.data) : param;
    Store.data = updateIfRequired(Store.data, nextParams);
};

const store = <State: Object>(initialData: State): WiredStore<State> => {
    const Context = React.createContext(initialData);
    const s = {
        set: (d: SetFunctionParam<State>): void => internalSet((s: any), d),
        data: initialData,
        root: ((undefined: any): Root), // little flow hack
        wire: <StoreProps: Object, OwnProps: Object>(
            Component: UnwiredComponent<StoreProps, OwnProps>,
            storeToProps: State => StoreProps
        ): React$ComponentType<OwnProps> => {
            const MC = (React: any).memo(Component);
            const WiredUpdater = (p: OwnProps) => (
                <Context.Consumer>{store => <MC {...storeToProps(store)} {...p} />}</Context.Consumer>
            );
            return WiredUpdater; // name for react dev tool
        },
    };
    s.root = rootFor(Context, s);
    return s;
};

const rootFor = <State: Object>(Context: any, Store: WiredStore<State>): Root =>
    class WiredRoot extends React.Component<RootProps, { s: State }> {
        m = true;
        update = () => this.m && this.setState({ s: Store.data });
        setStore = <S>(d: SetFunctionParam<S>): void => {
            internalSet(Store, (d: any));
            this.update();
        };
        state = { s: Store.data };
        componentDidMount = () => {
            Store.set = this.setStore;
            if (Store.data !== this.state.s) this.update();
        };
        componentWillUnmount = () => {
            this.m = false;
        };
        render = () => <Context.Provider value={this.state.s}>{this.props.children}</Context.Provider>;
    };

export const Wired = { store, node };
