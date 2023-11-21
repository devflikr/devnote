import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { tippy } from '@tippyjs/react';

import 'flikrui/dist/styles.css';
import './styles/index.scss';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

import 'react-loading-skeleton/dist/skeleton.css';

import { tailspin } from 'ldrs';
import { Toaster } from 'react-hot-toast';

tailspin.register();

tippy.setDefaultProps({
    arrow: false,
    animation: "shift-away",
    delay: [200, 0],
    theme: 'tippy-theme',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <Toaster position="bottom-center" />
        </BrowserRouter>
    </React.StrictMode>,
);
