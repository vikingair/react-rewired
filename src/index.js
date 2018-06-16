// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Store } from './store';

const root = document.getElementById('root');
root &&
    ReactDOM.render(
        <Store.root>
            <App />
        </Store.root>,
        root
    );
registerServiceWorker();
