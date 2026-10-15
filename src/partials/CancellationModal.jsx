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


  return (

    <div className="cancel-modal-overlay">

      <div className="cancel-modal">


        {/* =====================
            CABECERA
            ===================== */}

        <div className="cancel-modal-header">

          <h2>
            Cancelar la reserva {reservation.code}
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


        {/* Resumen */}

        <div className="cancel-reservation-summary">

          {reservation.space.name}
          {' · '}
          {date}
          {' · '}
          {reservation.startTime}
          {' – '}
          {reservation.endTime}
          {' · '}
          {reservation.student}

        </div>


        {/* =====================
            MOTIVO
            ===================== */}

        <div className="cancel-form-group">

          <label htmlFor="cancelReason">
            MOTIVO (OBLIGATORIO)
          </label>

          <select
            id="cancelReason"
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


          <p className="cancel-help-text">
            Opciones: mantenimiento correctivo ·
            corte de energía · uso académico prioritario ·
            incidencia reportada · otro.
          </p>

        </div>


        {/* =====================
            DETALLE
            ===================== */}

        <div className="cancel-form-group">

          <label htmlFor="cancelDetail">
            DETALLE
          </label>

          <textarea
            id="cancelDetail"
            rows="3"
            value={detail}
            onChange={(event) =>
              onDetailChange(event.target.value)
            }
            placeholder="Describe el motivo de la cancelación."
          />

        </div>


        {/* =====================
            AVISO
            ===================== */}

        <div className="cancel-warning">

          <strong>
            El motivo será visible para la estudiante
          </strong>

          {' '}en su detalle de reserva y en el correo
          de aviso.

          <br />

          Esta cancelación no genera inasistencia.

        </div>


        {/* =====================
            FOOTER
            ===================== */}

        <div className="cancel-modal-footer">

          <button
            type="button"
            className="cancel-back-button"
            onClick={onClose}
          >
            Volver
          </button>


          <button
            type="button"
            className="cancel-confirm-button"
            onClick={onConfirm}
            disabled={reason.trim() === ''}
          >
            Cancelar la reserva
          </button>

        </div>


      </div>

    </div>
  );
}

export default CancellationModal;