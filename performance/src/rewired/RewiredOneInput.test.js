// @flow

import React from 'react';
import { Spy } from 'spy4js';
import { shallow } from 'enzyme';
import { RewiredOneInput, RewiredOneInputContainer, type RewiredOneInputProps } from './RewiredOneInput';
import { RewiredStore } from './rewired-store';
import { Util } from '../common/util';

describe('RewiredOneInput', () => {
    it('maps properties to container', () => {
        // initialize the store with any properties
        RewiredStore.set({ oneInput: { value: 'testValue', color: '#test' } });
        // now shallow mount the wired component
        expect(shallow(<RewiredOneInput />)).toMatchInlineSnapshot(`
<RewiredOneInputContainer
  color="#test"
  value="testValue"
/>
`);
    });
});

describe('RewiredOneInputContainer', () => {
    const Mock$RewiredStore = Spy.mock(RewiredStore, 'set');
    const Mock$Util = Spy.mock(Util, 'randomColor');

    const getWrapper = (overrides?: $Shape<{ ...RewiredOneInputProps }>) =>
        shallow(<RewiredOneInputContainer value="test-value" color="#abcdef" {...overrides} />);

    it('applies value and color to the output', () => {
        expect(getWrapper()).toMatchSnapshot();
    });

    it('handles input change', () => {
        // prepare mocks
        const preventDefault = new Spy();
        Mock$Util.randomColor.returns('#fff000');

        // mount the wrapper
        const wrapper = getWrapper();

        // change the input
        wrapper.find('input').simulate('change', { target: { value: 'foo' }, preventDefault });

        // assertions
        preventDefault.wasCalled(1);
        Mock$RewiredStore.set.hasCallHistory({ oneInput: { value: 'foo', color: '#fff000' } });
    });
});
