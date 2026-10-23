// src/entries/estudiantes.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';

// Estilos globales
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Componentes parciales
import Navbar from '../partials/Navbar.jsx';

// Páginas del estudiante
import MiCuentaPage from '../pages/Estudiante/MiCuentaPage.jsx';
import DisponibilidadPage from '../pages/Estudiante/DisponibilidadPage.jsx';
import ConfirmacionReserva from '../pages/reservas/ConfirmacionReserva.jsx';
import { MisReservas } from '../pages/reservas/MisReservas.jsx';
import { DetalleReserva } from '../pages/reservas/DetalleReserva.jsx';

// Layout principal (Navbar + contenido)
function EstudianteLayout() {
    return (
        <div className="flex-grow-1 d-flex flex-column bg-light">
            <Navbar />
            <main className="p-4 flex-grow-1">
                <Outlet />
            </main>
        </div>
    );
}

// Configuración de rutas
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/estudiante" element={<EstudianteLayout />}>
                    <Route index element={<MisReservas />} />
                    <Route path="mis-reservas" element={<MisReservas />} />
                    <Route path="detalle" element={<DetalleReserva />} />
                    <Route path="detalle/:id" element={<DetalleReserva />} />
                    <Route path="confirmacion" element={<ConfirmacionReserva />} />
                    <Route path="confirmacion-reserva" element={<ConfirmacionReserva />} />
                    <Route path="mi-cuenta" element={<MiCuentaPage />} />
                    <Route path="disponibilidad" element={<DisponibilidadPage />}
/>
                </Route>

                {/* Compatibilidad con la ruta raíz anterior */}
                <Route path="/" element={<Navigate to="/estudiante" replace />} />
                <Route path="*" element={<Navigate to="/estudiante" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

// Montaje en el DOM
const container = document.getElementById('root')

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}
