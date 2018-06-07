// @flow

import React, { Component } from 'react';

class Connected extends Component<{ c: React$ComponentType<*>, w: Object }> {
    shouldComponentUpdate = nextProps => {
        const { w } = this.props;
        const keys = Object.keys(w);
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (nextProps.w[key] !== w[key]) {
                return true;
            }
        }
        return false;
    };
    render() {
        const { c: C, w } = this.props;
        return <C {...w} />;
    }
}

const wire = (context: any) => (component: React$ComponentType<*>, storeToProps: Function) => () => {
    const Consumer = context.Consumer;
    return <Consumer>{store => <Connected w={storeToProps(store)} c={component} />}</Consumer>;
};

type SetFunctionParam<T> = { [$Keys<T>]: any } | (T => { [$Keys<T>]: any });
type SetFunction<T> = (SetFunctionParam<T>) => void;

type WireStore<T: { [string]: any }> = {
    set: SetFunction<T>,
    data: T,
    context: any,
    wire: (Func: React$ComponentType<*>, storeToProps: Function) => any,
};

const leaf = <T: { [string]: any }>(data: T): T => {
    data[(Symbol('__WIRE_LEAF__'): any)] = true;
    return data;
};

// ATTENTION: No keys can be added afterwards. You need at least to initialize them with undefined
const updateIfRequired = <T: { [string]: any }>(prevData: T, nextData: { [string]: any }): T => {
    const result = {};
    const keys = Object.keys(prevData);
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (!(key in prevData)) continue;
        const prev = prevData[key];
        const next = nextData[key];
        if (!(key in nextData) || prev === next) {
            result[key] = prev;
        } else if (prev[Symbol('__WIRE_LEAF__')]) {
            result[key] = leaf(updateIfRequired(prev, next));
        } else {
            result[key] = next;
        }
    }
    return (result: any);
};

const internalSet = <T: { [string]: any }>(store: WireStore<T>, param: Object | Function): void => {
    const nextParams = typeof param === 'function' ? param(store.data) : param;
    store.data = updateIfRequired(store.data, nextParams);
};

const store = <T: { [string]: any }>(initialData: T): WireStore<T> => {
    const context = React.createContext(initialData);
    const s = {
        set: (d: SetFunctionParam<T>): void => {},
        data: initialData,
        context,
        wire: wire(context),
    };
    s.set = (d: SetFunctionParam<T>): void => internalSet((s: any), d);
    return s;
};

type WireRootProps<T> = { children: React$Node, store: WireStore<T> };
type WireRootState<T> = { data: T };
class WireRoot<T: { [string]: any }> extends Component<WireRootProps<T>, WireRootState<T>> {
    setStore = <T>(d: SetFunctionParam<T>): void => {
        internalSet(this.props.store, d);
        this.setState({ data: this.props.store.data });
    };
    state: WireRootState<T> = {
        data: this.props.store.data,
    }; // initial state
    componentDidMount() {
        this.props.store.set = this.setStore;
    }
    render() {
        const Provider = this.props.store.context.Provider;
        return <Provider value={this.state.data}>{this.props.children}</Provider>;
    }
}

export const Wire = { store, root: WireRoot, leaf };
