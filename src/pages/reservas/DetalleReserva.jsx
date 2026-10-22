// src/pages/reservas/DetalleReserva.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DetalleReserva.css';
import { MOCK_DETALLES } from './mockDetalleReservas.js';

export function DetalleReserva() {
    const { id } = useParams();
    const navigate = useNavigate();
    const detalle = MOCK_DETALLES[id];

    const handleVolver = () => navigate('/estudiante/mis-reservas');

    if (!detalle) {
        return (
            <div className="container py-4">
                <p className="text-secondary">Reserva no encontrada.</p>
                <button type="button" className="btn btn-outline-verde" onClick={handleVolver}>
                    Volver a mis reservas
                </button>
            </div>
        );
    }

    const getBadgeStyle = (estado) => ({
        'Confirmada': 'badge-confirmada',
        'En curso': 'badge-en-curso',
        'Atendida': 'badge-atendida',
        'Inasistencia': 'badge-inasistencia',
    }[estado] || 'bg-secondary text-white');

    return (
        <div className="container py-4 detalle-reserva-page">
            {/* Breadcrumb Navigation */}
            <nav className="mb-3" aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <button
                            type="button"
                            className="btn btn-link p-0 text-decoration-none text-secondary"
                            onClick={handleVolver}
                        >
                            Mis reservas
                        </button>
                    </li>
                    <li className="breadcrumb-item active text-dark fw-medium" aria-current="page">
                        {detalle.codigo}
                    </li>
                </ol>
            </nav>

            {/* Header with Title, Badge, Subtitle & Action Buttons */}
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mb-4 gap-3">
                <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                        <h1 className="h2 fw-bold text-dark mb-0">{detalle.codigo}</h1>
                        <span className={`badge ${getBadgeStyle(detalle.estado)} px-2 py-1 border-0 rounded-1 fw-medium`}>
                            {detalle.estado}
                        </span>
                    </div>
                    <p className="text-secondary mb-0 small">
                        Registrada el {detalle.fechaRegistro}
                    </p>
                </div>

                <div className="d-flex gap-2 w-100 w-lg-auto justify-content-start justify-content-lg-end">
                    <button type="button" className="btn btn-outline-verde fw-semibold px-3 py-2">
                        Agregar a mi calendario
                    </button>
                    {detalle.permitirCancelar && (
                        <button type="button" className="btn btn-outline-cancelar fw-semibold px-3 py-2">
                            Cancelar reserva
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="row g-4">
                {/* Left Column: Information Cards */}
                <div className="col-12 col-lg-8 d-flex flex-column gap-4">
                    {/* Card: Datos de la Reserva */}
                    <div className="card detalle-card border-0 p-4">
                        <h2 className="h5 section-title mb-4">Datos de la reserva</h2>
                        <div className="row g-4">
                            <div className="col-12 col-md-6">
                                <span className="field-label">ESPACIO</span>
                                <div className="field-value">{detalle.espacio}</div>
                            </div>
                            <div className="col-12 col-md-6">
                                <span className="field-label">UBICACIÓN</span>
                                <div className="field-value">{detalle.ubicacion}</div>
                            </div>
                            <div className="col-12 col-md-6">
                                <span className="field-label">FECHA</span>
                                <div className="field-value">{detalle.fecha}</div>
                            </div>
                            <div className="col-12 col-md-6">
                                <span className="field-label">BLOQUE</span>
                                <div className="field-value">{detalle.bloque}</div>
                            </div>
                            <div className="col-12">
                                <span className="field-label">MOTIVO</span>
                                <div className="field-value">{detalle.motivo}</div>
                            </div>
                        </div>
                    </div>

                    {/* Card: Invitados */}
                    <div className="card detalle-card border-0 p-4">
                        <h2 className="h5 section-title mb-3">
                            Invitados · {detalle.invitadosCount} de {detalle.invitadosCapacidad}
                        </h2>
                        <div className="invitados-list">
                            {detalle.invitados.map((invitado, index) => (
                                <div
                                    key={index}
                                    className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center py-2 border-bottom-item"
                                >
                                    <span className="fw-medium text-dark mb-1 mb-sm-0">
                                        {invitado.nombre}
                                    </span>
                                    <span className="text-secondary small">
                                        {invitado.email}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Trazabilidad / Timeline */}
                <div className="col-12 col-lg-4">
                    <div className="card detalle-card border-0 p-4">
                        <h2 className="h5 section-title mb-4">Trazabilidad</h2>

                        <div className="timeline">
                            {detalle.trazabilidad.map((item, index) => (
                                <div key={index} className="timeline-item">
                                    <div className={`timeline-dot ${item.completado ? 'completed' : 'pending'}`} />
                                    <div className="timeline-content">
                                        <div className={`fw-bold small ${item.completado ? 'text-dark' : 'text-secondary'}`}>
                                            {item.titulo}
                                        </div>
                                        <div className="text-secondary timeline-subtext">
                                            {item.detalle}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {detalle.notaCancelacion && (
                            <div className="cancel-notice-box p-3 mt-3 rounded-2">
                                <p className="mb-0 small text-secondary">
                                    {detalle.notaCancelacion}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}