// @flow

import React, { Component } from 'react';
import { Ball } from './Ball';
import { store } from './store';
import { DisplayValues } from './DisplayValues';

const randomColor = () => '#xxxxxx'.replace(/x/g, () => Math.floor(Math.random() * 16).toString(16));

const stopEventPropagation = event => event.stopPropagation();

class App extends Component<
    {},
    { recording: boolean, replaying: boolean, recorded: Array<{ top: number, left: number }> }
> {
    state = { recording: false, replaying: false, recorded: [] };
    delegateBall = (event: any) => {
        const nextPosition = { top: event.clientY + window.scrollY, left: event.clientX + window.scrollX };
        if (this.state.recording) this.setState(state => ({ recorded: [...state.recorded, nextPosition] }));
        store.set({ ball: { position: nextPosition } });
    };
    record = () => this.setState(state => ({ recording: !state.recording }));
    replay = () => {
        if (this.state.recorded.length) {
            this.setState({ replaying: true });
            this.state.recorded.forEach((v, i) =>
                window.setTimeout(() => store.set({ ball: { position: v, color: randomColor() } }), i * 500)
            );
            window.setTimeout(() => this.setState({ replaying: false }), this.state.recorded.length * 500);
        }
    };
    deleteRecords = () => this.state.recorded.length && this.setState({ recorded: [] });
    changeColor = () => store.set({ ball: { color: randomColor() } });
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to react-rewired</h1>
                </header>
                <button className="record" onClick={this.record} disabled={this.state.replaying}>
                    {this.state.recording && <span className="recording" />}
                    Record
                </button>
                <button className="replay" onClick={this.replay} disabled={this.state.replaying}>
                    {this.state.replaying && <span className="replaying" />}
                    Replay
                </button>
                <button className="delete" onClick={this.deleteRecords} disabled={this.state.replaying}>
                    Delete Records ({this.state.recorded.length})
                </button>
                <button className="change-color" onClick={this.changeColor}>
                    Change Color
                </button>
                <main onClick={this.delegateBall}>
                    <div onClick={stopEventPropagation}>
                        <Ball />
                    </div>
                </main>
                <DisplayValues data={store.data} />
            </div>
        );
    }
}

export default App;
