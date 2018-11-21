// @flow

import React from 'react';
import { RewiredStore } from './rewired-store';

type RewiredLiveCodingStoreProps = {| liveCoding: Object |};
type RewiredLiveCodingOwnProps = {||};
type RewiredLiveCodingProps = {| ...RewiredLiveCodingStoreProps, ...RewiredLiveCodingOwnProps |};

const RewiredLiveCodingContainer = ({ liveCoding }: RewiredLiveCodingProps) => (
    <div className="live-coding">You choose!</div>
);

export const RewiredLiveCoding = RewiredStore.wire<RewiredLiveCodingStoreProps, RewiredLiveCodingOwnProps>(
    RewiredLiveCodingContainer,
    ({ liveCoding }) => ({ liveCoding })
);
