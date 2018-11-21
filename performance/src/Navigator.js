// @flow

import React, { Component } from 'react';
import { type RouteValue, Routes } from './routes';

type NavigatorProps = {| navigate: RouteValue => void, current: RouteValue |};
type NavigatorState = {| open: boolean |};

export class Navigator extends Component<NavigatorProps, NavigatorState> {
    state: NavigatorState = { open: false };
    toggle = () => this.setState(({ open }) => ({ open: !open }));
    navigate = (to: RouteValue) => () => {
        const { current, navigate } = this.props;
        if (current !== to) {
            navigate(to);
            this.setState({ open: false });
        }
    };
    render = () => {
        const { open } = this.state;
        const { current } = this.props;
        return (
            <nav>
                <div className="icon" onClick={this.toggle}>
                    Menü
                </div>
                {open && (
                    <div className="menu">
                        {Routes.map(r => (
                            <div
                                key={r.value}
                                className={'route' + (current === r.value ? ' current' : '')}
                                onClick={this.navigate(r.value)}>
                                {r.label}
                            </div>
                        ))}
                    </div>
                )}
            </nav>
        );
    };
}
