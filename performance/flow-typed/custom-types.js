// @flow

// jest
type Expect = {
    toEqual: any => void,
    toBe: any => void,
    toMatchInlineSnapshot: any => void,
    toMatchSnapshot: any => void,
};
declare var expect: {
    (any): Expect,
    addSnapshotSerializer: Function,
};
declare function describe(string, Function): any;
declare function it(string, Function): any;
declare function afterEach(any): any;
declare function beforeEach(any): any;
declare var jest: any;
