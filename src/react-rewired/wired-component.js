/**
 * This file is part of react-rewired which is released under MIT license.
 *
 * The LICENSE file can be found in the root directory of this project.
 *
 * @flow
 */

import React, { Component } from 'react';

const _shouldComponentUpdate = ({ w: props }: { w: Object }, { w: nextProps }: { w: Object }): boolean => {
    const keys = [...Object.keys(props), ...Object.keys(nextProps)];
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (nextProps[key] !== props[key]) {
            return true;
        }
    }
    return false;
};

type WiredProps = { c: React$ComponentType<*>, w: Object };
class Wired extends Component<WiredProps> {
    shouldComponentUpdate = (nextProps: WiredProps): boolean => _shouldComponentUpdate(this.props, nextProps);
    render() {
        const { c: C, w } = this.props;
        return <C {...w} />;
    }
}

const wireWith = (Context: any) => {
    return <T>(component: React$ComponentType<*>, storeToProps: T => Object) => () => {
        return <Context.Consumer>{store => <Wired w={storeToProps(store)} c={component} />}</Context.Consumer>;
    };
};

export const WiredComponent = { wireWith, _shouldComponentUpdate, Wired };
