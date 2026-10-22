// src/components/modals/ModalReserva.jsx
import React, { useState } from 'react';
import './ModalReserva.css';

/**
 * Modal: Reservar Bloque (Soporta modos: 'normal', 'tope_excedido', 'solapamiento')
 */
export function ModalReservarBloque({ show, onClose, onConfirm, modo = 'normal' }) {
    const [motivo, setMotivo] = useState('Avance del proyecto final de Programación Web');
    const [asistentes, setAsistentes] = useState(4);
    const [invitados, setInvitados] = useState(['Diego Salazar', 'Valeria Chávez', 'Renzo Paredes']);

    if (!show) return null;

    const removeInvitado = (index) => {
        setInvitados(invitados.filter((_, i) => i !== index));
    };

    const getModalTitle = () => {
        if (modo === 'tope_excedido') return 'Reservar bloque · tope excedido';
        if (modo === 'solapamiento') return 'Reservar bloque · solapamiento';
        return 'Reservar bloque';
    };

    return (
        <div className="modal-backdrop-custom d-flex align-items-center justify-content-center p-3">
            <div className="card modal-card border-0 shadow-lg w-100">
                {/* Header */}
                <div className="card-header bg-white border-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
                    <h2 className="h5 fw-bold text-dark mb-0">{getModalTitle()}</h2>
                    <button type="button" className="btn-close-custom" onClick={onClose} aria-label="Cerrar">
                        ✕
                    </button>
                </div>

                <div className="card-body p-4">
                    {/* Alerta: Tope Excedido */}
                    {modo === 'tope_excedido' && (
                        <div className="alert alert-danger-custom mb-3 p-3 rounded-2">
                            <strong className="d-block mb-1">Tope de horas excedido.</strong>
                            <span>
                                Ya tienes 8 de 8 horas reservadas del 14/09 al 19/09. Cancela una reserva o elige la próxima semana.
                            </span>
                        </div>
                    )}

                    {/* Alerta: Solapamiento */}
                    {modo === 'solapamiento' && (
                        <div className="alert alert-warning-custom mb-3 p-3 rounded-2">
                            <strong className="d-block mb-1">Solapamiento detectado.</strong>
                            <span>
                                Ya tienes una reserva el 14/09/2026 de 10:00 a 11:00 en la Sala de Reuniones A-410 (RSV-2026-0418).
                            </span>
                        </div>
                    )}

                    {/* Card Verde con Detalles del Espacio */}
                    <div className="space-summary-card p-3 rounded-2 mb-3 d-flex justify-content-between align-items-center">
                        <div>
                            <div className="fw-bold text-dark space-title">
                                {modo === 'tope_excedido' ? 'Sala de Estudio Grupal E-201' : 'Laboratorio de Cómputo H-304'}
                            </div>
                            <div className="text-secondary space-subtitle">
                                {modo === 'tope_excedido' ? 'Aforo 10 · Pabellón E' : 'Aforo 30 · Edificio de Ingeniería'}
                            </div>
                        </div>
                        <div className="text-end">
                            <div className="fw-bold text-dark space-time">
                                {modo === 'tope_excedido' ? '16:00 – 17:00' : '10:00 – 11:00'}
                            </div>
                            <div className="text-secondary space-date">Lunes 14/09/2026</div>
                        </div>
                    </div>

                    {/* Formulario solo visible en modo Normal */}
                    {modo === 'normal' && (
                        <>
                            <div className="mb-3">
                                <label className="form-label-custom mb-1">MOTIVO DE LA RESERVA</label>
                                <input
                                    type="text"
                                    className="form-control input-custom"
                                    value={motivo}
                                    onChange={(e) => setMotivo(e.target.value)}
                                />
                            </div>

                            <div className="row g-2 mb-3">
                                <div className="col-4 col-sm-3">
                                    <label className="form-label-custom mb-1">ASISTENTES</label>
                                    <input
                                        type="number"
                                        className="form-control input-custom"
                                        value={asistentes}
                                        onChange={(e) => setAsistentes(e.target.value)}
                                    />
                                </div>
                                <div className="col-8 col-sm-9">
                                    <label className="form-label-custom mb-1">INVITADOS</label>
                                    <div className="invitados-input-container d-flex flex-wrap align-items-center gap-1 p-2">
                                        {invitados.map((tag, idx) => (
                                            <span key={idx} className="badge tag-invitado d-inline-flex align-items-center gap-1">
                                                {tag}
                                                <button
                                                    type="button"
                                                    className="btn-remove-tag"
                                                    onClick={() => removeInvitado(idx)}
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Indicador de Tope Semanal */}
                    <div className="tope-semanal-box p-3 rounded-2 d-flex justify-content-between align-items-center">
                        <span className="text-secondary small fw-medium">Tope semanal restante</span>
                        <span className={`fw-bold ${modo === 'tope_excedido' ? 'text-danger' : 'text-dark-teal'}`}>
                            {modo === 'tope_excedido' ? '0 de 8 horas' : '3 de 8 horas'}
                        </span>
                    </div>
                </div>

                {/* Footer y Acciones */}
                <div className="card-footer bg-white border-0 px-4 pb-4 pt-0 d-flex justify-content-end align-items-center gap-3">
                    {modo === 'normal' && (
                        <>
                            <button type="button" className="btn btn-link-cancel text-decoration-none" onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-verde-confirmar" onClick={onConfirm}>
                                Confirmar reserva
                            </button>
                        </>
                    )}

                    {modo === 'solapamiento' && (
                        <>
                            <button type="button" className="btn btn-link-verde text-decoration-none fw-semibold" onClick={onClose}>
                                Elegir otro bloque
                            </button>
                            <button type="button" className="btn btn-disabled-custom" disabled>
                                Confirmar reserva
                            </button>
                        </>
                    )}

                    {modo === 'tope_excedido' && (
                        <button type="button" className="btn btn-secondary-custom" onClick={onClose}>
                            Cerrar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

/**
 * Modal: Cancelar Reserva
 */
export function ModalCancelarReserva({ show, onClose, onConfirm, reserva }) {
    const [motivoCancelacion, setMotivoCancelacion] = useState('');

    if (!show) return null;

    const codigo = reserva?.codigo || 'RSV-2026-0473';

    return (
        <div className="modal-backdrop-custom d-flex align-items-center justify-content-center p-3">
            <div className="card modal-card border-0 shadow-lg w-100">
                {/* Header */}
                <div className="card-header bg-white border-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
                    <h2 className="h5 fw-bold text-dark mb-0">¿Cancelar la reserva {codigo}?</h2>
                    <button type="button" className="btn-close-custom" onClick={onClose} aria-label="Cerrar">
                        ✕
                    </button>
                </div>

                <div className="card-body p-4">
                    {/* Caja Resumen */}
                    <div className="space-summary-gray p-3 rounded-2 mb-3">
                        <span className="fw-bold text-dark fs-6">
                            {reserva?.titulo ? reserva.titulo.replace('Laboratorio de Cómputo ', '') : 'H-304'}
                        </span>
                        <span className="text-secondary fs-6"> · {reserva?.fecha || '14/09/2026'} · {reserva?.hora || '10:00 – 11:00'}</span>
                    </div>

                    {/* Aviso de Ventana de Cancelación */}
                    <div className="alert alert-warning-custom mb-3 p-3 rounded-2">
                        <strong className="d-block mb-1">Ventana de cancelación:</strong>
                        <span>
                            faltan 14 horas para el inicio, así que la cancelación no genera inasistencia. Cancelar con menos de 2 horas suma una inasistencia a tu registro.
                        </span>
                    </div>

                    {/* Texto informativo de inasistencias */}
                    <p className="text-secondary small mb-3">
                        Actualmente tienes <strong className="text-dark">1 inasistencia</strong> acumulada. Al llegar a 3 se bloquean las reservas por 15 días.
                    </p>

                    {/* Campo Motivo Opcional */}
                    <div>
                        <label className="form-label-custom mb-1">MOTIVO (OPCIONAL)</label>
                        <input
                            type="text"
                            className="form-control input-custom"
                            placeholder="Ej. Se reprogramó la reunión del grupo"
                            value={motivoCancelacion}
                            onChange={(e) => setMotivoCancelacion(e.target.value)}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="card-footer bg-white border-0 px-4 pb-4 pt-0 d-flex justify-content-end align-items-center gap-3">
                    <button type="button" className="btn btn-link-mantener text-decoration-none fw-semibold" onClick={onClose}>
                        Mantener la reserva
                    </button>
                    <button type="button" className="btn btn-danger-cancelar fw-semibold px-3 py-2" onClick={() => onConfirm(motivoCancelacion)}>
                        Sí, cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}