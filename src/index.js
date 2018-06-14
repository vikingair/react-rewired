// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Wire } from './wired-react';
import registerServiceWorker from './registerServiceWorker';
import { store } from './store';

const root = document.getElementById('root');
root &&
    ReactDOM.render(
        <Wire.root store={store}>
            <App />
        </Wire.root>,
        root
    );
registerServiceWorker();
