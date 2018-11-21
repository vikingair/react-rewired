// @flow

import React from 'react';
import { connect } from 'react-redux';

type ReduxLiveCodingProps = {| liveCoding: Object |};

const ReduxLiveCodingContainer = ({ liveCoding }: ReduxLiveCodingProps) => (
    <div className="live-coding">You choose!</div>
);

export const ReduxLiveCoding = connect(({ liveCoding }) => ({ liveCoding }))(ReduxLiveCodingContainer);
