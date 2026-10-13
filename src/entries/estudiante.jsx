// src/entries/estudiantes.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from "../partials/Navbar.jsx";
import {ConfirmacionReserva} from "../pages/reservas/ConfirmacionReserva.jsx";


const container = document.getElementById('root')

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <Navbar/>
            <ConfirmacionReserva/>
        </React.StrictMode>
    )
}