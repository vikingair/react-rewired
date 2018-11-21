// @flow

import React from 'react';
import { connect } from 'react-redux';
import { ReduxDisplayValues } from './ReduxDisplayValues';
import { EventUtil } from '../common/event-util';
import { StressTest } from '../common/stress-test';

type ReduxOneInputProps = {| value: string, updateValue: Event => void, color: string |};

const ReduxOneInputContainer = ({ value, updateValue, color }: ReduxOneInputProps) => (
    <div className="one-input">
        <ReduxDisplayValues />
        <input id="redux-input" type="text" style={{ backgroundColor: color }} value={value} onChange={updateValue} />
        <StressTest.ButtonChangeX inputId="redux-input" times={10000} />
    </div>
);

export const ReduxOneInput = connect(
    ({ oneInput }) => ({ value: oneInput.value, color: oneInput.color }),
    dispatch => ({
        updateValue: EventUtil.inputHandler(v => dispatch({ type: 'ONE_INPUT_CHANGED', change: v })),
    })
)(ReduxOneInputContainer);
