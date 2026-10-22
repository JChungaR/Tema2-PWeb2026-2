// src/partials/ReservationRow.jsx

import React from 'react';

function ReservationRow({
  reservation,
  onRegisterArrival,
  onMarkNoShow,
  onCancel
}) {

  let statusClass = 'status-confirmed';


  if (reservation.status === 'Atendida') {
    statusClass = 'status-attended';
  }

  if (reservation.status === 'En curso') {
    statusClass = 'status-progress';
  }

  if (reservation.status === 'Inasistencia') {
    statusClass = 'status-no-show';
  }

  if (reservation.status === 'Cancelada') {
    statusClass = 'status-cancelled';
  }


  const renderActions = () => {

    /*
     * RESERVA ATENDIDA
     */

    if (reservation.status === 'Atendida') {

      return (
        <span className="action-text">

          {reservation.arrivalTime
            ? `Llegada ${reservation.arrivalTime}`
            : 'Llegada registrada'}

        </span>
      );
    }


    /*
     * EN CURSO
     */

    if (reservation.status === 'En curso') {

      return (
        <span className="action-text">

          {reservation.arrivalTime
            ? `Llegada ${reservation.arrivalTime}`
            : 'Llegada registrada'}

        </span>
      );
    }


    /*
     * CANCELADA
     */

    if (reservation.status === 'Cancelada') {

      return (
        <span className="action-text">
          Cancelada por el encargado
        </span>
      );
    }


    /*
     * INASISTENCIA
     */

    if (reservation.status === 'Inasistencia') {

      return (
        <span className="action-text">
          Inasistencia registrada
        </span>
      );
    }


    /*
     * CONFIRMADA
     */

    return (

      <div className="operation-actions">


        <a
          href="/enterprise/bandeja/registro"
          className="operation-btn btn-arrival"
        >
          Registrar llegada
        </a>


        <button
          type="button"
          className="operation-btn btn-no-show"
          onClick={() =>
            onMarkNoShow(reservation.id)
          }
        >
          Inasistencia
        </button>


        <button
          type="button"
          className="operation-btn btn-cancel-reservation"
          onClick={() =>
            onCancel(reservation.id)
          }
        >
          Cancelar
        </button>


      </div>
    );
  };


  return (

    <tr>

      <td className="cell-block">
        {reservation.startTime}–{reservation.endTime}
      </td>


      <td className="cell-student">
        {reservation.student}
      </td>


      <td className="cell-reason">
        {reservation.reason}
      </td>


      <td className="cell-attendees">
        {reservation.attendees}
      </td>


      <td className="cell-status">

        <span
          className={`status-badge ${statusClass}`}
        >
          {reservation.status}
        </span>

      </td>


      <td className="cell-actions">

        {renderActions()}

      </td>

    </tr>
  );
}

export default ReservationRow;