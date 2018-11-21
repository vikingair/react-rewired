// @flow

import React from 'react';
import { RewiredStore } from './rewired-store';
import { RewiredAppContent } from './RewiredAppContent';
import { type RouteValue } from '../routes';

type RewiredAppProps = {| current: RouteValue |};

export const RewiredApp = ({ current }: RewiredAppProps) => (
    <RewiredStore.root>
        <RewiredAppContent current={current} />
    </RewiredStore.root>
);
