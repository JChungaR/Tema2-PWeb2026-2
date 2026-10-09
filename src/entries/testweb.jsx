// src/entries/testweb.jsx

import React from 'react'
import ReactDOM from 'react-dom/client';
import Navbar from "../partials/Navbar.jsx";

const container = document.getElementById('root')

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Navbar/>
        </React.StrictMode>
    )
}