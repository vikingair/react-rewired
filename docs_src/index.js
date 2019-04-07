// @flow

// $FlowFixMe
import './assets/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
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
