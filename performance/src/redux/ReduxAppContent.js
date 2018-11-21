// @flow

import React from 'react';
import { ReduxOneInput } from './ReduxOneInput';
import { type RouteValue } from '../routes';
import { ReduxDeeplyNested } from './ReduxDeeplyNested';
import { ReduxFeedback } from './ReduxFeedback';
import { ReduxManyFlat } from './ReduxManyFlat';
import { ReduxManyComponents } from './ReduxManyComponents';

type ReduxAppProps = {| current: RouteValue |};

export const ReduxAppContent = ({ current }: ReduxAppProps) => (
    <div>
        <div className="as-bg">Redux</div>
        <div className="content">
            <div className="content">
                {current === 'start' && <ReduxFeedback />}
                {current === 'one-input' && <ReduxOneInput />}
                {current === 'deeply-nested' && <ReduxDeeplyNested />}
                {current === 'many-flat' && <ReduxManyFlat />}
                {current === 'many-components' && <ReduxManyComponents />}
            </div>
        </div>
    </div>
);
