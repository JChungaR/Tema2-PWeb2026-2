// src/pages/EnterpriseEspacios/EspaciosPage.jsx

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './EspaciosPage.css'


export default function EspaciosPage() {

  const espacios = [
    {
      codigo: 'E-201',
      nombre: 'Sala de Estudio Grupal E-201',
      pabellon: 'Pabellón E',
      tipo: 'Sala de estudio grupal',
      aforo: 8,
      estado: 'Disponible',
      reservas: 6
    },
    {
      codigo: 'E-202',
      nombre: 'Sala de Estudio Grupal E-202',
      pabellon: 'Pabellón E',
      tipo: 'Sala de estudio grupal',
      aforo: 6,
      estado: 'Disponible',
      reservas: 4
    },
    {
      codigo: 'H-304',
      nombre: 'Laboratorio de Cómputo H-304',
      pabellon: 'Ed. de Ingeniería',
      tipo: 'Laboratorio de cómputo',
      aforo: 30,
      estado: 'Disponible',
      reservas: 11
    },
    {
      codigo: 'H-305',
      nombre: 'Laboratorio de Cómputo H-305',
      pabellon: 'Ed. de Ingeniería',
      tipo: 'Laboratorio de cómputo',
      aforo: 24,
      estado: 'Mantenimiento',
      reservas: 0
    },
    {
      codigo: 'H-201',
      nombre: 'Laboratorio de Redes H-201',
      pabellon: 'Ed. de Ingeniería',
      tipo: 'Laboratorio de cómputo',
      aforo: 20,
      estado: 'Disponible',
      reservas: 6
    },
    {
      codigo: 'N-105',
      nombre: 'Cabina de Grabación N-105',
      pabellon: 'Pabellón N',
      tipo: 'Cabina de grabación',
      aforo: 3,
      estado: 'Disponible',
      reservas: 5
    },
    {
      codigo: 'Q-101',
      nombre: 'Auditorio Q-101',
      pabellon: 'Pabellón Q',
      tipo: 'Auditorio',
      aforo: 120,
      estado: 'Disponible',
      reservas: 2
    },
    {
      codigo: 'A-410',
      nombre: 'Sala de Reuniones A-410',
      pabellon: 'Pabellón A',
      tipo: 'Sala de reuniones',
      aforo: 12,
      estado: 'Disponible',
      reservas: 7
    },
    {
      codigo: 'A-411',
      nombre: 'Sala de Reuniones A-411',
      pabellon: 'Pabellón A',
      tipo: 'Sala de reuniones',
      aforo: 10,
      estado: 'De baja',
      reservas: 0
    },
    {
      codigo: 'B-102',
      nombre: 'Sala de Estudio Biblioteca B-102',
      pabellon: 'Biblioteca',
      tipo: 'Sala de estudio grupal',
      aforo: 6,
      estado: 'Disponible',
      reservas: 9
    }
  ]


  // ========================================
  // ESTADOS DE LOS FILTROS
  // ========================================

  const [busqueda, setBusqueda] = useState('')

  const [tipo, setTipo] = useState('')

  const [estado, setEstado] = useState('')

  const [pabellon, setPabellon] = useState('')


  // ========================================
  // FILTRAR ESPACIOS
  // ========================================

  const espaciosFiltrados = espacios.filter((espacio) => {

    const coincideBusqueda =
      espacio.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
      espacio.nombre.toLowerCase().includes(busqueda.toLowerCase())


    const coincideTipo =
      tipo === '' ||
      espacio.tipo === tipo


    const coincideEstado =
      estado === '' ||
      espacio.estado === estado


    const coincidePabellon =
      pabellon === '' ||
      espacio.pabellon === pabellon


    return (
      coincideBusqueda &&
      coincideTipo &&
      coincideEstado &&
      coincidePabellon
    )
  })


  // ========================================
  // LIMPIAR FILTROS
  // ========================================

  function limpiarFiltros() {
    setBusqueda('')
    setTipo('')
    setEstado('')
    setPabellon('')
  }


  return (
    <div className="espacios-page">


      {/* ========================================
          CABECERA
          ======================================== */}

      <div className="espacios-header">

        <div>

          <h1 className="enterprise-title">
            Espacios
          </h1>

          <p className="enterprise-subtitle">
            12 espacios en Campus Monterrico
          </p>

        </div>


        {/* CAMBIA A LA VISTA NUEVO ESPACIO */}

        <Link
          to="/enterprise/espacios/nuevo"
          className="btn btn-enterprise"
        >
          + Nuevo espacio
        </Link>

      </div>


      {/* ========================================
          FILTROS
          ======================================== */}

      <div className="espacios-filtros">


        {/* BUSCAR */}

        <input
          type="text"
          className="form-control"
          placeholder="Buscar por código o nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />


        {/* TIPO */}

        <select
          className="form-select"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >

          <option value="">
            Tipo: Todos
          </option>

          <option value="Laboratorio de cómputo">
            Tipo: Laboratorio de cómputo
          </option>

          <option value="Sala de estudio grupal">
            Tipo: Sala de estudio grupal
          </option>

          <option value="Sala de reuniones">
            Tipo: Sala de reuniones
          </option>

          <option value="Auditorio">
            Tipo: Auditorio
          </option>

          <option value="Cabina de grabación">
            Tipo: Cabina de grabación
          </option>

        </select>


        {/* ESTADO */}

        <select
          className="form-select"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >

          <option value="">
            Estado: Todos
          </option>

          <option value="Disponible">
            Disponible
          </option>

          <option value="Mantenimiento">
            Mantenimiento
          </option>

          <option value="De baja">
            De baja
          </option>

        </select>


        {/* PABELLÓN */}

        <select
          className="form-select"
          value={pabellon}
          onChange={(e) => setPabellon(e.target.value)}
        >

          <option value="">
            Pabellón: Todos
          </option>

          <option value="Pabellón A">
            Pabellón A
          </option>

          <option value="Pabellón E">
            Pabellón E
          </option>

          <option value="Pabellón N">
            Pabellón N
          </option>

          <option value="Pabellón Q">
            Pabellón Q
          </option>

          <option value="Biblioteca">
            Biblioteca
          </option>

          <option value="Ed. de Ingeniería">
            Ed. de Ingeniería
          </option>

        </select>

      </div>


      {/* ========================================
          FILTROS ACTIVOS
          ======================================== */}

      {(tipo || estado || pabellon || busqueda) && (

        <div className="filtros-activos">

          <span>
            Filtros activos:
          </span>


          {/* TIPO */}

          {tipo && (

            <button
              className="badge-enterprise filtro-activo"
              onClick={() => setTipo('')}
            >
              Tipo: {tipo} ×
            </button>

          )}


          {/* ESTADO */}

          {estado && (

            <button
              className="badge-enterprise filtro-activo"
              onClick={() => setEstado('')}
            >
              Estado: {estado} ×
            </button>

          )}


          {/* PABELLÓN */}

          {pabellon && (

            <button
              className="badge-enterprise filtro-activo"
              onClick={() => setPabellon('')}
            >
              Pabellón: {pabellon} ×
            </button>

          )}


          {/* BÚSQUEDA */}

          {busqueda && (

            <button
              className="badge-enterprise filtro-activo"
              onClick={() => setBusqueda('')}
            >
              Búsqueda: {busqueda} ×
            </button>

          )}


          {/* LIMPIAR TODO */}

          <button
            className="enterprise-link limpiar-filtros"
            onClick={limpiarFiltros}
          >
            Limpiar todo
          </button>

        </div>

      )}


      {/* ========================================
          TABLA
          ======================================== */}

      <div className="espacios-tabla">

        <table className="table enterprise-table mb-0">

          <thead>

            <tr>

              <th>CÓDIGO</th>

              <th>NOMBRE</th>

              <th>PABELLÓN</th>

              <th>TIPO</th>

              <th>AFORO</th>

              <th>ESTADO</th>

              <th>RESERVAS VIG.</th>

              <th></th>

            </tr>

          </thead>


          <tbody>

            {espaciosFiltrados.map((espacio) => (

              <tr key={espacio.codigo}>

                <td className="fw-semibold">
                  {espacio.codigo}
                </td>

                <td>
                  {espacio.nombre}
                </td>

                <td>
                  {espacio.pabellon}
                </td>

                <td>
                  {espacio.tipo}
                </td>

                <td>
                  {espacio.aforo}
                </td>

                <td>

                  <span
                    className={`estado-${espacio.estado
                      .toLowerCase()
                      .replace(' ', '-')}`}
                  >
                    {espacio.estado}
                  </span>

                </td>

                <td>
                  {espacio.reservas}
                </td>

                <td>

                  {/* EDITAR */}

                  <Link
                    to={`/enterprise/espacios/editar/${espacio.codigo}`}
                    className="editar-espacio"
                  >
                    Editar
                  </Link>

                </td>

              </tr>

            ))}


            {/* SIN RESULTADOS */}

            {espaciosFiltrados.length === 0 && (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-4"
                >
                  No se encontraron espacios.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}