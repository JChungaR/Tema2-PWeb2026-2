// src/pages/reservas/MisReservas.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MisReservas.css';
import { ModalReservarBloque, ModalCancelarReserva } from './ModalReserva.jsx';

export const MOCK_RESERVAS = [
    {
        id: '1',
        titulo: 'Laboratorio de Cómputo H-304',
        estado: 'Confirmada',
        fecha: '14/09/2026',
        hora: '10:00 – 11:00',
        ubicacion: 'Edificio de Ingeniería',
        codigo: 'RSV-2026-0473',
        detalleExtra: '4 asistentes',
        permitirCancelar: true,
        permitirVerDetalle: true,
    },
    {
        id: '2',
        titulo: 'Sala de Estudio Grupal E-201',
        estado: 'Confirmada',
        fecha: '15/09/2026',
        hora: '18:00 – 19:00',
        ubicacion: 'Pabellón E',
        codigo: 'RSV-2026-0455',
        detalleExtra: '6 asistentes',
        permitirCancelar: true,
        permitirVerDetalle: true,
    },
    {
        id: '3',
        titulo: 'Cabina de Grabación N-105',
        estado: 'En curso',
        fecha: '14/09/2026',
        hora: '09:00 – 10:00',
        ubicacion: 'Pabellón N',
        codigo: 'RSV-2026-0468',
        detalleExtra: '2 asistentes',
        permitirCancelar: false,
        permitirVerDetalle: true,
    },
    {
        id: '4',
        titulo: 'Sala de Reuniones A-410',
        estado: 'Confirmada',
        fecha: '17/09/2026',
        hora: '14:00 – 15:00',
        ubicacion: 'Pabellón A',
        codigo: 'RSV-2026-0480',
        detalleExtra: '8 asistentes',
        permitirCancelar: true,
        permitirVerDetalle: true,
    },
    {
        id: '5',
        titulo: 'Sala Biblioteca B-102',
        estado: 'Atendida',
        fecha: '08/09/2026',
        hora: '11:00 – 12:00',
        ubicacion: 'Biblioteca',
        codigo: 'RSV-2026-0402',
        detalleExtra: 'Llegada registrada 11:04',
        permitirCancelar: false,
        permitirVerDetalle: false,
    },
    {
        id: '6',
        titulo: 'Laboratorio de Redes H-201',
        estado: 'Inasistencia',
        fecha: '03/09/2026',
        hora: '16:00 – 17:00',
        ubicacion: 'Ingeniería',
        codigo: 'RSV-2026-0367',
        detalleExtra: 'marcada por Jorge Ramírez',
        permitirCancelar: false,
        permitirVerDetalle: false,
    },
];

export function MisReservas({ reservasLista = MOCK_RESERVAS }) {
    const navigate = useNavigate();
    const handleVerDetalle = (id) => navigate(`/estudiante/detalle/${id}`);

    const tieneReservas = reservasLista.length > 0;

    // Estados de Modales
    const [showModalReserva, setShowModalReserva] = useState(false);
    const [modoModalReserva, setModoModalReserva] = useState('normal'); // 'normal' | 'tope_excedido' | 'solapamiento'

    const [showModalCancelar, setShowModalCancelar] = useState(false);
    const [reservaACancelar, setReservaACancelar] = useState(null);

    // Handlers
    const handleAbrirReservaModal = (modo = 'normal') => {
        setModoModalReserva(modo);
        setShowModalReserva(true);
    };

    const handleAbrirCancelarModal = (reserva) => {
        setReservaACancelar(reserva);
        setShowModalCancelar(true);
    };

    const handleConfirmarCancelacion = (motivo) => {
        console.log('Reserva cancelada:', reservaACancelar?.codigo, 'Motivo:', motivo);
        setShowModalCancelar(false);
    };

    return (
        <div className="container py-4 mis-reservas-page">
            {/* Control para probar los tres estados del Modal de Reservar (Solo para Pruebas/Demo) */}
            <div className="bg-white p-2 mb-3 rounded border d-flex gap-2 align-items-center flex-wrap">
                <small className="fw-bold text-secondary">Probar Popups:</small>
                <button type="button" className="btn btn-sm btn-outline-warning" onClick={() => handleAbrirReservaModal('solapamiento')}>
                    Modal Solapamiento
                </button>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleAbrirReservaModal('tope_excedido')}>
                    Modal Tope Excedido
                </button>
            </div>

            <Header
                tieneReservas={tieneReservas}
                onBuscarEspacio={() => handleAbrirReservaModal('normal')}
            />
            <SearchBar mostrarFechas={tieneReservas} />

            {tieneReservas ? (
                <Reservas
                    reservasLista={reservasLista}
                    onCancelarReserva={handleAbrirCancelarModal}
                    onVerDetalle={handleVerDetalle}
                />
            ) : (
                <ReservasVacio onBuscarEspacio={() => handleAbrirReservaModal('normal')} />
            )}

            {/* Componentes de Popups Conditional Modals */}
            <ModalReservarBloque
                show={showModalReserva}
                modo={modoModalReserva}
                onClose={() => setShowModalReserva(false)}
                onConfirm={() => setShowModalReserva(false)}
            />

            <ModalCancelarReserva
                show={showModalCancelar}
                reserva={reservaACancelar}
                onClose={() => setShowModalCancelar(false)}
                onConfirm={handleConfirmarCancelacion}
            />
        </div>
    );
}

