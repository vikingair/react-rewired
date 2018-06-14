// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Wired } from './react-rewired';
import registerServiceWorker from './registerServiceWorker';
import { store } from './store';

const root = document.getElementById('root');
root &&
    ReactDOM.render(
        <Wired.root store={store}>
            <App />
        </Wired.root>,
        root
    );
registerServiceWorker();
