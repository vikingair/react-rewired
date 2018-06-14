/**
 * This file is part of react-rewired which is released under MIT license.
 *
 * The LICENSE file can be found in the root directory of this project.
 *
 * @flow
 */

import React, { Component } from 'react';
import { WiredStoreUtil, type _WiredStore, type SetFunctionParam } from './wired-store';

type WiredRootProps<T> = { children: React$Node, store: _WiredStore<T> };
type WiredRootState<T> = { data: T };
export class WiredRoot<T: { [string]: any }> extends Component<WiredRootProps<T>, WiredRootState<T>> {
    setStore = <T>(d: SetFunctionParam<T>): void => {
        WiredStoreUtil.internalSet(this.props.store, d);
        this.setState({ data: this.props.store.data });
    };
    state: WiredRootState<T> = {
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
