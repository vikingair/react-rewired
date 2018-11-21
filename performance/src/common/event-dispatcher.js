// @flow

const nativeInputValueSetter = (Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value'): any).set;

const change = (inputElement: any, value: string) => {
    nativeInputValueSetter.call(inputElement, value);
    const e = new Event('input', { bubbles: true });
    inputElement.dispatchEvent(e);
};

const changeById = (id: string, value: string) => {
    const input = document.getElementById(id);
    if (input && input.tagName === 'input') change(input, value);
};

export const EventDispatcher = { change, changeById };
