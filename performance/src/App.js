// @flow

import React, { Component } from 'react';
import { RewiredApp } from './rewired/RewiredApp';
import { ReduxApp } from './redux/ReduxApp';
import { type RouteValue } from './routes';
import { Navigator } from './Navigator';
// import { RusApp } from './react-use-sub/RusApp';

type AppProps = {||};
type AppState = { current: RouteValue };

class App extends Component<AppProps, AppState> {
    state: AppState = { current: (localStorage.getItem('current'): any) || 'start' };
    navigate = (next: RouteValue) => {
        localStorage.setItem('current', next);
        this.setState({ current: next });
    };
    render() {
        const { current } = this.state;
        return (
            <div className="App">
                <header>
                    <Navigator navigate={this.navigate} current={current} />
                    <div className="label">Rewired vs. Redux</div>
                </header>
                <div className="rewired">
                    <RewiredApp current={current} />
                </div>
                <div className="redux">
                    <ReduxApp current={current} />
                    {/*<RusApp current={current} />*/}
                </div>
            </div>
        );
    }
}

export default App;
