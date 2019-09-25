// @flow

import '../test_resources/wired-store-symbol-fallback';
import { Wired } from '../src';

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
            }: any) // we need to manipulate flow, because else we can do illegal things in the tests
        );

    it('initializes the store', () => {
        const store: any = getDummyStore();
        expect(store['__WIRED_DATA__']).toEqual({
            num: 12,
            bool: true,
            obj: {
                str: 'here',
            },
            array: ['there', 12],
        });
    });
});
