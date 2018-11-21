// @flow

import React from 'react';
import { StressTest } from '../common/stress-test';
import { connect } from 'react-redux';

const componentNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

type ReduxComponentProps = {| name: string, num: number |};

const ReduxComponentContainer = ({ name, num }: ReduxComponentProps) => (
    <div className="key-and-num">
        {name}: {num}
    </div>
);

export const ReduxComponent = connect(({ manyComponents }) => ({ num: manyComponents }))(ReduxComponentContainer);

const ManyComponents = (): Array<React$Node> =>
    componentNames.map((name, key) => <ReduxComponent name={name} key={key} />);

type ReduxManyComponentsProps = {| update: number => void |};

let renderCounter = 0;
export const ReduxManyComponentsContainer = ({ update }: ReduxManyComponentsProps) => (
    <div className="many-components">
        <ManyComponents />
        <StressTest.ButtonDoX onClick={update} times={10000} />
        <div className="render-counter">{++renderCounter}</div>
    </div>
);

export const ReduxManyComponents = connect(
    ({ manyFlat }) => ({ manyFlat }),
    dispatch => ({
        update: num => dispatch({ type: 'MANY_COMPONENTS_UPDATE', update: num }),
    })
)(ReduxManyComponentsContainer);
