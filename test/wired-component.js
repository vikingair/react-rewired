// @flow

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Spy } from 'spy4js';
import { Wired } from '../src';

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

    it('displays the wrapped name for the HOC based on the wrapped component', () => {
        const DummyStore = Wired.store({ testProp: 'here' });
        const MyFancyStuff = ({ myProp }) => <div className={myProp} />;
        const WiredComponent = DummyStore.wire(MyFancyStuff, s => ({ myProp: s.testProp }));
        expect(
            shallow(
                <DummyStore.root>
                    <WiredComponent />
                </DummyStore.root>
            )
        ).toMatchInlineSnapshot(`
            <ContextProvider
              value={
                Object {
                  "testProp": "here",
                }
              }
            >
              <Wired(MyFancyStuff) />
            </ContextProvider>
        `);

        expect(
            mount(
                <DummyStore.root>
                    <WiredComponent />
                </DummyStore.root>
            )
        ).toMatchInlineSnapshot(`
            <Memo(MyFancyStuff)
              myProp="here"
            >
              <div
                className="here"
              />
            </Memo(MyFancyStuff)>
        `);
    });

    it('displays the wrapped name and favors the display name of the wrapped component', () => {
        const DummyStore = Wired.store({ testProp: 'here' });
        const MyFancyStuff = ({ myProp }) => <div className={myProp} />;
        MyFancyStuff.displayName = 'FOO';
        const WiredComponent = DummyStore.wire(MyFancyStuff, s => ({ myProp: s.testProp }));
        expect(
            shallow(
                <DummyStore.root>
                    <WiredComponent />
                </DummyStore.root>
            )
        ).toMatchInlineSnapshot(`
            <ContextProvider
              value={
                Object {
                  "testProp": "here",
                }
              }
            >
              <Wired(FOO) />
            </ContextProvider>
        `);

        expect(
            mount(
                <DummyStore.root>
                    <WiredComponent />
                </DummyStore.root>
            )
        ).toMatchInlineSnapshot(`
            <Memo(FOO)
              myProp="here"
            >
              <div
                className="here"
              />
            </Memo(FOO)>
        `);
    });

    it('displays a fallback wrapped name', () => {
        const DummyStore = Wired.store({ testProp: 'here' });
        const WiredComponent = DummyStore.wire(
            ({ myProp }) => <div className={myProp} />,
            s => ({ myProp: s.testProp })
        );
        expect(
            shallow(
                <DummyStore.root>
                    <WiredComponent />
                </DummyStore.root>
            )
        ).toMatchInlineSnapshot(`
            <ContextProvider
              value={
                Object {
                  "testProp": "here",
                }
              }
            >
              <Wired() />
            </ContextProvider>
        `);

        expect(
            mount(
                <DummyStore.root>
                    <WiredComponent />
                </DummyStore.root>
            )
        ).toMatchInlineSnapshot(`
            <Memo()
              myProp="here"
            >
              <div
                className="here"
              />
            </Memo()>
        `);
    });
});
