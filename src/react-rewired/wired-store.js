/**
 * This file is part of react-rewired which is released under MIT license.
 *
 * The LICENSE file can be found in the root directory of this project.
 *
 * @flow
 */

import React from 'react';
import { WiredComponent } from './wired-component';

export type SetFunctionParam<T> = { [$Keys<T>]: any } | (T => { [$Keys<T>]: any });
type SetFunction<T> = (SetFunctionParam<T>) => void;

export type _WiredStore<T: { [string]: any }> = {
    set: SetFunction<T>,
    data: T,
    context: any,
    wire: (Func: React$ComponentType<*>, storeToProps: Function) => any,
};

const leafSymbol: any = Symbol.for('__WIRE_LEAF__');

export const leaf = <T: { [string]: any }>(data: T): T => {
    data[leafSymbol] = true;
    return data;
};

// ATTENTION: No keys can be added afterwards. You need at least to initialize them with undefined
const updateIfRequired = <T: { [string]: any }>(prevData: T, nextData: { [string]: any }): T => {
    const result = {};
    const keys = Object.keys(prevData);
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const prev = prevData[key];
        const next = nextData[key];
        if (!(key in nextData) || prev === next) {
            result[key] = prev;
        } else if (prev[leafSymbol]) {
            result[key] = leaf(updateIfRequired(prev, next));
        } else {
            result[key] = next;
        }
    }
    return (result: any);
};

export const internalSet = <T: { [string]: any }>(store: _WiredStore<T>, param: Object | Function): void => {
    const nextParams = typeof param === 'function' ? param(store.data) : param;
    store.data = updateIfRequired(store.data, nextParams);
};

export const create = <T: { [string]: any }>(initialData: T): _WiredStore<T> => {
    const context = React.createContext(initialData);
    const s = {
        set: (d: SetFunctionParam<T>): void => internalSet((s: any), d),
        data: initialData,
        context,
        wire: WiredComponent.wireWith(context),
    };
    return s;
};

export const WiredStoreUtil = { create, leaf, internalSet };
