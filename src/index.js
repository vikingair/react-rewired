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
    get: void => State,
    root: Root,
    wire: <StoreProps: Object, OwnProps: Object>(
        component: UnwiredComponent<StoreProps, OwnProps>,
        storeToProps: (State) => StoreProps
    ) => React$ComponentType<OwnProps>,
};

const _symbol = (Symbol && Symbol.for) || String;
const $$data: any = _symbol('__WIRED_DATA__');

// ATTENTION: No keys can be added afterwards. You need at least to initialize them with undefined
const _update = <State: Object>(p: State, n: Object): State => {
    const r = {};
    Object.keys(p).forEach((key: string) => {
        const prev = p[key];
        const next = n[key];
        r[key] = next === undefined || !(key in n) ? prev : next;
    });
    return (r: any);
};

const _set = <State: Object>(s: WiredStore<State>, param: Object | Function): void => {
    const nextParams = typeof param === 'function' ? param(s[$$data]) : param;
    s[$$data] = _update(s[$$data], nextParams);
};

const store = <State: Object>(initialData: State): WiredStore<State> => {
    const Context = React.createContext(initialData);
    const s = {
        set: (d: SetFunctionParam<State>): void => _set((s: any), d),
        get: () => s[$$data],
        [$$data]: initialData,
        root: ((undefined: any): Root), // little flow hack
        wire: <StoreProps: Object, OwnProps: Object>(
            Component: UnwiredComponent<StoreProps, OwnProps>,
            storeToProps: State => StoreProps
        ): React$ComponentType<OwnProps> => {
            const MC = (React: any).memo(Component);
            // name for react dev tool and for other purposes
            // the usage of the surrounding brackets will make "Wired" a flag in dev tools
            // we favor to use the "displayName" over the real "name" but fallback for anonymous functions
            // to an empty string within the brackets, since the React.memo HOC does the same
            const name = `Wired(${Component.displayName || Component.name || ''})`;
            const obj = {
                [name]: (p: OwnProps) => (
                    <Context.Consumer>{store => <MC {...storeToProps(store)} {...p} />}</Context.Consumer>
                ),
            };
            obj[name].displayName = name;
            return obj[name];
        },
    };
    s.root = rootFor(Context, s);
    return s;
};

const rootFor = <State: Object>(Context: any, Store: WiredStore<State>): Root =>
    class WiredRoot extends React.Component<RootProps, { s: State }> {
        m = true;
        update = () => this.m && this.setState({ s: Store[$$data] });
        setStore = <S>(d: SetFunctionParam<S>): void => {
            _set(Store, (d: any));
            this.update();
        };
        state = { s: Store[$$data] };
        componentDidMount = () => {
            Store.set = this.setStore;
            if (Store[$$data] !== this.state.s) this.update();
        };
        componentWillUnmount = () => {
            this.m = false;
        };
        render = () => <Context.Provider value={this.state.s}>{this.props.children}</Context.Provider>;
    };

export const Wired = { store };
