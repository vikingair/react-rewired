// @flow

import React from 'react';
import { RusAppContent } from './RusAppContent';
import { type RouteValue } from '../routes';

type RusAppProps = {| current: RouteValue |};

export const RusApp = ({ current }: RusAppProps) => <RusAppContent current={current} />;