export function Header({ tieneReservas, onBuscarEspacio }) {
    return (
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3">
            <div>
                <h1 className="h2 fw-bold text-dark mb-1">Mis reservas</h1>
                {tieneReservas && (
                    <p className="text-secondary mb-0 fs-6">
                        5 de 8 horas usadas del 14/09 al 19/09 · 1 inasistencia acumulada
                    </p>
                )}
            </div>

            {tieneReservas && (
                <button
                    className="btn btn-verde-principal px-3 py-2 fw-semibold align-self-start align-self-sm-auto"
                    onClick={onBuscarEspacio}
                >
                    Buscar un espacio
                </button>
            )}
        </div>
    );
}

export function SearchBar({ mostrarFechas }) {
    return (
        <div className="card search-bar-card border-0 p-3 mb-4">
            <div className="row g-2 align-items-center">
                <div className="col-12 col-md-auto">
                    <button className="btn btn-dropdown-filter w-100 text-start" type="button">
                        Estado: Todos <span className="ms-1">▾</span>
                    </button>
                </div>

                {mostrarFechas && (
                    <>
                        <div className="col-12 col-sm-6 col-md-auto">
                            <div className="date-filter-box">Desde 14/09/2026</div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-auto">
                            <div className="date-filter-box">Hasta 30/09/2026</div>
                        </div>
                    </>
                )}

                <div className="col">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Buscar por código o espacio..."
                    />
                </div>
            </div>
        </div>
    );
}

export function ReservasVacio({ onBuscarEspacio }) {
    return (
        <div className="card empty-state-card border-0 py-5 text-center">
            <div className="card-body py-5 d-flex flex-column align-items-center justify-content-center">
                <div className="empty-icon-box mb-3 d-flex align-items-center justify-content-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    </svg>
                </div>
                <h3 className="h4 fw-bold text-dark mb-2">Aún no tienes reservas</h3>
                <p className="text-secondary mb-4 empty-state-text">
                    Busca una sala o un laboratorio y toma un bloque libre de esta semana. Puedes reservar hasta 8 horas semanales.
                </p>
                <button className="btn btn-verde-principal px-4 py-2 fw-semibold" onClick={onBuscarEspacio}>
                    Buscar un espacio
                </button>
            </div>
        </div>
    );
}

export function Reservas({ reservasLista = [], onCancelarReserva, onVerDetalle }) {
    const proximas = reservasLista.filter(
        (r) => r.estado === 'Confirmada' || r.estado === 'En curso'
    );
    const historicas = reservasLista.filter(
        (r) => r.estado === 'Atendida' || r.estado === 'Inasistencia'
    );

    return (
        <div className="d-flex flex-column gap-4">
            {proximas.length > 0 && (
                <section>
                    <h2 className="h5 section-title mb-3">Próximas</h2>
                    <div className="row g-3">
                        {proximas.map((reserva) => (
                            <div className="col-12 col-md-6" key={reserva.id || reserva.codigo}>
                                <ReservaCard
                                    reserva={reserva}
                                    onCancelarReserva={onCancelarReserva}
                                    onVerDetalle={onVerDetalle}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {historicas.length > 0 && (
                <section>
                    <h2 className="h5 section-title mb-3">Históricas</h2>
                    <div className="row g-3">
                        {historicas.map((reserva) => (
                            <div className="col-12 col-md-6" key={reserva.id || reserva.codigo}>
                                <ReservaCard
                                    reserva={reserva}
                                    onCancelarReserva={onCancelarReserva}
                                    onVerDetalle={onVerDetalle}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export function ReservaCard({ reserva, onCancelarReserva, onVerDetalle }) {
    const getBadgeStyle = (estado) => {
        switch (estado) {
            case 'Confirmada':
                return 'badge-confirmada';
            case 'En curso':
                return 'badge-en-curso';
            case 'Atendida':
                return 'badge-atendida';
            case 'Inasistencia':
                return 'badge-inasistencia';
            default:
                return 'bg-secondary text-white';
        }
    };

    const tieneAcciones = reserva.permitirCancelar || reserva.permitirVerDetalle;

    return (
        <div className="card reserva-card border-0 h-100 p-3">
            <div className="card-body p-0 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h3 className="h6 fw-bold text-dark mb-0 title-space">{reserva.titulo}</h3>
                    <span className={`badge border-0 rounded-1 px-2 py-1 fw-medium ${getBadgeStyle(reserva.estado)}`}>
                        {reserva.estado}
                    </span>
                </div>

                <div className="text-secondary small mb-1">
                    {reserva.fecha} · {reserva.hora} · {reserva.ubicacion}
                </div>

                <div className="text-secondary small mb-3">
                    {reserva.codigo} · {reserva.detalleExtra}
                </div>

                {tieneAcciones && (
                    <>
                        <hr className="hr-card mt-auto mb-3" />
                        <div className="d-flex gap-3 align-items-center">
                            {reserva.permitirVerDetalle && (
                                <button
                                    type="button"
                                    className="btn btn-link p-0 text-decoration-none btn-ver-detalle"
                                    onClick={() => onVerDetalle?.(reserva.id)}
                                >
                                    Ver detalle
                                </button>
                            )}
                            {reserva.permitirCancelar && (
                                <button
                                    type="button"
                                    className="btn btn-link p-0 text-decoration-none btn-cancelar"
                                    onClick={() => onCancelarReserva(reserva)}
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}