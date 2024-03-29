import React from 'react';
import ReactDOM from 'react-dom';
import { initialize } from './firebase';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

initialize();

ReactDOM.render(React.createElement(App), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
