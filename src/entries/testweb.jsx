// src/entries/testweb.jsx

import React from 'react'
import ReactDOM from 'react-dom/client';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import Navbar from "../partials/Navbar.jsx";

const container = document.getElementById('root')

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Navbar/>
        </React.StrictMode>
    )
}