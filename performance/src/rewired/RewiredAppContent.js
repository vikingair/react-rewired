// @flow

import React from 'react';
import { RewiredOneInput } from './RewiredOneInput';
import { type RouteValue } from '../routes';
import { RewiredDeeplyNested } from './RewiredDeeplyNested';
import { RewiredFeedback } from './RewiredFeedback';
import { RewiredManyFlat } from './RewiredManyFlat';
import { RewiredManyComponents } from './RewiredManyComponents';

type RewiredAppProps = {| current: RouteValue |};

export const RewiredAppContent = ({ current }: RewiredAppProps) => (
    <div>
        <div className="as-bg">Rewired</div>
        <div className="content">
            {current === 'start' && <RewiredFeedback />}
            {current === 'one-input' && <RewiredOneInput />}
            {current === 'deeply-nested' && <RewiredDeeplyNested />}
            {current === 'many-flat' && <RewiredManyFlat />}
            {current === 'many-components' && <RewiredManyComponents />}
        </div>
    </div>
);
