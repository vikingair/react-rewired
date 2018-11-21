// @flow

import React from 'react';
import { connect } from 'react-redux';
import { StressTest } from '../common/stress-test';

type ReduxManyFlatProps = {| manyFlat: { [string]: number }, update: number => void |};

let renderCounter = 0;
const ReduxManyFlatContainer = ({ manyFlat, update }: ReduxManyFlatProps) => (
    <div className="many-flat">
        {Object.keys(manyFlat).map(key => (
            <div className="key-and-num" key={key}>
                {key}: {manyFlat[key]}
            </div>
        ))}
        <StressTest.ButtonDoX onClick={update} times={50000} />
        <div className="render-counter">{++renderCounter}</div>
    </div>
);

export const ReduxManyFlat = connect(
    ({ manyFlat }) => ({ manyFlat }),
    dispatch => ({
        update: num => dispatch({ type: 'FLAT_UPDATE', update: num }),
    })
)(ReduxManyFlatContainer);
