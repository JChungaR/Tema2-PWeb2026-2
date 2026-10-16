// src/partials/CancellationModal.jsx

import React from 'react';

function CancellationModal({
  reservation,
  date,
  reason,
  detail,
  onReasonChange,
  onDetailChange,
  onConfirm,
  onClose
}) {

  if (!reservation) {
    return null;
  }

  const reservationCode =
    reservation.reservationCode ||
    reservation.code ||
    '';

  const spaceName =
    reservation.space?.name ||
    'Espacio reservado';


  return (

    <div className="cancel-modal-overlay">


      <div className="cancel-modal">


        {/* =========================
            CABECERA
            ========================= */}

        <div className="cancel-modal-header">

          <h2>
            Cancelar la reserva
            {reservationCode
              ? ` ${reservationCode}`
              : ''
            }
          </h2>


          <button
            type="button"
            className="cancel-modal-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ×
          </button>

        </div>


        {/* =========================
            RESUMEN
            ========================= */}

        <div className="cancel-modal-summary">

          {spaceName}
          {' · '}
          {date}
          {' · '}
          {reservation.startTime}
          {' – '}
          {reservation.endTime}
          {' · '}
          {reservation.student}

        </div>


        {/* =========================
            MOTIVO
            ========================= */}

        <div className="cancel-modal-field">

          <label htmlFor="cancel-reason">
            MOTIVO (OBLIGATORIO)
          </label>


          <select
            id="cancel-reason"
            value={reason}
            onChange={(event) =>
              onReasonChange(event.target.value)
            }
          >

            <option value="">
              Seleccionar motivo
            </option>

            <option value="Mantenimiento correctivo">
              Mantenimiento correctivo
            </option>

            <option value="Corte programado de energía">
              Corte programado de energía
            </option>

            <option value="Uso académico prioritario">
              Uso académico prioritario
            </option>

            <option value="Incidencia reportada">
              Incidencia reportada
            </option>

            <option value="Otro">
              Otro
            </option>

          </select>


          <p className="cancel-modal-help">
            Opciones: mantenimiento correctivo · corte de energía ·
            uso académico prioritario · incidencia reportada · otro.
          </p>

        </div>


        {/* =========================
            DETALLE
            ========================= */}

        <div className="cancel-modal-field">

          <label htmlFor="cancel-detail">
            DETALLE
          </label>


          <textarea
            id="cancel-detail"
            value={detail}
            onChange={(event) =>
              onDetailChange(event.target.value)
            }
            placeholder="Describe el motivo de la cancelación."
          />

        </div>


        {/* =========================
            AVISO
            ========================= */}

        <div className="cancel-modal-warning">

          <strong>
            El motivo será visible para la estudiante
          </strong>

          {' '}

          en su detalle de reserva y en el correo de aviso.

          <br />

          Esta cancelación no genera inasistencia.

        </div>


        {/* =========================
            ACCIONES
            ========================= */}

        <div className="cancel-modal-actions">

          <button
            type="button"
            className="cancel-modal-back"
            onClick={onClose}
          >
            Volver
          </button>


          <button
            type="button"
            className="cancel-modal-confirm"
            onClick={onConfirm}
            disabled={!reason}
          >
            Cancelar la reserva
          </button>

        </div>


      </div>

    </div>

  );
}

export default CancellationModal;