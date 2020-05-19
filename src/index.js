import './styles/index.scss';
import './scripts/init_firebase.ts';
import './scripts/init_font_awesome.ts';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.tsx';

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)

