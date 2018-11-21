// @flow

import React from 'react';
import { Feedback } from '../common/Feedback';

export const RewiredFeedback = () => (
    <div className="rewired-feedback">
        <h3>Performance for one input</h3>
        <Feedback id="rewired-performance-one-input" />
        <h3>Performance for deeply nested state</h3>
        <Feedback id="rewired-performance-deeply-nested" />
        <h3>Performance for flat state</h3>
        <Feedback id="rewired-performance-many-flat" />
        <h3>Performance for many wired components</h3>
        <Feedback id="rewired-performance-many-components" />
        <h3>Scalability</h3>
        <Feedback id="rewired-scalability" />
        <h3>Developer experience</h3>
        <Feedback id="rewired-developer-experience" />
    </div>
);
