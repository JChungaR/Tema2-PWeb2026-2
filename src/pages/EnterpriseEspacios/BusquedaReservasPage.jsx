// src/pages/EnterpriseEspacios/BusquedaReservasPage.jsx

import React, {
  useMemo,
  useState
} from 'react';

import './BusquedaReservasPage.css';


function BusquedaReservasPage() {

  // =====================================================
  // DATOS DEL MOCKUP
  // =====================================================

  const reservations = [

    {
      code: 'RSV-2026-0473',
      student: 'Camila Rojas Quispe',
      space: 'Lab. de Cómputo H-304',
      date: '14/09',
      time: '10:00',
      status: 'Confirmada'
    },

    {
      code: 'RSV-2026-0468',
      student: 'Camila Rojas Quispe',
      space: 'Cabina de Grabación N-105',
      date: '14/09',
      time: '09:00',
      status: 'En curso'
    },

    {
      code: 'RSV-2026-0461',
      student: 'Andrea Villanueva Soto',
      space: 'Lab. de Cómputo H-304',
      date: '14/09',
      time: '17:00',
      status: 'Inasistencia'
    },

    {
      code: 'RSV-2026-0455',
      student: 'Camila Rojas Quispe',
      space: 'Sala Grupal E-201',
      date: '15/09',
      time: '18:00',
      status: 'Confirmada'
    },

    {
      code: 'RSV-2026-0428',
      student: 'Sebastián Loayza Prado',
      space: 'Sala Grupal E-201',
      date: '14/09',
      time: '11:00',
      status: 'Cancelada'
    },

    {
      code: 'RSV-2026-0402',
      student: 'Gabriela Ñahui Ccama',
      space: 'Sala Biblioteca B-102',
      date: '08/09',
      time: '11:00',
      status: 'Atendida'
    }

  ];


  // =====================================================
  // ESTADOS
  // =====================================================

  const [searchText, setSearchText] =
    useState('RSV-2026');

  const [activeSearch, setActiveSearch] =
    useState('RSV-2026');

  const [spaceFilter, setSpaceFilter] =
    useState('Todos');

  const [statusFilter, setStatusFilter] =
    useState('Todos');


  // =====================================================
  // ESPACIOS DISPONIBLES
  // =====================================================

  const spaces = [
    'Todos',
    'Lab. de Cómputo H-304',
    'Cabina de Grabación N-105',
    'Sala Grupal E-201',
    'Sala Biblioteca B-102'
  ];


  // =====================================================
  // ESTADOS DISPONIBLES
  // =====================================================

  const statuses = [
    'Todos',
    'Confirmada',
    'En curso',
    'Inasistencia',
    'Cancelada',
    'Atendida'
  ];


  // =====================================================
  // FILTRAR RESERVAS
  // =====================================================

  const filteredReservations =
    useMemo(() => {

      const search =
        activeSearch
          .trim()
          .toLowerCase();


      return reservations.filter(
        reservation => {

          const matchesSearch =
            search === '' ||

            reservation.code
              .toLowerCase()
              .includes(search) ||

            reservation.student
              .toLowerCase()
              .includes(search);


          const matchesSpace =
            spaceFilter === 'Todos' ||
            reservation.space === spaceFilter;


          const matchesStatus =
            statusFilter === 'Todos' ||
            reservation.status === statusFilter;


          return (
            matchesSearch &&
            matchesSpace &&
            matchesStatus
          );

        }
      );

    }, [
      activeSearch,
      spaceFilter,
      statusFilter
    ]);


  // =====================================================
  // BUSCAR
  // =====================================================

  const handleSearch = (event) => {

    event.preventDefault();

    setActiveSearch(
      searchText
    );

  };


  // =====================================================
  // CLASE DEL ESTADO
  // =====================================================

  const getStatusClass = (status) => {

    if (status === 'Confirmada') {
      return 'search-status-confirmed';
    }

    if (status === 'En curso') {
      return 'search-status-progress';
    }

    if (status === 'Inasistencia') {
      return 'search-status-no-show';
    }

    if (status === 'Cancelada') {
      return 'search-status-cancelled';
    }

    if (status === 'Atendida') {
      return 'search-status-attended';
    }

    return '';

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="search-reservations-page">


      {/* =================================================
          TÍTULO
          ================================================= */}

      <h1 className="search-reservations-title">
        Búsqueda de reservas
      </h1>


      {/* =================================================
          FILTROS
          ================================================= */}

      <form
        className="search-reservations-filters"
        onSubmit={handleSearch}
      >


        {/* BÚSQUEDA */}

        <input
          type="text"
          className="search-reservations-input"
          value={searchText}
          onChange={(event) =>
            setSearchText(
              event.target.value
            )
          }
          placeholder="Código o usuario"
        />


        {/* ESPACIO */}

        <select
          className="search-reservations-select"
          value={spaceFilter}
          onChange={(event) =>
            setSpaceFilter(
              event.target.value
            )
          }
        >

          {spaces.map(space => (

            <option
              key={space}
              value={space}
            >
              Espacio: {space}
            </option>

          ))}

        </select>


        {/* ESTADO */}

        <select
          className="search-reservations-select"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
        >

          {statuses.map(status => (

            <option
              key={status}
              value={status}
            >
              Estado: {status}
            </option>

          ))}

        </select>


        {/* BUSCAR */}

        <button
          type="submit"
          className="search-reservations-button"
        >
          Buscar
        </button>


      </form>


      {/* =================================================
          CANTIDAD DE RESULTADOS
          ================================================= */}

      <p className="search-reservations-count">

        {filteredReservations.length}
        {' '}
        {filteredReservations.length === 1
          ? 'reserva encontrada'
          : 'reservas encontradas'
        }

        {activeSearch.trim() !== '' && (

          <>
            {' '}
            para «{activeSearch}»
          </>

        )}

      </p>


      {/* =================================================
          TABLA
          ================================================= */}

      <div className="search-reservations-card">


        <div className="search-table-responsive">

          <table className="search-reservations-table">


            <thead>

              <tr>

                <th>
                  CÓDIGO
                </th>

                <th>
                  USUARIO
                </th>

                <th>
                  ESPACIO
                </th>

                <th>
                  FECHA Y BLOQUE
                </th>

                <th>
                  ESTADO
                </th>

                <th>
                </th>

              </tr>

            </thead>


            <tbody>


              {filteredReservations.length > 0 ? (

                filteredReservations.map(
                  reservation => (

                    <tr key={reservation.code}>


                      {/* CÓDIGO */}

                      <td className="search-code">

                        {reservation.code}

                      </td>


                      {/* USUARIO */}

                      <td>

                        {reservation.student}

                      </td>


                      {/* ESPACIO */}

                      <td>

                        {reservation.space}

                      </td>


                      {/* FECHA */}

                      <td>

                        {reservation.date}
                        {' · '}
                        {reservation.time}

                      </td>


                      {/* ESTADO */}

                      <td>

                        <span
                          className={
                            `search-status ${getStatusClass(
                              reservation.status
                            )}`
                          }
                        >
                          {reservation.status}
                        </span>

                      </td>


                      {/* DETALLE */}

                      <td className="search-detail-cell">

                        <button
                          type="button"
                          className="search-detail-button"
                        >
                          Detalle
                        </button>

                      </td>


                    </tr>

                  )
                )

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="search-empty"
                  >

                    No se encontraron reservas
                    con los criterios seleccionados.

                  </td>

                </tr>

              )}


            </tbody>


          </table>

        </div>

      </div>


    </div>

  );

}


export default BusquedaReservasPage;