// @flow

import React from 'react';
import { RusStore, useRusSub } from './rus-store';
import { RusDisplayValues } from './RusDisplayValues';
import { EventUtil } from '../common/event-util';
import { StressTest } from '../common/stress-test';
import { Util } from '../common/util';

const onChangeInput = EventUtil.inputHandler(v => RusStore.set({ oneInput: { value: v, color: Util.randomColor() } }));

export const RusOneInput = () => {
    const { value, color } = useRusSub(({ oneInput: { value, color } }) => ({ value, color }));
    return (
        <div className="one-input">
            <RusDisplayValues />
            <input
                id="rus-input"
                type="text"
                value={value}
                style={{ backgroundColor: color }}
                onChange={onChangeInput}
            />
            <StressTest.ButtonChangeX inputId="rus-input" times={10000} />
        </div>
    );
};
