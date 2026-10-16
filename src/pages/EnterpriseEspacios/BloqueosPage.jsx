// src/pages/EnterpriseEspacios/BloqueosPage.jsx

import React, { useState } from 'react';

import './BloqueosPage.css';


function BloqueosPage() {

  // =====================================================
  // DATOS BASE
  // =====================================================

  const timeBlocks = [
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00'
  ];


  const initialValues = {
    space: 'H-305',
    fromDate: '16/09/2026',
    toDate: '18/09/2026',

    reason:
      'Cambio de 24 computadoras y recableado eléctrico del laboratorio.'
  };


  // =====================================================
  // ESTADO DEL FORMULARIO
  // =====================================================

  const [space, setSpace] =
    useState(initialValues.space);

  const [fromDate, setFromDate] =
    useState(initialValues.fromDate);

  const [toDate, setToDate] =
    useState(initialValues.toDate);

  const [reason, setReason] =
    useState(initialValues.reason);


  // all = Todo el día
  // range = Rango horario

  const [blockMode, setBlockMode] =
    useState('all');


  const [selectedBlocks, setSelectedBlocks] =
    useState([...timeBlocks]);


  // =====================================================
  // MENSAJE
  // =====================================================

  const [message, setMessage] =
    useState('');

  const [messageType, setMessageType] =
    useState('success');


  // =====================================================
  // VISTA PREVIA
  // =====================================================

  const calendarRows = [

    {
      time: '09:00',

      days: [
        {
          text: 'Bloqueado',
          type: 'blocked'
        },

        {
          text: 'Bloqueado',
          type: 'blocked'
        },

        {
          text: 'Bloqueado',
          type: 'blocked'
        }
      ]
    },


    {
      time: '10:00',

      days: [
        {
          text: 'Se cancela',
          type: 'cancelled'
        },

        {
          text: 'Bloqueado',
          type: 'blocked'
        },

        {
          text: 'Se cancela',
          type: 'cancelled'
        }
      ]
    },


    {
      time: '11:00',

      days: [
        {
          text: 'Bloqueado',
          type: 'blocked'
        },

        {
          text: 'Se cancela',
          type: 'cancelled'
        },

        {
          text: 'Bloqueado',
          type: 'blocked'
        }
      ]
    },


    {
      time: '12:00',

      days: [
        {
          text: 'Bloqueado',
          type: 'blocked'
        },

        {
          text: 'Bloqueado',
          type: 'blocked'
        },

        {
          text: 'Se cancela',
          type: 'cancelled'
        }
      ]
    }

  ];


  // =====================================================
  // RESERVAS AFECTADAS
  // =====================================================

  const affectedReservations = [

    {
      code: 'RSV-2026-0491',
      student: 'Diego Salazar',
      date: '16/09',
      time: '10:00'
    },

    {
      code: 'RSV-2026-0494',
      student: 'Lucía Ferreyra',
      date: '17/09',
      time: '11:00'
    },

    {
      code: 'RSV-2026-0498',
      student: 'Renzo Paredes',
      date: '18/09',
      time: '10:00'
    },

    {
      code: 'RSV-2026-0502',
      student: 'Mariana Tello',
      date: '18/09',
      time: '12:00'
    }

  ];


  // =====================================================
  // CAMBIAR MODO
  // =====================================================

  const selectAllDay = () => {

    setBlockMode('all');

    setSelectedBlocks(
      [...timeBlocks]
    );

    setMessage('');

  };


  const selectRange = () => {

    setBlockMode('range');

    // Dejamos un rango inicial útil para el ejemplo.
    setSelectedBlocks([
      '09:00',
      '10:00',
      '11:00',
      '12:00'
    ]);

    setMessage('');

  };


  // =====================================================
  // SELECCIONAR / DESELECCIONAR BLOQUE
  // =====================================================

  const toggleBlock = (time) => {

    if (blockMode === 'all') {
      return;
    }


    setSelectedBlocks(currentBlocks => {

      if (
        currentBlocks.includes(time)
      ) {

        return currentBlocks.filter(
          block => block !== time
        );

      }


      return [
        ...currentBlocks,
        time
      ];

    });


    setMessage('');

  };


  // =====================================================
  // SABER SI UN BLOQUE ESTÁ SELECCIONADO
  // =====================================================

  const isBlockSelected = (time) => {

    return selectedBlocks.includes(time);

  };


  // =====================================================
  // CANCELAR / RESTABLECER
  // =====================================================

  const handleCancel = () => {

    setSpace(
      initialValues.space
    );

    setFromDate(
      initialValues.fromDate
    );

    setToDate(
      initialValues.toDate
    );

    setReason(
      initialValues.reason
    );

    setBlockMode('all');

    setSelectedBlocks(
      [...timeBlocks]
    );

    setMessage('');

  };


  // =====================================================
  // BLOQUEAR Y AVISAR
  // =====================================================

  const handleBlock = () => {

    // VALIDACIÓN

    if (
      !space ||
      !fromDate.trim() ||
      !toDate.trim() ||
      !reason.trim()
    ) {

      setMessage(
        'Completa todos los datos del bloqueo.'
      );

      setMessageType('error');

      return;
    }


    if (
      selectedBlocks.length === 0
    ) {

      setMessage(
        'Selecciona al menos un bloque horario.'
      );

      setMessageType('error');

      return;
    }


    // SIMULACIÓN DE REGISTRO

    setMessage(
      `Bloqueo registrado para ${space} del ${fromDate} al ${toDate}. Se avisará a los estudiantes afectados.`
    );

    setMessageType('success');

  };


  // =====================================================
  // VISTA PREVIA
  // =====================================================

  const renderCalendarCell = (
    day,
    rowTime,
    index
  ) => {

    /*
     * En modo rango, si la hora no fue
     * seleccionada mostramos Disponible.
     */

    if (
      blockMode === 'range' &&
      !selectedBlocks.includes(rowTime)
    ) {

      return (

        <div
          key={`${rowTime}-${index}`}
          className="calendar-cell calendar-available"
        >
          Disponible
        </div>

      );

    }


    return (

      <div
        key={`${rowTime}-${index}`}
        className={
          day.type === 'cancelled'
            ? 'calendar-cell calendar-cancelled'
            : 'calendar-cell calendar-blocked'
        }
      >
        {day.text}
      </div>

    );

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="bloqueos-page">


      {/* =================================================
          TÍTULO
          ================================================= */}

      <h1 className="bloqueos-title">
        Nuevo bloqueo por mantenimiento
      </h1>


      {/* =================================================
          MENSAJE DE ESTADO
          ================================================= */}

      {message && (

        <div
          className={
            messageType === 'success'
              ? 'bloqueos-message bloqueos-message-success'
              : 'bloqueos-message bloqueos-message-error'
          }
        >
          {message}
        </div>

      )}


      {/* =================================================
          LAYOUT
          ================================================= */}

      <div className="bloqueos-layout">


        {/* =================================================
            COLUMNA IZQUIERDA
            ================================================= */}

        <section className="bloqueos-form-card">


          <h2 className="bloqueos-section-title">
            Datos del bloqueo
          </h2>


          {/* ===============================================
              ESPACIO
              =============================================== */}

          <div className="bloqueos-field">

            <label htmlFor="block-space">
              ESPACIO
            </label>


            <select

              id="block-space"

              value={space}

              onChange={(event) => {

                setSpace(
                  event.target.value
                );

                setMessage('');

              }}

            >

              <option value="H-305">
                Laboratorio de Cómputo H-305
              </option>

              <option value="H-304">
                Laboratorio de Cómputo H-304
              </option>

              <option value="E-201">
                Sala de Estudio Grupal E-201
              </option>

              <option value="N-105">
                Cabina de Grabación N-105
              </option>

            </select>

          </div>


          {/* ===============================================
              FECHAS
              =============================================== */}

          <div className="bloqueos-date-grid">


            <div className="bloqueos-field">

              <label htmlFor="block-from">
                DESDE
              </label>


              <input

                id="block-from"

                type="text"

                value={fromDate}

                onChange={(event) => {

                  setFromDate(
                    event.target.value
                  );

                  setMessage('');

                }}

              />

            </div>


            <div className="bloqueos-field">

              <label htmlFor="block-to">
                HASTA
              </label>


              <input

                id="block-to"

                type="text"

                value={toDate}

                onChange={(event) => {

                  setToDate(
                    event.target.value
                  );

                  setMessage('');

                }}

              />

            </div>


          </div>


          {/* ===============================================
              BLOQUES AFECTADOS
              =============================================== */}

          <div className="bloqueos-field">


            <label>
              BLOQUES AFECTADOS
            </label>


            {/* MODO */}

            <div className="bloqueos-mode-buttons">


              <button

                type="button"

                className={
                  blockMode === 'all'
                    ? 'bloqueos-mode-btn active'
                    : 'bloqueos-mode-btn'
                }

                onClick={
                  selectAllDay
                }

              >
                Todo el día
              </button>


              <button

                type="button"

                className={
                  blockMode === 'range'
                    ? 'bloqueos-mode-btn active'
                    : 'bloqueos-mode-btn'
                }

                onClick={
                  selectRange
                }

              >
                Rango horario
              </button>


            </div>


            {/* =============================================
                HORARIOS
                ============================================= */}

            <div className="bloqueos-time-list">


              {timeBlocks.map(
                (time) => (

                  <button

                    type="button"

                    key={time}

                    className={
                      isBlockSelected(time)
                        ? 'bloqueos-time-chip selected'
                        : 'bloqueos-time-chip'
                    }

                    disabled={
                      blockMode === 'all'
                    }

                    onClick={() =>
                      toggleBlock(time)
                    }

                  >
                    {time}
                  </button>

                )
              )}


            </div>

          </div>


          {/* ===============================================
              MOTIVO
              =============================================== */}

          <div
            className="
              bloqueos-field
              bloqueos-reason-field
            "
          >

            <label htmlFor="block-reason">
              MOTIVO
            </label>


            <textarea

              id="block-reason"

              value={reason}

              onChange={(event) => {

                setReason(
                  event.target.value
                );

                setMessage('');

              }}

            />

          </div>


          {/* ===============================================
              ACCIONES
              =============================================== */}

          <div className="bloqueos-form-actions">


            <button

              type="button"

              className="bloqueos-btn-cancel"

              onClick={
                handleCancel
              }

            >
              Cancelar
            </button>


            <button

              type="button"

              className="bloqueos-btn-primary"

              onClick={
                handleBlock
              }

            >
              Bloquear y avisar
            </button>


          </div>


        </section>


        {/* =================================================
            COLUMNA DERECHA
            ================================================= */}

        <div className="bloqueos-side-column">


          {/* ===============================================
              VISTA PREVIA
              =============================================== */}

          <section className="bloqueos-preview-card">


            <h2 className="bloqueos-section-title">
              Vista previa sobre el calendario
            </h2>


            <div className="bloqueos-calendar">


              {/* CABECERA */}

              <div className="calendar-header">

                <div className="calendar-empty">
                </div>

                <div>
                  Mié 16
                </div>

                <div>
                  Jue 17
                </div>

                <div>
                  Vie 18
                </div>

              </div>


              {/* FILAS */}

              {calendarRows.map(
                (row) => (

                  <div
                    key={row.time}
                    className="calendar-row"
                  >

                    <div className="calendar-time">
                      {row.time}
                    </div>


                    {row.days.map(
                      (day, index) =>

                        renderCalendarCell(
                          day,
                          row.time,
                          index
                        )

                    )}


                  </div>

                )
              )}


            </div>


          </section>


          {/* ===============================================
              RESERVAS AFECTADAS
              =============================================== */}

          <section className="bloqueos-affected-card">


            <h2 className="bloqueos-affected-title">

              {affectedReservations.length}
              {' '}
              reservas se cancelarán

            </h2>


            <div className="bloqueos-reservation-list">


              {affectedReservations.map(
                (reservation) => (

                  <div

                    key={
                      reservation.code
                    }

                    className="bloqueos-reservation-row"

                  >


                    <div className="bloqueos-reservation-info">

                      <strong>
                        {reservation.code}
                      </strong>

                      <span>
                        {' · '}
                        {reservation.student}
                      </span>

                    </div>


                    <div className="bloqueos-reservation-date">

                      {reservation.date}
                      {' '}
                      {reservation.time}

                    </div>


                  </div>

                )
              )}


            </div>


            {/* =============================================
                AVISO
                ============================================= */}

            <div className="bloqueos-warning">

              Se enviará un correo con el motivo del bloqueo
              a cada estudiante afectado. Estas cancelaciones
              no generan inasistencias.

            </div>


          </section>


        </div>


      </div>


    </div>

  );

}


export default BloqueosPage;