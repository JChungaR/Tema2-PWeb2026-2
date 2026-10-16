// src/partials/DailySummary.jsx

import React from 'react';

function DailySummary({ reservations }) {

  const totalReservations =
    reservations.length;


  const confirmedReservations =
    reservations.filter(
      reservation =>
        reservation.status === 'Confirmada'
    ).length;


  const attendedReservations =
    reservations.filter(
      reservation =>
        reservation.status === 'Atendida'
    ).length;


  const noShowReservations =
    reservations.filter(
      reservation =>
        reservation.status === 'Inasistencia'
    ).length;


  const cancelledReservations =
    reservations.filter(
      reservation =>
        reservation.status === 'Cancelada'
    ).length;


  return (

    <div className="daily-summary">


      <div className="summary-card">

        <span className="summary-label">
          TOTAL DEL DÍA
        </span>

        <strong className="summary-value">
          {totalReservations}
        </strong>

      </div>


      <div className="summary-card">

        <span className="summary-label summary-confirmed">
          CONFIRMADAS
        </span>

        <strong className="summary-value summary-confirmed">
          {confirmedReservations}
        </strong>

      </div>


      <div className="summary-card">

        <span className="summary-label summary-attended">
          ATENDIDAS
        </span>

        <strong className="summary-value summary-attended">
          {attendedReservations}
        </strong>

      </div>


      <div className="summary-card">

        <span className="summary-label summary-no-show">
          INASISTENCIAS
        </span>

        <strong className="summary-value summary-no-show">
          {noShowReservations}
        </strong>

      </div>


      <div className="summary-card">

        <span className="summary-label summary-cancelled">
          CANCELADAS
        </span>

        <strong className="summary-value summary-cancelled">
          {cancelledReservations}
        </strong>

      </div>


    </div>
  );
}

export default DailySummary;