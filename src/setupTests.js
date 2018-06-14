// @flow

import { Spy } from 'spy4js';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

Enzyme.configure({ adapter: new Adapter() });

const oldDescribe = describe;
window.describe = (string, func) =>
    oldDescribe(string, () => {
        afterEach(Spy.restoreAll);
        return func();
    });
