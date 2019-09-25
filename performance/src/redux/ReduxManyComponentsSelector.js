// @flow

import React from 'react';
import { StressTest } from '../common/stress-test';
import { connect, useSelector } from 'react-redux';

const componentNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

type ReduxComponentProps = {| name: string |};

const ReduxComponent = ({ name }: ReduxComponentProps) => {
    const { num } = useSelector(({ manyComponents }) => ({ num: manyComponents }));
    return (
        <div className="key-and-num">
            {name}: {num}
        </div>
    );
};

const ManyComponents = (): Array<React$Node> =>
    componentNames.map((name, key) => <ReduxComponent name={name} key={key} />);

type ReduxManyComponentsProps = {| update: number => void |};

let renderCounter = 0;
export const ReduxManyComponentsSelectorContainer = ({ update }: ReduxManyComponentsProps) => (
    <div className="many-components">
        <ManyComponents />
        <StressTest.ButtonDoX onClick={update} times={10000} />
        <div className="render-counter">{++renderCounter}</div>
    </div>
);

export const ReduxManyComponentsSelector = connect(
    ({ manyFlat }) => ({ manyFlat }),
    dispatch => ({
        update: num => dispatch({ type: 'MANY_COMPONENTS_UPDATE', update: num }),
    })
)(ReduxManyComponentsSelectorContainer);
