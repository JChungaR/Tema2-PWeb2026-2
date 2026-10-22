// src/pages/EnterpriseEspacios/BandejaDelDiaPage.jsx

import React, { useState } from 'react';

import initialReservations from '../../data/reservations';

import DailySummary from '../../partials/DailySummary';
import ReservationRow from '../../partials/ReservationRow';
import CancellationModal from '../../partials/CancellationModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

import './BandejaDelDiaPage.css';


function BandejaDelDiaPage({ empty = false }) {

  const [reservations, setReservations] =
    useState(initialReservations);

  const [reservationToCancel, setReservationToCancel] =
    useState(null);

  const [cancellationReason, setCancellationReason] =
    useState('');

  const [cancellationDetail, setCancellationDetail] =
    useState('');


  // =========================
  // REGISTRAR LLEGADA
  // =========================

  const registerArrival = (reservationId) => {

    const updatedReservations =
      reservations.map((reservation) => {

        if (reservation.id === reservationId) {

          return {
            ...reservation,

            status: 'Atendida',

            arrivalTime:
              new Date().toLocaleTimeString(
                'es-PE',
                {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                }
              )
          };
        }

        return reservation;
      });

    setReservations(updatedReservations);
  };


  // =========================
  // MARCAR INASISTENCIA
  // =========================

  const markNoShow = (reservationId) => {

    const updatedReservations =
      reservations.map((reservation) => {

        if (reservation.id === reservationId) {

          return {
            ...reservation,
            status: 'Inasistencia'
          };
        }

        return reservation;
      });

    setReservations(updatedReservations);
  };


  // =========================
  // ABRIR MODAL
  // =========================

  const openCancellationModal = (reservationId) => {

    const reservation =
      reservations.find(
        reservation =>
          reservation.id === reservationId
      );

    setReservationToCancel(reservation);

    setCancellationReason('');

    setCancellationDetail('');
  };


  // =========================
  // CERRAR MODAL
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

    const updatedReservations =
      reservations.map((reservation) => {

        if (
          reservation.id ===
          reservationToCancel.id
        ) {

          return {
            ...reservation,

            status: 'Cancelada',

            cancellationReason:
              cancellationReason,

            cancellationDetail:
              cancellationDetail
          };
        }

        return reservation;
      });

    setReservations(updatedReservations);

    closeCancellationModal();
  };


  // =========================
  // AGRUPAR POR ESPACIO
  // =========================

  const groupedReservations =
    reservations.reduce(
      (groups, reservation) => {

        const spaceCode =
          reservation.space.code;

        if (!groups[spaceCode]) {

          groups[spaceCode] = {
            space: reservation.space,
            reservations: []
          };
        }

        groups[spaceCode]
          .reservations
          .push(reservation);

        return groups;
      },
      {}
    );


  return (

    <div className="daily-operations">


      {/* =====================
          CABECERA
          ===================== */}

      <div className="daily-header">

        <div>

          <h1 className="daily-title">
            Bandeja del día
          </h1>

          <p className="daily-date">

            {empty
              ? 'Domingo 20/09/2026'
              : `Lunes 14/09/2026 · ${reservations.length} reservas en los espacios a mi cargo`
            }

          </p>

        </div>


        {/* =====================
            ACCIONES DE FECHA
            ===================== */}

        <div className="daily-actions">

          <div className="date-navigation">

            <a
              href="/enterprise/bandeja"
              className="btn-date-arrow"
            >
              ‹
            </a>

            <a
              href="/enterprise/bandeja"
              className="btn-today"
            >
              Hoy
            </a>

            <a
              href="/enterprise/bandeja/sin-reservas"
              className="btn-date-arrow"
            >
              ›
            </a>

          </div>


          {/* En 5.2 no aparece Buscar reserva */}

          {!empty && (

            <a
              href="/enterprise/reservas/buscar"
              className="btn-search-reservation"
            >
              Buscar reserva
            </a>

          )}

        </div>

      </div>


      {/* =====================
          5.2 SIN RESERVAS
          ===================== */}

      {empty ? (

        <div className="empty-day-card">

          <div className="empty-day-icon">

            <FontAwesomeIcon icon={faMoon} />

          </div>


          <h2 className="empty-day-title">
            No hay reservas para hoy
          </h2>


          <p className="empty-day-text">

            Los espacios del campus no atienden los domingos.
            Puedes revisar la jornada del lunes o registrar un
            bloqueo por mantenimiento.

          </p>


          <div className="empty-day-actions">

            <a
              href="/enterprise/bandeja"
              className="empty-day-primary"
            >
              Ver el lunes 21/09
            </a>

            <a
              href="/enterprise/bloqueos"
              className="empty-day-secondary"
            >
              Nuevo bloqueo
            </a>

          </div>

        </div>

      ) : (

        <>

          {/* =====================
              5.1 RESUMEN
              ===================== */}

          <DailySummary
            reservations={reservations}
          />


          {/* =====================
              5.1 ESPACIOS
              ===================== */}

          {Object.values(groupedReservations)
            .map((group) => (

              <section
                key={group.space.code}
                className="space-card"
              >

                <div className="space-header">

                  <h2 className="space-title">
                    {group.space.name}
                  </h2>

                  <span className="space-description">

                    {group.reservations.length}{' '}

                    {group.reservations.length === 1
                      ? 'reserva'
                      : 'reservas'}

                    {' · '}

                    {group.space.location}

                  </span>

                </div>


                <div className="table-responsive">

                  <table className="operation-table">

                    <thead>

                      <tr>
                        <th>BLOQUE</th>
                        <th>ESTUDIANTE</th>
                        <th>MOTIVO</th>
                        <th>ASIST.</th>
                        <th>ESTADO</th>
                        <th>ACCIONES</th>
                      </tr>

                    </thead>


                    <tbody>

                      {[...group.reservations]

                        .sort((a, b) =>
                          a.startTime.localeCompare(
                            b.startTime
                          )
                        )

                        .map((reservation) => (

                          <ReservationRow

                            key={reservation.id}

                            reservation={
                              reservation
                            }

                            onRegisterArrival={
                              registerArrival
                            }

                            onMarkNoShow={
                              markNoShow
                            }

                            onCancel={
                              openCancellationModal
                            }

                          />

                        ))}

                    </tbody>

                  </table>

                </div>

              </section>

            ))}


          {/* =====================
              MODAL
              ===================== */}

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

        </>

      )}

    </div>

  );
}


export default BandejaDelDiaPage;
