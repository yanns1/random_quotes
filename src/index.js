// For compiling generators and async arrow functions
// (regeneratorRuntime available globally)
import "regenerator-runtime/runtime.js";
import './styles/index.scss';
import './scripts/init_firebase.js';
import './scripts/init_font_awesome.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)
