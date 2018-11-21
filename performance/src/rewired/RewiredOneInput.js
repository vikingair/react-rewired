// @flow

import React from 'react';
import { RewiredStore } from './rewired-store';
import { RewiredDisplayValues } from './RewiredDisplayValues';
import { EventUtil } from '../common/event-util';
import { StressTest } from '../common/stress-test';
import { Util } from '../common/util';

const onChangeInput = EventUtil.inputHandler(v =>
    RewiredStore.set({ oneInput: { value: v, color: Util.randomColor() } })
);

type RewiredOneInputStoreProps = {| value: string, color: string |};
type RewiredOneInputOwnProps = {||};
export type RewiredOneInputProps = {| ...RewiredOneInputStoreProps, ...RewiredOneInputOwnProps |};

export const RewiredOneInputContainer = ({ value, color }: RewiredOneInputProps) => (
    <div className="one-input">
        <RewiredDisplayValues />
        <input
            id="rewired-input"
            type="text"
            value={value}
            style={{ backgroundColor: color }}
            onChange={onChangeInput}
        />
        <StressTest.ButtonChangeX inputId="rewired-input" times={5000} />
    </div>
);

export const RewiredOneInput = RewiredStore.wire<RewiredOneInputStoreProps, RewiredOneInputOwnProps>(
    RewiredOneInputContainer,
    ({ oneInput }) => ({
        value: oneInput.value,
        color: oneInput.color,
    })
);
