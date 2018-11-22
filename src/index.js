// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { Store } from './store';

const root = document.getElementById('root');
root &&
    ReactDOM.render(
        <Store.root>
            <App />
        </Store.root>,
        root
    );

if (
    window.navigator &&
    window.navigator.serviceWorker &&
    typeof window.navigator.serviceWorker.getRegistration === 'function'
) {
    window.navigator.serviceWorker.getRegistration('/react-rewired/').then(reg => reg && reg.unregister());
}
