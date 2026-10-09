// src/pages/reservas/ConfirmacionReserva.jsx
import React from 'react';
import './ConfirmacionReserva.css';

// Importar fuentes desde Fontsource
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';

export function ConfirmacionReserva({
                                        codigo = "RSV-2026-0473",
                                        espacio = "Laboratorio de Cómputo H-304",
                                        fecha = "14/09/2026",
                                        rangoHrs = "10:00 – 11:00",
                                        asistentes = "4 (3 invitados)"
                                    }) {
    return (
        <div className="pagina-confirmacion min-vh-100 d-flex flex-column align-items-center justify-content-center p-3">
            {/* Banner de notificación superior */}
            <div className="alerta-exito w-100 rounded p-2 px-3 mb-4 d-flex align-items-center gap-2">
                <span className="fw-bold">✓</span> Reserva registrada correctamente.
            </div>

            {/* Tarjeta principal */}
            <div className="confirmacion-bloque w-100 p-4 p-md-5 rounded-4 border d-flex flex-column align-items-center">
                {/* Check verde circular */}
                <div className="icono-exito rounded-circle d-flex align-items-center justify-content-center mb-3">
                    ✓
                </div>

                <h1 className="confirmacion-msg text-center mb-4">Tu bloque quedó reservado</h1>

                {/* Caja de Código de Reserva */}
                <div className="codigo-bloque w-100 p-3 text-center mb-4 rounded-3">
                    <p className="titulo-contenedor text-uppercase mb-1">Código de Reserva</p>
                    <p className="codigo-contenedor m-0">{codigo}</p>
                </div>

                {/* Lista de detalles */}
                <div className="detalles_bloque w-100 pt-3 border-top d-flex flex-column gap-2">
                    <div className="detalles d-flex justify-content-between align-items-center">
                        <span className="detalles-titulo">Espacio</span>
                        <span className="detalles-var text-end">{espacio}</span>
                    </div>
                    <div className="detalles d-flex justify-content-between align-items-center">
                        <span className="detalles-titulo">Fecha</span>
                        <span className="detalles-var text-end">{fecha}</span>
                    </div>
                    <div className="detalles d-flex justify-content-between align-items-center">
                        <span className="detalles-titulo">Bloque</span>
                        <span className="detalles-var text-end">{rangoHrs}</span>
                    </div>
                    <div className="detalles d-flex justify-content-between align-items-center">
                        <span className="detalles-titulo">Asistentes</span>
                        <span className="detalles-var text-end">{asistentes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}