/**
 * This file is part of morfi which is released under MIT license.
 *
 * The LICENSE file can be found in the root directory of this project.
 *
 * @flow
 */

import React from 'react';
import './DisplayValues.css';
import { store } from './store';
import type { State } from './store';

const sanitize = (str: string): string => {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

const span = (className: string, value: string): string => `<span class="${className}">${value}</span>`;

const withMargin = (innerHTML: string): string => `<div class="ml-3"><p>${innerHTML}</p></div>`;

const _htmlForObject = (o: { [string]: mixed }, firstValueOverride: boolean = true): string => {
    let result = '';
    let firstValue = firstValueOverride;
    for (let key in o) {
        if (o.hasOwnProperty(key)) {
            const value = o[key];
            if (!firstValue) {
                result += ',</p><p>';
            } else {
                firstValue = false;
            }
            result += span('prop', key);
            result += ': ';
            const valueType = value === null ? 'null' : typeof value;
            switch (valueType) {
                case 'string':
                    result += span('string', `"${sanitize((value: any))}"`);
                    continue;
                case 'boolean':
                case 'number':
                case 'undefined':
                case 'null':
                    result += span(valueType, String(value));
                    continue;
                case 'object':
                    if (Array.isArray(value)) {
                        result += sanitize(JSON.stringify(value));
                    } else {
                        result += `{</p>${withMargin(_htmlForObject((value: any)))}<p>}`;
                    }
                    continue;
                default:
                    result += sanitize(JSON.stringify(value));
            }
        }
    }
    return result;
};

const htmlForObject = (o: { [string]: mixed }): string => `<p>{</p>${withMargin(_htmlForObject(o))}</p>}`;

export const DisplayValues = store.wire(
    ({ data }) => (
        <pre>
            <code dangerouslySetInnerHTML={{ __html: htmlForObject(data) }} />
        </pre>
    ),
    (state: State) => ({ data: state })
);
