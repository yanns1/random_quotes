import './styles/style.scss';
import './scripts/init_firebase.js';
import React from 'react';
import ReactDOM from 'react-dom';
import Quote from './components/Quote.jsx';

ReactDOM.render(
    <Quote />,
    document.querySelector('#root')
);

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/src/sw.js')
//             .then(registration => {
//                 // Registration was successful
//                 console.log('ServiceWorker registration successful with scope: ', registration.scope);
//             })
//             .catch(err => {
//                 // registration failed :(
//                 console.log('ServiceWorker registration failed: ', err);
//             })
//     });
// }
