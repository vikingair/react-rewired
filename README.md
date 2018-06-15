[![GitHub license][license-image]][license-url]
[![npm package][npm-image]][npm-url]
[![Travis][build-image]][build-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![styled with prettier][prettier-image]][prettier-url]

# react-rewired

Wire your react app as easy as possible...

- A good alternative to `react-redux`
- Feels more like react (using internal react state as base model)
- `flow` typed out of the box
- very small package size (1.4 kB gzipped)
- high performant (statistics in comparison to `react-redux` will follow)

## Introduction

`react-rewired` intends to reduce the overhead and complexity when internal
react component state is not enough, because you want to store everywhere
accessible data which can safely be accessed by your react components
and triggers automatically updates, when the data changes.

This should be familiar to any react developer. And the more popular solution
for this purpose is the usage of `react-redux`. But `react-redux` comes not
only with nice dev tools, good documentation, large user base and a consistent
philosophy for its usage and idea. In my opinion, I am still looking to often
into the dev tools to find out what seems to be broken and my application grows
very fast too large with all the overhead, that comes with actions and reducers.
Also it is always quite an act to implement `flow` on top of `react-redux`.

## How to - an example
First of all you need to initialize your store with some defaults.
```js
import { Wired } from 'react-rewired';

const store = Wired.store({
    num: 12,
    data: { keys: [] }
    foo: undefined
})
```
You also need to define the type for your `State` to tell `flow` that
e.g. the array on `data.keys` contains only strings.
```js
type State = {
    num: number,
    data: { keys: string[] }
    foo?: string
};

const store = Wired.store(({
    num: 12,
    data: { keys: [] }
    foo: undefined
}: State))
```
The next step is the wrapping of your react tree with the context provider
to be able to access the data within any component of the subtree.
```js
const root = document.getElementById('root');
root &&
    ReactDOM.render(
        <Wired.root store={store}>
            <App />
        </Wired.root>,
        root
    );
```
To access the data within your component you want to wrap it into the
corresponding consumer.
```js
const MyComponent = ({ key, odd }: { key?: string, odd: boolean }) => <JSX />
// and not wire it
const MyWiredComponent = store.wire(
    MyComponent,
    state => ({
        key: state.data.keys[0],
        odd: state.num % 2 === 1
    })
);
```
The last thing you have to know are state updates. There are two different ways you
can perform those updates. Just like `setState` on internal react state.
```js
// simply return those keys you want to update with the new data
// they will be merged and component updates will only be propagated
// to those components who listen to those data points
store.set({ num: 13, foo: 'bar' });
// MyWiredComponent would update after this change
// because the value of "odd" changed from "false" to "true"

// return a function which will be called with the current state
store.set(state => ({ num: 3 * state.num })); // num = 3 * 13 = 39
// MyWiredComponent would NOT update after this change
// because the values of "odd" and "key" did not change
```
Additionally you can perform shallow merges in deeply nested structures
with `Wired.leaf`. With it you may mark the provided object to be another
shallow updatable object. Another example:
```js
type State = {
    num: number,
    dataAsLeaf: {
        keys: string[],
        foo?: string
    },
    dataAsObject: {
        keys: string[],
        foo?: string
    }
};

const store = Wired.store(({
    num: 12,
    dataAsLeaf: Wired.leaf({
        keys: []
        foo: undefined
    })
    dataAsObject: {
        keys: []
        foo: undefined
    }
}: State))
```
Now `dataAsLeaf` is wired leaf, which means that you can do the following:
```js
store.set({dataAsLeaf: { foo: 'bar' }}); // does not affect dataAsLeaf.keys

store.set({dataAsObject: { foo: 'bar' }}); // flow error because keys were required AND dataAsObject.keys would be lost
```
Therefore it is also possible to make nested updated statement like this:
```js
// another example for some very complex State

store.set({ data: { user: { login: { email: 'some@mail.com' } } } });

// and this would affect ONLY the email if data, user and login
// would have been leafs instead of objects.
```

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/fdc-viktor-luft/react-rewired/blob/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/react-rewired.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/react-rewired
[build-image]: https://img.shields.io/travis/fdc-viktor-luft/react-rewired/master.svg?style=flat-square
[build-url]: https://travis-ci.org/fdc-viktor-luft/react-rewired
[coveralls-image]: https://coveralls.io/repos/github/fdc-viktor-luft/react-rewired/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/fdc-viktor-luft/react-rewired?branch=master
[prettier-image]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg
[prettier-url]: https://github.com/prettier/prettier
