
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './EspaciosPage.css'

// ========================================
// ESPACIOS INICIALES
// ========================================

const espaciosIniciales = [
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
// LEER ESPACIOS GUARDADOS
// ========================================


function obtenerEspacios() {
  try {
    const guardados = JSON.parse(
      localStorage.getItem('espaciosReservaUL') || '[]'
    )

    const estados = JSON.parse(
      localStorage.getItem('estadosReservaUL') || '{}'
    )

    if (!Array.isArray(guardados)) {
      return espaciosIniciales.map((espacio) => ({
        ...espacio,
        estado:
          estados[espacio.codigo.toUpperCase()] ||
          espacio.estado ||
          'Disponible',
      }))
    }

    // No mostrar borradores en el catálogo principal.
    const confirmados = guardados.filter(
      (espacio) =>
        espacio.estado !== 'Borrador' &&
        espacio.codigo &&
        espacio.nombre
    )

    // Los espacios iniciales conservan sus datos.
    const codigosIniciales = new Set(
      espaciosIniciales.map((espacio) =>
        espacio.codigo.toUpperCase()
      )
    )

    // Agregar únicamente los espacios nuevos.
    const nuevos = confirmados.filter(
      (espacio) =>
        !codigosIniciales.has(
          String(espacio.codigo).toUpperCase()
        )
    )

    // Aplicar el estado actualizado a cada espacio.
    return [...espaciosIniciales, ...nuevos].map((espacio) => ({
      ...espacio,
      estado:
        estados[espacio.codigo.toUpperCase()] ||
        espacio.estado ||
        'Disponible',
    }))
  } catch (error) {
    console.error('Error al leer los espacios guardados:', error)
    return espaciosIniciales
  }
}


// ========================================
// COMPONENTE
// ========================================

export default function EspaciosPage() {
  const [espacios] = useState(() => obtenerEspacios())

  const [busqueda, setBusqueda] = useState('')
  const [tipo, setTipo] = useState('Todos')
  const [estado, setEstado] = useState('Todos')
  const [pabellon, setPabellon] = useState('Todos')

  // ========================================
  // OPCIONES DE FILTROS
  // ========================================

  const tipos = [
    ...new Set(espacios.map((espacio) => espacio.tipo))
  ]

  const pabellones = [
    ...new Set(espacios.map((espacio) => espacio.pabellon))
  ]

  // ========================================
  // FILTRADO
  // ========================================

  const espaciosFiltrados = useMemo(() => {
    return espacios.filter((espacio) => {
      const texto = busqueda.toLowerCase().trim()

      const coincideBusqueda =
        String(espacio.codigo || '').toLowerCase().includes(texto) ||
        String(espacio.nombre || '').toLowerCase().includes(texto)

      const coincideTipo =
        tipo === 'Todos' || espacio.tipo === tipo

      const coincideEstado =
        estado === 'Todos' || espacio.estado === estado

      const coincidePabellon =
        pabellon === 'Todos' || espacio.pabellon === pabellon

      return (
        coincideBusqueda &&
        coincideTipo &&
        coincideEstado &&
        coincidePabellon
      )
    })
  }, [espacios, busqueda, tipo, estado, pabellon])

  // ========================================
  // LIMPIAR FILTROS
  // ========================================

  const limpiarFiltros = () => {
    setBusqueda('')
    setTipo('Todos')
    setEstado('Todos')
    setPabellon('Todos')
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="container-fluid px-0">

      {/* CABECERA */}

      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h1 className="enterprise-title mb-1">
            Espacios
          </h1>

          <p className="enterprise-subtitle mb-0">
            {espacios.length} espacios en Campus Monterrico
          </p>
        </div>

        <Link
          to="/enterprise/espacios/nuevo"
          className="btn btn-enterprise px-4 py-2 fw-semibold"
        >
          + Nuevo espacio
        </Link>
      </div>

      {/* FILTROS */}

      <div className="enterprise-card p-3 mb-3">
        <div className="row g-2">

          <div className="col-lg">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por código o nombre..."
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
            />
          </div>

          <div className="col-lg-auto">
            <select
              className="form-select"
              value={tipo}
              onChange={(event) => setTipo(event.target.value)}
            >
              <option value="Todos">Tipo: Todos</option>

              {tipos.map((tipoEspacio) => (
                <option key={tipoEspacio} value={tipoEspacio}>
                  {tipoEspacio}
                </option>
              ))}
            </select>
          </div>

          <div className="col-lg-auto">
            <select
              className="form-select"
              value={estado}
              onChange={(event) => setEstado(event.target.value)}
            >
              <option value="Todos">Estado: Todos</option>
              <option value="Disponible">Disponible</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="De baja">De baja</option>
            </select>
          </div>

          <div className="col-lg-auto">
            <select
              className="form-select"
              value={pabellon}
              onChange={(event) => setPabellon(event.target.value)}
            >
              <option value="Todos">Pabellón: Todos</option>

              {pabellones.map((nombrePabellon) => (
                <option key={nombrePabellon} value={nombrePabellon}>
                  {nombrePabellon}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* FILTROS ACTIVOS */}

      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">

        {tipo !== 'Todos' && (
          <button
            type="button"
            className="badge-enterprise border-0 rounded px-2 py-1"
            onClick={() => setTipo('Todos')}
          >
            Tipo: {tipo} ×
          </button>
        )}

        {estado !== 'Todos' && (
          <button
            type="button"
            className="badge-enterprise border-0 rounded px-2 py-1"
            onClick={() => setEstado('Todos')}
          >
            Estado: {estado} ×
          </button>
        )}

        {pabellon !== 'Todos' && (
          <button
            type="button"
            className="badge-enterprise border-0 rounded px-2 py-1"
            onClick={() => setPabellon('Todos')}
          >
            Pabellón: {pabellon} ×
          </button>
        )}

        {busqueda && (
          <button
            type="button"
            className="badge-enterprise border-0 rounded px-2 py-1"
            onClick={() => setBusqueda('')}
          >
            Búsqueda: {busqueda} ×
          </button>
        )}

        {(tipo !== 'Todos' ||
          estado !== 'Todos' ||
          pabellon !== 'Todos' ||
          busqueda) && (
          <button
            type="button"
            className="btn btn-link enterprise-link p-0 text-decoration-none fw-semibold"
            onClick={limpiarFiltros}
          >
            Limpiar todo
          </button>
        )}
      </div>

      {/* TABLA */}

      <div className="enterprise-card overflow-hidden">
        <div className="table-responsive">
          <table className="table enterprise-table mb-0 align-middle">

            <thead>
              <tr>
                <th className="px-4 py-3">CÓDIGO</th>
                <th className="py-3">NOMBRE</th>
                <th className="py-3">PABELLÓN</th>
                <th className="py-3">TIPO</th>
                <th className="py-3">AFORO</th>
                <th className="py-3">ESTADO</th>
                <th className="py-3">RESERVAS VIG.</th>
                <th className="py-3 text-center">ACCIONES</th>
              </tr>
            </thead>

            <tbody>
              {espaciosFiltrados.map((espacio) => (
                <tr key={espacio.codigo}>

                  <td className="px-4 fw-semibold">
                    {espacio.codigo}
                  </td>

                  <td>{espacio.nombre}</td>

                  <td>{espacio.pabellon || espacio.sede || '—'}</td>

                  <td>{espacio.tipo}</td>

                  <td>{espacio.aforo}</td>

                  <td>
                    <span
                      className={
                        espacio.estado === 'Disponible'
                          ? 'badge rounded enterprise-success'
                          : espacio.estado === 'Mantenimiento'
                            ? 'badge rounded enterprise-warning'
                            : 'badge rounded text-secondary'
                      }
                      style={{
                        backgroundColor:
                          espacio.estado === 'Disponible'
                            ? '#E2F1EE'
                            : espacio.estado === 'Mantenimiento'
                              ? '#FCF4E5'
                              : '#EEF1F1'
                      }}
                    >
                      {espacio.estado || 'Disponible'}
                    </span>
                  </td>

                  <td>{espacio.reservas ?? 0}</td>

                  <td className="text-center">
                    <Link
                      to={`/enterprise/espacios/editar/${espacio.codigo}`}
                      className="btn btn-link enterprise-link fw-semibold text-decoration-none p-0"
                    >
                      Editar
                    </Link>
                  </td>

                </tr>
              ))}

              {espaciosFiltrados.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-5 enterprise-subtitle"
                  >
                    No se encontraron espacios con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}
