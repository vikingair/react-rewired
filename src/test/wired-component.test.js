// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { Spy } from 'spy4js';
import { Wired } from '../react-rewired';

describe('WiredComponent', () => {
    it('wires functional components', () => {
        const DummyStore = Wired.store({ testProp: 'here' });
        const func = ({ myProp, outerProp }: { myProp: string, outerProp: boolean }) => <div className={myProp} />;
        const WiredComp = DummyStore.wire(func, s => ({ myProp: s.testProp }));
        const wrapper = shallow(
            <DummyStore.root>
                <WiredComp outerProp={true} />
            </DummyStore.root>
        );
        expect(wrapper.html()).toEqual('<div class="here"></div>');
    });

    it('wires class components', () => {
        const DummyStore = Wired.store({ testProp: 'here' });
        class comp extends React.Component<{| myProp: string |}> {
            render = () => <div className={this.props.myProp} />;
        }
        const WiredComponent = DummyStore.wire(comp, s => ({ myProp: s.testProp }));
        const wrapper = shallow(
            <DummyStore.root>
                <WiredComponent />
            </DummyStore.root>
        );
        expect(wrapper.html()).toEqual('<div class="here"></div>');
    });

    it('updates if changes were propagated to store before provider was initialized', () => {
        const DummyStore = Wired.store({ testProp: 'here' });
        const func = ({ myProp }: { myProp: string }) => <div className={myProp} />;
        const WiredComponent = DummyStore.wire(func, s => ({ myProp: s.testProp }));
        const wrapper = shallow(
            <DummyStore.root>
                <WiredComponent />
            </DummyStore.root>
        );
        expect(wrapper.state().s.testProp).toBe('here');
        wrapper.setState({ s: { testProp: 'foo' } });
        expect(wrapper.state().s.testProp).toBe('foo');
        wrapper.instance().componentDidMount();
        expect(wrapper.state().s.testProp).toBe('here');
    });

    it('updates component props', () => {
        const DummyStore = Wired.store({ testProp: 'here' });
        const func = ({ myProp }) => <div className={myProp} />;
        const WiredComponent = DummyStore.wire(func, s => ({ myProp: s.testProp }));
        const wrapper = shallow(
            <DummyStore.root>
                <WiredComponent />
            </DummyStore.root>
        );
        expect(wrapper.html()).toEqual('<div class="here"></div>');

        DummyStore.set({ testProp: 'foo' });
        wrapper.update();
        expect(wrapper.html()).toEqual('<div class="foo"></div>');
    });

    it('does not update root state after unmount', () => {
        const DummyStore = Wired.store({ testProp: 'here' });
        const func = ({ myProp }) => <div className={myProp} />;
        const WiredComponent = DummyStore.wire(func, s => ({ myProp: s.testProp }));
        const wrapper = shallow(
            <DummyStore.root>
                <WiredComponent />
            </DummyStore.root>
        );
        const setState = Spy.on(wrapper.instance(), 'setState');

        DummyStore.set({ testProp: 'foo' });
        setState.hasCallHistory({ s: { testProp: 'foo' } });

        // now unmount
        setState.reset();
        wrapper.unmount();
        DummyStore.set({ testProp: 'bar' });
        setState.wasNotCalled();
    });
});
