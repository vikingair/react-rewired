// @flow

import React from 'react';
import { RusOneInput } from './RusOneInput';
import { type RouteValue } from '../routes';
import { RusDeeplyNested } from './RusDeeplyNested';
import { RusManyFlat } from './RusManyFlat';
import { RusManyComponents } from './RusManyComponents';

type RusAppProps = {| current: RouteValue |};

export const RusAppContent = ({ current }: RusAppProps) => (
    <div>
        <div className="as-bg">useSub</div>
        <div className="content">
            {current === 'one-input' && <RusOneInput />}
            {current === 'deeply-nested' && <RusDeeplyNested />}
            {current === 'many-flat' && <RusManyFlat />}
            {current === 'many-components' && <RusManyComponents />}
        </div>
    </div>
);
