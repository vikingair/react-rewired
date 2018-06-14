// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { WiredComponent } from './wired-component';
import { WiredStoreUtil } from './wired-store';
import { WiredRoot } from './wired-root';

describe('WiredComponent', () => {
    it('wires functional components', () => {
        const dummyStore = WiredStoreUtil.create({ testProp: 'here' });
        const func = ({ myProp }) => <div className={myProp} />;
        const Wired = dummyStore.wire(func, s => ({ myProp: s.testProp }));
        const wrapper = shallow(
            <WiredRoot store={dummyStore}>
                <Wired />
            </WiredRoot>
        );
        expect(wrapper.html()).toEqual('<div class="here"></div>');
    });

    it('wires class components', () => {
        const dummyStore = WiredStoreUtil.create({ testProp: 'here' });
        class comp extends React.Component<{ myProp: string }> {
            render = () => <div className={this.props.myProp} />;
        }
        const Wired = dummyStore.wire(comp, s => ({ myProp: s.testProp }));
        const wrapper = shallow(
            <WiredRoot store={dummyStore}>
                <Wired />
            </WiredRoot>
        );
        expect(wrapper.html()).toEqual('<div class="here"></div>');
    });

    it('updates only if required', () => {
        expect(WiredComponent._shouldComponentUpdate({ w: {} }, { w: {} })).toBe(false);
        expect(WiredComponent._shouldComponentUpdate({ w: { a: 'test', b: 12 } }, { w: { a: 'test', b: 12 } })).toBe(
            false
        );
        expect(WiredComponent._shouldComponentUpdate({ w: { a: 'test', b: 12 } }, { w: { a: 'test', b: 13 } })).toBe(
            true
        );
        expect(WiredComponent._shouldComponentUpdate({ w: { a: 'test', b: 12 } }, { w: { a: 'foo', b: 12 } })).toBe(
            true
        );
        expect(WiredComponent._shouldComponentUpdate({ w: { a: 'test' } }, { w: { a: 'test', b: 12 } })).toBe(true);
        expect(WiredComponent._shouldComponentUpdate({ w: { a: 'test', b: 12 } }, { w: { a: 'test' } })).toBe(true);
        expect(
            WiredComponent._shouldComponentUpdate({ w: { a: { foo: 'bar ' } } }, { w: { a: { foo: 'bar ' } } })
        ).toBe(true);
    });

    it('updates component props', () => {
        const dummyStore = WiredStoreUtil.create({ testProp: 'here' });
        const func = ({ myProp }) => <div className={myProp} />;
        const Wired = dummyStore.wire(func, s => ({ myProp: s.testProp }));
        const wrapper = shallow(
            <WiredRoot store={dummyStore}>
                <Wired />
            </WiredRoot>
        );
        expect(wrapper.html()).toEqual('<div class="here"></div>');

        dummyStore.set({ testProp: 'foo' });
        wrapper.update();
        expect(wrapper.html()).toEqual('<div class="foo"></div>');
    });

    it('updates component props only if necessary', () => {
        const func = ({ myProp }) => <div className={myProp} />;
        const wrapper = shallow(<WiredComponent.Wired c={func} w={{ myProp: 'here' }} />);

        expect(wrapper.html()).toEqual('<div class="here"></div>');
        wrapper.setProps({ w: { myProp: 'foo' } });
        expect(wrapper.html()).toEqual('<div class="foo"></div>');
    });
});
