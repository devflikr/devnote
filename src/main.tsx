import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';

import 'flikrui/dist/class-styled.css';

import './styles/index.scss';

import { tippy } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

import 'react-loading-skeleton/dist/skeleton.css';

import { tailspin, ring } from 'ldrs';
import { Toaster } from 'react-hot-toast';

import 'prismjs/components/prism-css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

import "prismjs/plugins/line-numbers/prism-line-numbers";

tailspin.register();
ring.register();

tippy.setDefaultProps({
    arrow: false,
    animation: "shift-away",
    delay: [200, 0],
    theme: 'tippy-theme',
    touch: "hold",
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <Toaster position="bottom-center" containerStyle={{ zIndex: 10000 }} />
        </BrowserRouter>
    </React.StrictMode>,
);
