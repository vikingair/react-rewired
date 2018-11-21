/**
 * This file is part of svg-editor which is released under MIT license.
 *
 * The LICENSE file can be found in the root directory of this project.
 *
 * @flow
 */

type InputEvent = { preventDefault: Function, target: { type?: string, value: any } };
type InputEventHandler = InputEvent => void;

const convertToNumber = (value: string): number | void => {
    if (!value) return undefined;
    const parsed = Number(value);
    return isNaN(parsed) ? undefined : parsed;
};

const inputHandler = (cb?: any => mixed | void): InputEventHandler => event => {
    event.preventDefault();
    const target = event.target;
    const change = target.value;
    const value = target.type === 'number' ? convertToNumber(change) : change;
    if (cb) cb(value);
};

export const EventUtil = { inputHandler };
