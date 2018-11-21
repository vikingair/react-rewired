// @flow

const randomColor = () => '#xxxxxx'.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));

export const Util = { randomColor };
