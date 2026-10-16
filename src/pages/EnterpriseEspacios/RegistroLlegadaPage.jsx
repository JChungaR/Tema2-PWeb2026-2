// src/pages/EnterpriseEspacios/RegistroLlegadaPage.jsx

import React, { useState } from 'react';

import initialReservations from '../../data/reservations';
import CancellationModal from '../../partials/CancellationModal';

import './RegistroLlegadaPage.css';


function RegistroLlegadaPage() {

  // =========================
  // DATOS
  // =========================

  const [reservations, setReservations] =
    useState(initialReservations);


  // =========================
  // FILA EXPANDIDA
  // =========================

  const [expanded, setExpanded] =
    useState(true);


  // =========================
  // MENSAJE SUPERIOR
  // =========================

  const [message, setMessage] =
    useState('');


  // =========================
  // CANCELACIÓN
  // =========================

  const [reservationToCancel, setReservationToCancel] =
    useState(null);

  const [cancellationReason, setCancellationReason] =
    useState('');

  const [cancellationDetail, setCancellationDetail] =
    useState('');


  // =========================
  // BUSCAR RESERVAS
  // =========================

  const camila = reservations.find(
    reservation =>
      reservation.reservationCode === 'RSV-2026-0473'
  );

  const andrea = reservations.find(
    reservation =>
      reservation.reservationCode === 'RSV-2026-0461'
  );


  // =========================
  // ACTUALIZAR UNA RESERVA
  // =========================

  const updateReservation = (
    reservationId,
    changes
  ) => {

    setReservations(currentReservations =>

      currentReservations.map(reservation =>

        reservation.id === reservationId
          ? {
              ...reservation,
              ...changes
            }
          : reservation

      )

    );
  };


  // =========================
  // OBTENER HORA ACTUAL
  // =========================

  const getCurrentTime = () => {

    return new Date().toLocaleTimeString(
      'es-PE',
      {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }
    );

  };


  // =========================
  // REGISTRAR LLEGADA
  // =========================

  const registerArrival = (
    reservation,
    late = false
  ) => {

    if (!reservation) {
      return;
    }

    const arrivalTime =
      getCurrentTime();


    updateReservation(
      reservation.id,
      {
        status: 'Atendida',
        arrivalTime,
        lateArrival: late
      }
    );


    setMessage(
      late
        ? `Llegada tardía registrada a las ${arrivalTime} para ${reservation.reservationCode}.`
        : `Llegada registrada a las ${arrivalTime} para ${reservation.reservationCode}.`
    );

  };


  // =========================
  // MARCAR INASISTENCIA
  // =========================

  const markNoShow = (reservation) => {

    if (!reservation) {
      return;
    }


    updateReservation(
      reservation.id,
      {
        status: 'Inasistencia'
      }
    );


    setMessage(
      `Inasistencia registrada para ${reservation.reservationCode}.`
    );

  };


  // =========================
  // ABRIR CANCELACIÓN
  // =========================

  const openCancellationModal =
    (reservation) => {

      setReservationToCancel(
        reservation
      );

      setCancellationReason('');

      setCancellationDetail('');

    };


  // =========================
  // CERRAR CANCELACIÓN
  // =========================

  const closeCancellationModal = () => {

    setReservationToCancel(null);

    setCancellationReason('');

    setCancellationDetail('');

  };


  // =========================
  // CONFIRMAR CANCELACIÓN
  // =========================

  const confirmCancellation = () => {

    if (
      !reservationToCancel ||
      cancellationReason.trim() === ''
    ) {
      return;
    }


    updateReservation(
      reservationToCancel.id,
      {
        status: 'Cancelada',

        cancellationReason,

        cancellationDetail
      }
    );


    setMessage(
      `Reserva ${reservationToCancel.reservationCode} cancelada correctamente.`
    );


    closeCancellationModal();

  };


  // =========================
  // SEGURIDAD
  // =========================

  if (!camila || !andrea) {

    return (

      <div className="registro-llegada-page">

        <h1 className="registro-llegada-title">
          Bandeja del día · lunes 14/09/2026
        </h1>

        <p>
          No se encontraron las reservas necesarias
          para mostrar esta vista.
        </p>

      </div>

    );

  }


  // =========================
  // RENDER
  // =========================

  return (

    <div className="registro-llegada-page">


      {/* =========================
          TÍTULO
          ========================= */}

      <h1 className="registro-llegada-title">
        Bandeja del día · lunes 14/09/2026
      </h1>


      {/* =========================
          MENSAJE
          ========================= */}

      {message && (

        <div className="registro-success-message">

          <span className="registro-success-icon">
            ✓
          </span>

          <span>
            {message}
          </span>

        </div>

      )}


      {/* =========================
          TARJETA PRINCIPAL
          ========================= */}

      <section className="registro-reservas-card">


        {/* =================================================
            CAMILA
            ================================================= */}

        <div className="registro-reserva">


          {/* CABECERA */}

          <div className="registro-reserva-header">

            <div className="registro-bloque">

              {camila.startTime}
              –
              {camila.endTime}

            </div>


            <div className="registro-estudiante">
              {camila.student}
            </div>


            <div className="registro-asistentes">

              {camila.attendees}
              {' '}
              asistentes

            </div>


            <div className="registro-estado">
              {camila.status}
            </div>


            <div
              className="registro-collapse-icon"
              onClick={() =>
                setExpanded(!expanded)
              }
              role="button"
              tabIndex="0"
            >

              {expanded ? '▲' : '▼'}

            </div>

          </div>


          {/* =========================
              CUERPO EXPANDIDO
              ========================= */}

          {expanded && (

            <div className="registro-reserva-body">


              {/* =========================
                  INFORMACIÓN
                  ========================= */}

              <div className="registro-info-section">


                <div className="registro-info-grid">


                  {/* COLUMNA IZQUIERDA */}

                  <div className="registro-info-column">


                    <div className="registro-info-item">

                      <span className="registro-label">
                        RESERVA
                      </span>

                      <strong>
                        {camila.reservationCode}
                      </strong>

                    </div>


                    <div className="registro-info-item">

                      <span className="registro-label">
                        CORREO
                      </span>

                      <span>
                        {camila.email}
                      </span>

                    </div>


                    <div className="registro-info-item">

                      <span className="registro-label">
                        MOTIVO
                      </span>

                      <span>
                        {camila.reason}
                      </span>

                    </div>


                    <div className="registro-info-item">

                      <span className="registro-label">
                        INVITADOS
                      </span>

                      <span>

                        {camila.guests?.length > 0
                          ? camila.guests.join(' · ')
                          : 'Sin invitados'
                        }

                      </span>

                    </div>

                  </div>


                  {/* COLUMNA CENTRAL */}

                  <div className="registro-info-column">


                    <div className="registro-info-item">

                      <span className="registro-label">
                        CÓDIGO DE ESTUDIANTE
                      </span>

                      <strong>
                        {camila.studentCode}
                      </strong>

                    </div>


                    <div className="registro-info-item">

                      <span className="registro-label">
                        INASISTENCIAS ACUMULADAS
                      </span>

                      <strong>
                        {camila.accumulatedNoShows}
                      </strong>

                    </div>


                    {camila.arrivalTime && (

                      <div className="registro-info-item">

                        <span className="registro-label">
                          HORA DE LLEGADA
                        </span>

                        <strong>
                          {camila.arrivalTime}
                        </strong>

                      </div>

                    )}

                  </div>

                </div>

              </div>


              {/* =========================
                  PANEL DERECHO
                  ========================= */}

              <aside className="registro-actions-panel">


                <div className="registro-tolerance-card">

                  <span className="registro-tolerance-label">
                    TOLERANCIA
                  </span>

                  <strong className="registro-tolerance-time">

                    Faltan {camila.minutesRemaining} min

                  </strong>

                  <span className="registro-tolerance-description">

                    Podrás marcar la inasistencia
                    a las {camila.noShowAvailableAt}.

                  </span>

                </div>


                {/* REGISTRAR LLEGADA */}

                <button

                  type="button"

                  className={
                    camila.status === 'Confirmada'
                      ? 'registro-btn registro-btn-primary'
                      : 'registro-btn registro-btn-disabled'
                  }

                  disabled={
                    camila.status !== 'Confirmada'
                  }

                  onClick={() =>
                    registerArrival(camila)
                  }

                >

                  {camila.status === 'Atendida'
                    ? 'Llegada registrada'
                    : 'Registrar llegada'
                  }

                </button>


                {/* INASISTENCIA */}

                <button
                  type="button"
                  className="registro-btn registro-btn-disabled"
                  disabled
                >
                  Marcar inasistencia
                </button>


                {/* CANCELAR */}

                <button

                  type="button"

                  className={
                    camila.status === 'Confirmada'
                      ? 'registro-btn registro-btn-cancel'
                      : 'registro-btn registro-btn-disabled'
                  }

                  disabled={
                    camila.status !== 'Confirmada'
                  }

                  onClick={() =>
                    openCancellationModal(camila)
                  }

                >
                  Cancelar la reserva
                </button>


              </aside>

            </div>

          )}

        </div>


        {/* =================================================
            ANDREA
            ================================================= */}

        <div className="registro-reserva registro-reserva-late">


          <div className="registro-late-info">


            <strong className="registro-late-title">

              {andrea.student}

              {' · '}

              {andrea.startTime}
              –
              {andrea.endTime}

              {' · '}

              {andrea.reservationCode}

            </strong>


            <p className="registro-late-meta">

              {andrea.studentCode}

              {' · '}

              {andrea.email}

              {' · '}

              {andrea.accumulatedNoShows}
              {' '}
              inasistencias acumuladas

            </p>


            <p className="registro-late-reason">

              Motivo: {andrea.reason}

              {' · '}

              {andrea.attendees}
              {' '}
              asistentes

            </p>


            {andrea.arrivalTime && (

              <p className="registro-late-reason">

                Llegada registrada:
                {' '}
                {andrea.arrivalTime}

              </p>

            )}

          </div>


          {/* =========================
              ACCIONES ANDREA
              ========================= */}

          <aside
            className="
              registro-actions-panel
              registro-actions-panel-late
            "
          >


            <div
              className="
                registro-tolerance-card
                registro-tolerance-expired
              "
            >

              <span className="registro-tolerance-label">
                TOLERANCIA VENCIDA
              </span>

              <strong className="registro-tolerance-time">

                +{andrea.lateMinutes} min

              </strong>

            </div>


            {/* LLEGADA TARDÍA */}

            <button

              type="button"

              className={
                andrea.status === 'Confirmada'
                  ? 'registro-btn registro-btn-late'
                  : 'registro-btn registro-btn-disabled'
              }

              disabled={
                andrea.status !== 'Confirmada'
              }

              onClick={() =>
                registerArrival(
                  andrea,
                  true
                )
              }

            >

              {andrea.status === 'Atendida'
                ? 'Llegada registrada'
                : 'Registrar llegada tardía'
              }

            </button>


            {/* INASISTENCIA */}

            <button

              type="button"

              className={
                andrea.status === 'Confirmada'
                  ? 'registro-btn registro-btn-no-show'
                  : 'registro-btn registro-btn-disabled'
              }

              disabled={
                andrea.status !== 'Confirmada'
              }

              onClick={() =>
                markNoShow(andrea)
              }

            >

              {andrea.status === 'Inasistencia'
                ? 'Inasistencia registrada'
                : 'Marcar inasistencia'
              }

            </button>


          </aside>

        </div>


      </section>


      {/* =========================
          MODAL CANCELACIÓN
          ========================= */}

      <CancellationModal

        reservation={
          reservationToCancel
        }

        date="14/09/2026"

        reason={
          cancellationReason
        }

        detail={
          cancellationDetail
        }

        onReasonChange={
          setCancellationReason
        }

        onDetailChange={
          setCancellationDetail
        }

        onConfirm={
          confirmCancellation
        }

        onClose={
          closeCancellationModal
        }

      />


    </div>

  );

}


export default RegistroLlegadaPage;