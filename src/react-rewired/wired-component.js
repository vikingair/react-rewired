/**
 * This file is part of react-rewired which is released under MIT license.
 *
 * The LICENSE file can be found in the root directory of this project.
 *
 * @flow
 */

import React, { Component } from 'react';

const _shouldComponentUpdate = <StoreProps: Object>(props: StoreProps, nextProps: StoreProps): boolean => {
    const keys = [...Object.keys(props), ...Object.keys(nextProps)];
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        if (nextProps[key] !== props[key]) {
            return true;
        }
    }
    return false;
};

type Combined<StoreProps, OwnProps> = $Diff<StoreProps & OwnProps, {}>;
export type UnwiredComponent<StoreProps, OwnProps> = React$ComponentType<Combined<StoreProps, OwnProps>>;
type WiredProps<StoreProps: Object, OwnProps: Object> = {
    C: UnwiredComponent<StoreProps, OwnProps>,
    w: StoreProps,
    p: OwnProps,
};
class Wired<StoreProps: Object, OwnProps: Object> extends Component<WiredProps<StoreProps, OwnProps>> {
    shouldComponentUpdate = (nextProps: *): boolean =>
        this.props.p !== nextProps.p || _shouldComponentUpdate(this.props.w, nextProps.w);
    render() {
        const { C, w, p } = this.props;
        return <C {...w} {...p} />;
    }
}

const wireWith = (Context: any) => <State, StoreProps: Object, OwnProps: Object>(
    component: UnwiredComponent<StoreProps, OwnProps>,
    storeToProps: State => StoreProps
): React$ComponentType<OwnProps> => {
    const WiredComponent = (p: OwnProps) => (
        <Context.Consumer>{store => <Wired p={p} w={storeToProps(store)} C={component} />}</Context.Consumer>
    );
    return WiredComponent; // name for react dev tool
};

export const WiredComponent = { wireWith, _shouldComponentUpdate, Wired };
