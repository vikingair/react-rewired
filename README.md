[![GitHub license][license-image]][license-url]
[![npm package][npm-image]][npm-url]
[![Travis][build-image]][build-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![styled with prettier][prettier-image]][prettier-url]

# react-rewired

Wire your react app as easy as possible...

- A fast and easy alternative for `react-redux`
- Feels more like react (using internal react state as base model)
- `TypeScript` support included
- `flow` support included
- very small package size (v3.0.0 -> [794 B gzipped](https://bundlephobia.com/result?p=react-rewired@3.0.0))
- high performance (performance play ground in comparison to `react-redux@7.1.1` is available [here](https://fdc-viktor-luft.github.io/react-rewired/performance/))

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
First of all you need to initialize your `Store` with some defaults.
```js
import { Wired } from 'react-rewired';

const Store = Wired.store({
    num: 12,
    data: { keys: [] },
    foo: null
})
```
You will also have to define the types for your `State` because the
breaking change since `flow` reached version [0.85](https://github.com/facebook/flow/releases/tag/v0.85.0)
requires to define any types in value position.
Now let's e.g. define the array on `data.keys` to contain only strings.
```js
type DataState = { keys: string[] };
type State = {
    num: number,
    data: DataState,
    foo: string | null
};

const data: DataState = { keys: [] }; // you can directly type cast
const Store = Wired.store<State>({
    num: 12,
    data,
    foo: null
})
```
- HINT: Types in value position are still very new, but every flow-parser
is able to handle those. If you run in troubles with those, you should
maybe consider to update your dev dependencies.

The next step is the wrapping of your react tree with the context provider
to be able to access the data within any component of the subtree.
```js
const root = document.getElementById('root');
root &&
    ReactDOM.render(
        <Store.root>
            <App />
        </Store.root>,
        root
    );
```
To access the data within your component you want to wrap it into the
corresponding consumer. (HINT: You should not define react components
inline but give it a name, because the react dev tools uses that name as
default display name. E.g. in the following snippet "MyComponent" will
be displayed inside the react dev tools)
```js
type MyComponentStoreProps = {| key?: string, odd: boolean |};
type MyComponentOwnProps = {||};
type MyComponentProps = {| ...MyComponentOwnProps, ...MyComponentStoreProps |};

const MyComponent = ({ key, odd }: MyComponentProps) => <JSX />
// and not wire it
const MyWiredComponent = Store.wire<MyComponentStoreProps, MyComponentOwnProps>(
    MyComponent,
    state => ({
        key: state.data.keys[0],
        odd: state.num % 2 === 1
    })
);
```
- HINT: I want to stress out that your application will benefit a lot if
you follow the above pattern everywhere. Also I want to strongly encourage
you, to use always (if possible) exact prop types, to ensure that no arbitrary
props will be provided where not expected.

The last thing you have to know are state updates. There are two different ways you
can perform those updates. Just like `setState` on internal react state.
```js
// simply return those keys you want to update with the new data
// they will be merged and component updates will only be propagated
// to those components who listen to those data points
Store.set({ num: 13, foo: 'bar' });
// MyWiredComponent would update after this change
// because the value of "odd" changed from "false" to "true"

// return a function which will be called with the current state
Store.set(state => ({ num: 3 * state.num })); // num = 3 * 13 = 39
// MyWiredComponent would NOT update after this change
// because the values of "odd" and "key" did not change
```
If you want to access the data directly e.g. outside any component, you can
do the following:
```js
const state = Store.get();
```
- ATTENTION: Modifications to the returned state can effect your application in
             an unexpected way. Even if you know what you're doing, I do not recommend it.

- To make testing easy even with the context API, you should insert a little snippet into your `setupTests.js`
  (see `jest` option "setupFilesAfterEnv")
```js
Store.set = (Component, mapStateToProps) => {
    const result = props => <Component {...mapStateToProps(Store.get())} {...props} />;
    result.displayName = `Wired(${Component.name})`;
    return result;
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
