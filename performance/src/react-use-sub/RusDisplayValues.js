// @flow

import React from 'react';
import { DisplayValues } from '../common/DisplayValues';
import { useRusSub } from './rus-store';

export const RusDisplayValues = () => {
    const { data } = useRusSub(data => ({ data }));
    return <DisplayValues data={data} />;
};
