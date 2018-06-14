// @flow

import { WiredStoreUtil } from './wired-store';

describe('WiredStore', () => {
    const getDummyStore = () =>
        WiredStoreUtil.create(
            ({
                num: 12,
                bool: true,
                obj: {
                    str: 'here',
                },
                array: ['there', 12],
                leaf: WiredStoreUtil.leaf({
                    not: 'visible',
                    as: 'leaf',
                }),
            }: any) // we need to manipulate flow, because else we can do illegal things in the tests
        );

    it('initializes the store', () => {
        const store = getDummyStore();
        expect(store.data).toEqual({
            num: 12,
            bool: true,
            obj: {
                str: 'here',
            },
            array: ['there', 12],
            leaf: {
                not: 'visible',
                as: 'leaf',
            },
        });
    });

    it('updates store data with unknown key', () => {
        const store = getDummyStore();
        const dataBefore = store.data;

        store.set({ unknownKey: 'foobar' });

        expect(store.data).not.toBe(dataBefore); // but creates always a new object
        expect(store.data).toEqual(dataBefore);
    });

    it('updates store data with multiple updates on different types', () => {
        const store = getDummyStore();

        store.set({ obj: { some: 'newObject' }, leaf: { as: 'new', unknown: 'ignored' }, array: [1337], num: 42 });

        expect(store.data).toEqual({
            array: [1337], // completely new array
            bool: true, // old value
            leaf: {
                as: 'new', // new value
                not: 'visible', // old value (ATTENTION: unknown was ignored, because any leaf behaves like root)
            },
            num: 42, // new value
            obj: { some: 'newObject' }, // completely new object
        });
    });

    it('supports functional updates', () => {
        const store = getDummyStore();

        store.set(state => ({ leaf: { as: 'new ' + state.leaf.as, unknown: 'ignored' } }));

        expect(store.data).toEqual({
            array: ['there', 12],
            bool: true,
            leaf: { as: 'new leaf', not: 'visible' },
            num: 12,
            obj: { str: 'here' },
        });
    });
});
