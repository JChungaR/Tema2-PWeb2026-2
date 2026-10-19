// src/entries/estudiantes.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from "../partials/Navbar.jsx";
import { MisReservas } from "../pages/reservas/MisReservas.jsx";
import { DetalleReserva } from "../pages/reservas/DetalleReserva.jsx";
import { ConfirmacionReserva } from "../pages/reservas/ConfirmacionReserva.jsx";

function AppEstudiante() {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        const handlePopState = () => {
            setPath(window.location.pathname);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Route matching switcher
    const renderPage = () => {
        if (path.startsWith('/estudiante/confirmacion')) {
            return <ConfirmacionReserva />;
        }

        if (path.startsWith('/estudiante/detalle')) {
            return <DetalleReserva />;
        }

        // Default route: /estudiante & /estudiante/misreservas
        return <MisReservas />;
    };

    return (
        <>
            <Navbar />
            <main>
                {renderPage()}
            </main>
        </>
    );
}

const container = document.getElementById('root');

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <AppEstudiante />
        </React.StrictMode>
    );
}