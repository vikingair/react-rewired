// @flow

import './wired-store-symbol-fallback';
import { Wired } from '../react-rewired';

describe('WiredStore - without Symbols', () => {
    const getDummyStore = () =>
        Wired.store(
            ({
                num: 12,
                some: (undefined: boolean | void),
                bool: true,
                obj: {
                    str: 'here',
                },
                array: ['there', 12],
                node: Wired.node({
                    not: 'visible',
                    as: 'node',
                }),
            }: any) // we need to manipulate flow, because else we can do illegal things in the tests
        );

    it('initializes the store', () => {
        const store = getDummyStore();
        expect(store.get()).toEqual({
            num: 12,
            bool: true,
            obj: {
                str: 'here',
            },
            array: ['there', 12],
            node: {
                __WIRED_NODE__: true,
                not: 'visible',
                as: 'node',
            },
        });
    });
});
