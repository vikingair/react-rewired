// @flow

import React from 'react';
import { Feedback } from '../common/Feedback';

export const ReduxFeedback = () => (
    <div className="redux-feedback">
        <h3>Performance for one input</h3>
        <Feedback id="redux-performance-one-input" />
        <h3>Performance for deeply nested state</h3>
        <Feedback id="redux-performance-deeply-nested" />
        <h3>Performance for flat state</h3>
        <Feedback id="redux-performance-many-flat" />
        <h3>Performance for many connected components</h3>
        <Feedback id="rewired-performance-many-components" />
        <h3>Scalability</h3>
        <Feedback id="redux-scalability" />
        <h3>Developer experience</h3>
        <Feedback id="redux-developer-experience" />
    </div>
);
