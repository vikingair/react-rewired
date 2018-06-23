// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { WiredComponent } from './wired-component';
import { WiredStoreUtil } from './wired-store';

describe('WiredComponent', () => {
    it('wires functional components', () => {
        const DummyStore = WiredStoreUtil.create({ testProp: 'here' });
        const func = ({ myProp, outerProp }: { myProp: string, outerProp: boolean }) => <div className={myProp} />;
        const Wired = DummyStore.wire(func, s => ({ myProp: s.testProp }));
        const wrapper = shallow(
            <DummyStore.root>
                <Wired outerProp={true} />
            </DummyStore.root>
        );
        expect(wrapper.html()).toEqual('<div class="here"></div>');
    });

    it('wires class components', () => {
        const DummyStore = WiredStoreUtil.create({ testProp: 'here' });
        class comp extends React.Component<{| myProp: string |}> {
            render = () => <div className={this.props.myProp} />;
        }
        const Wired = DummyStore.wire(comp, s => ({ myProp: s.testProp }));
        const wrapper = shallow(
            <DummyStore.root>
                <Wired />
            </DummyStore.root>
        );
        expect(wrapper.html()).toEqual('<div class="here"></div>');
    });

    it('updates if changes were propagated to store before provider was initialized', () => {
        const DummyStore = WiredStoreUtil.create({ testProp: 'here' });
        const func = ({ myProp }: { myProp: string }) => <div className={myProp} />;
        const Wired = DummyStore.wire(func, s => ({ myProp: s.testProp }));
        const wrapper = shallow(
            <DummyStore.root>
                <Wired />
            </DummyStore.root>
        );
        expect(wrapper.state().s.testProp).toBe('here');
        wrapper.setState({ s: { testProp: 'foo' } });
        expect(wrapper.state().s.testProp).toBe('foo');
        wrapper.instance().componentDidMount();
        expect(wrapper.state().s.testProp).toBe('here');
    });

    it('updates only if required', () => {
        expect(WiredComponent._shouldComponentUpdate({}, {})).toBe(false);
        expect(WiredComponent._shouldComponentUpdate({ a: 'test', b: 12 }, { a: 'test', b: 12 })).toBe(false);
        expect(WiredComponent._shouldComponentUpdate({ a: 'test', b: 12 }, { a: 'test', b: 13 })).toBe(true);
        expect(WiredComponent._shouldComponentUpdate({ a: 'test', b: 12 }, { a: 'foo', b: 12 })).toBe(true);
        expect(WiredComponent._shouldComponentUpdate({ a: 'test' }, { a: 'test', b: 12 })).toBe(true);
        expect(WiredComponent._shouldComponentUpdate({ a: 'test', b: 12 }, { a: 'test' })).toBe(true);
        expect(WiredComponent._shouldComponentUpdate({ a: { foo: 'bar ' } }, { a: { foo: 'bar ' } })).toBe(true);
    });

    it('updates component props', () => {
        const DummyStore = WiredStoreUtil.create({ testProp: 'here' });
        const func = ({ myProp }) => <div className={myProp} />;
        const Wired = DummyStore.wire(func, s => ({ myProp: s.testProp }));
        const wrapper = shallow(
            <DummyStore.root>
                <Wired />
            </DummyStore.root>
        );
        expect(wrapper.html()).toEqual('<div class="here"></div>');

        DummyStore.set({ testProp: 'foo' });
        wrapper.update();
        expect(wrapper.html()).toEqual('<div class="foo"></div>');
    });

    it('updates component props only if necessary', () => {
        const func = ({ storeProp, outerProp }: { storeProp: string, outerProp: boolean }) => (
            <div className={storeProp} contentEditable={outerProp} />
        );
        const wrapper = shallow(<WiredComponent.Wired C={func} w={{ storeProp: 'here' }} p={{ outerProp: true }} />);

        expect(wrapper.html()).toEqual('<div class="here" contenteditable="true"></div>');
        wrapper.setProps({ w: { storeProp: 'foo' } });
        expect(wrapper.html()).toEqual('<div class="foo" contenteditable="true"></div>');
        wrapper.setProps({ p: { outerProp: false } });
        expect(wrapper.html()).toEqual('<div class="foo" contenteditable="false"></div>');
    });
});
