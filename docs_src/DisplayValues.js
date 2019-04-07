// @flow

import React from 'react';
import { Store } from './store';

const sanitize = (str: string): string => {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

const span = (className: string, value: string): string => `<span class="${className}">${value}</span>`;

const withMargin = (innerHTML: string): string => `<div class="ml-3"><p>${innerHTML}</p></div>`;

const _htmlForObject = (o: Object, firstValueOverride: boolean = true): string => {
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

const htmlForObject = (o: Object): string => `<p>{</p>${withMargin(_htmlForObject(o))}</p>}`;

type DisplayValuesStoreProps = {| data: Object |};
type DisplayValuesOwnProps = {||};
type DisplayValuesProps = $Exact<{ ...DisplayValuesOwnProps, ...DisplayValuesStoreProps }>;

const DisplayValuesContainer = ({ data }: DisplayValuesProps) => (
    <pre>
        <code dangerouslySetInnerHTML={{ __html: htmlForObject(data) }} />
    </pre>
);

export const DisplayValues = Store.wire<DisplayValuesStoreProps, DisplayValuesOwnProps>(
    DisplayValuesContainer,
    state => ({
        data: state,
    })
);
