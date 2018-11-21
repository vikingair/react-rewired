// @flow

import React from 'react';
import { connect } from 'react-redux';
import { StressTest } from '../common/stress-test';

type ReduxDeeplyNestedProps = {| num: number, update: number => void |};

let renderCounter = 0;
const ReduxDeeplyNestedContainer = ({ num, update }: ReduxDeeplyNestedProps) => (
    <div className="deeply-nested">
        <div className="big-num">{num}</div>
        <StressTest.ButtonDoX onClick={update} times={10000} />
        <div className="render-counter">{++renderCounter}</div>
    </div>
);

export const ReduxDeeplyNested = connect(
    ({ deeplyNested }) => ({ num: deeplyNested.a.b.c.d.e.f.g }),
    dispatch => ({
        update: num => dispatch({ type: 'DEEP_UPDATE', update: num }),
    })
)(ReduxDeeplyNestedContainer);
