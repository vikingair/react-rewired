// @flow

import { Wired } from '../src';

describe('WiredStore', () => {
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
        const store = getDummyStore();
        expect(store.get()).toEqual({
            num: 12,
            bool: true,
            obj: {
                str: 'here',
            },
            array: ['there', 12],
        });
    });

    it('updates store data with unknown key', () => {
        const store = getDummyStore();
        const dataBefore = store.get();

        store.set({ unknownKey: 'foobar', num: undefined });

        expect(store.get()).not.toBe(dataBefore); // but creates always a new object
        expect(store.get()).toEqual(dataBefore);
    });

    it('updates store data with multiple updates on different types', () => {
        const store = getDummyStore();

        store.set({ obj: { some: 'newObject' }, node: { as: 'new', unknown: 'ignored' }, array: [1337], num: 42 });

        expect(store.get()).toEqual({
            array: [1337], // completely new array
            bool: true, // old value
            num: 42, // new value
            obj: { some: 'newObject' }, // completely new object
        });
    });

    it('supports functional updates', () => {
        const store = getDummyStore();

        store.set(({ some, num }) => ({ some: !some, num: num + 1 }));

        expect(store.get()).toEqual({
            array: ['there', 12],
            some: true,
            bool: true,
            num: 13,
            obj: { str: 'here' },
        });
    });
});
