
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './EquipamientoPage.css'

const CLAVE_ESPACIOS = 'espaciosReservaUL'
const CLAVE_EQUIPAMIENTO = 'equipamientoReservaUL'

const ESPACIOS_INICIALES = [
  {
    codigo: 'E-201',
    nombre: 'Sala de Estudio Grupal E-201',
    pabellon: 'Pabellón E',
    piso: 2,
    aforo: 8,
    estado: 'Disponible'
  },
  {
    codigo: 'E-202',
    nombre: 'Sala de Estudio Grupal E-202',
    pabellon: 'Pabellón E',
    piso: 2,
    aforo: 6,
    estado: 'Disponible'
  },
  {
    codigo: 'H-304',
    nombre: 'Laboratorio de Cómputo H-304',
    pabellon: 'Edificio de Ingeniería',
    piso: 3,
    aforo: 30,
    estado: 'Disponible'
  },
  {
    codigo: 'H-305',
    nombre: 'Laboratorio de Cómputo H-305',
    pabellon: 'Edificio de Ingeniería',
    piso: 3,
    aforo: 24,
    estado: 'Mantenimiento'
  },
  {
    codigo: 'H-201',
    nombre: 'Laboratorio de Redes H-201',
    pabellon: 'Edificio de Ingeniería',
    piso: 2,
    aforo: 20,
    estado: 'Disponible'
  },
  {
    codigo: 'N-105',
    nombre: 'Cabina de Grabación N-105',
    pabellon: 'Pabellón N',
    piso: 1,
    aforo: 3,
    estado: 'Disponible'
  },
  {
    codigo: 'Q-101',
    nombre: 'Auditorio Q-101',
    pabellon: 'Pabellón Q',
    piso: 1,
    aforo: 120,
    estado: 'Disponible'
  },
  {
    codigo: 'A-410',
    nombre: 'Sala de Reuniones A-410',
    pabellon: 'Pabellón A',
    piso: 4,
    aforo: 12,
    estado: 'Disponible'
  },
  {
    codigo: 'A-411',
    nombre: 'Sala de Reuniones A-411',
    pabellon: 'Pabellón A',
    piso: 4,
    aforo: 10,
    estado: 'De baja'
  },
  {
    codigo: 'B-102',
    nombre: 'Sala de Estudio Biblioteca B-102',
    pabellon: 'Biblioteca',
    piso: 1,
    aforo: 6,
    estado: 'Disponible'
  }
]

const EQUIPAMIENTO_H304 = [
  { id: 1, nombre: 'Computadoras', cantidad: 30 },
  { id: 2, nombre: 'Proyector', cantidad: 1 },
  { id: 3, nombre: 'Pizarra acrílica', cantidad: 2 },
  { id: 4, nombre: 'Tomacorrientes', cantidad: 16 },
  { id: 5, nombre: 'Televisor', cantidad: 1 }
]

const TIPOS_EQUIPAMIENTO = [
  'Computadoras',
  'Proyector',
  'Pizarra acrílica',
  'Tomacorrientes',
  'Televisor',
  'Micrófonos',
  'Parlantes',
  'Cámaras',
  'Mesas',
  'Sillas',
  'Otros'
]

function leerJSON(clave, valorInicial) {
  try {
    const valor = JSON.parse(localStorage.getItem(clave) || 'null')
    return valor ?? valorInicial
  } catch {
    return valorInicial
  }
}

function obtenerEspacio(codigo) {
  const guardados = leerJSON(CLAVE_ESPACIOS, [])

  return [
    ...ESPACIOS_INICIALES,
    ...(Array.isArray(guardados) ? guardados : [])
  ].find(
    (espacio) =>
      espacio.codigo?.toUpperCase() === codigo.toUpperCase()
  )
}

function leerEquipamiento(codigo) {
  const todos = leerJSON(CLAVE_EQUIPAMIENTO, {})

  if (Array.isArray(todos[codigo])) {
    return todos[codigo]
  }

  // Datos iniciales para reproducir la captura de H-304.
  if (codigo.toUpperCase() === 'H-304') {
    return EQUIPAMIENTO_H304
  }

  return []
}

export default function EquipamientoPage() {
  const { codigo: codigoParametro } = useParams()
  const navigate = useNavigate()

  const codigo = (codigoParametro || 'H-304').toUpperCase()
  const espacio = obtenerEspacio(codigo)

  const [equipamiento, setEquipamiento] = useState(
    () => leerEquipamiento(codigo)
  )
  const [tipoNuevo, setTipoNuevo] = useState('Micrófonos')
  const [cantidadNueva, setCantidadNueva] = useState('2')
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('exito')

  useEffect(() => {
    setEquipamiento(leerEquipamiento(codigo))
    setMensaje('')
    setTipoNuevo('Micrófonos')
    setCantidadNueva('2')
  }, [codigo])

  function agregarItem(e) {
    e.preventDefault()

    const cantidad = Number(cantidadNueva)

    if (!tipoNuevo.trim() || !Number.isInteger(cantidad) || cantidad <= 0) {
      setTipoMensaje('error')
      setMensaje('Ingresa un equipo y una cantidad entera mayor que cero.')
      return
    }

    setEquipamiento((actual) => [
      ...actual,
      {
        id: Date.now(),
        nombre: tipoNuevo,
        cantidad
      }
    ])

    setMensaje('')
  }

  function eliminarItem(id) {
    setEquipamiento((actual) =>
      actual.filter((item) => item.id !== id)
    )
    setMensaje('')
  }

  function guardarEquipamiento() {
    try {
      const todos = leerJSON(CLAVE_EQUIPAMIENTO, {})

      localStorage.setItem(
        CLAVE_EQUIPAMIENTO,
        JSON.stringify({
          ...todos,
          [codigo]: equipamiento
        })
      )

      setTipoMensaje('exito')
      setMensaje('Equipamiento guardado correctamente.')
    } catch {
      setTipoMensaje('error')
      setMensaje('No se pudo guardar el equipamiento en el navegador.')
    }
  }

  function descartarCambios() {
    setEquipamiento(leerEquipamiento(codigo))
    setMensaje('')
  }

  if (!espacio) {
    return (
      <div className="equip-page">
        <div className="equip-alerta equip-alerta-error">
          No se encontró el espacio {codigo}.
        </div>

        <Link to="/enterprise" className="equip-link">
          ← Volver al catálogo
        </Link>
      </div>
    )
  }

  const ubicacion = [
    espacio.pabellon || espacio.sede,
    espacio.piso ? `piso ${espacio.piso}` : null
  ].filter(Boolean).join(', ')

  const estado = espacio.estado || 'Disponible'

  return (
    <main className="equip-page">
      {/* MIGAS DE PAN */}
      <div className="equip-breadcrumb">
        <Link to="/enterprise">Espacios</Link>
        <span>/</span>
        <span>{codigo}</span>
        <span>/</span>
        <strong>Equipamiento</strong>
      </div>

      {/* PESTAÑAS */}
      <nav className="equip-tabs" aria-label="Configuración del espacio">
        <Link
          to={`/enterprise/espacios/equipamiento/${codigo}`}
          className="equip-tab equip-tab-activa"
        >
          Equipamiento
        </Link>

        <Link
          to={`/enterprise/espacios/detalle/${codigo}`}
          className="equip-tab"
        >
          Datos generales
        </Link>

        <Link
          to={`/enterprise/espacios/horario/${codigo}`}
          className="equip-tab"
        >
          Horario de atención
        </Link>

        <Link
          to={`/enterprise/espacios/estado/${codigo}`}
          className="equip-tab"
        >
          Estado
        </Link>
      </nav>

      {mensaje && (
        <div
          className={`equip-alerta ${
            tipoMensaje === 'error'
              ? 'equip-alerta-error'
              : 'equip-alerta-exito'
          }`}
          role="status"
        >
          {mensaje}
        </div>
      )}

      <div className="equip-layout">
        {/* COLUMNA IZQUIERDA */}
        <section className="equip-card equip-card-principal">
          <div className="equip-titulo-fila">
            <h1>Equipamiento de {codigo}</h1>
            <span>{equipamiento.length} ítems registrados</span>
          </div>

          {equipamiento.length > 0 ? (
            <div className="equip-tabla-contenedor">
              <table className="equip-tabla">
                <thead>
                  <tr>
                    <th>ÍTEM</th>
                    <th>CANTIDAD</th>
                    <th aria-label="Acciones"></th>
                  </tr>
                </thead>

                <tbody>
                  {equipamiento.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td className="equip-celda-accion">
                        <button
                          type="button"
                          className="equip-eliminar"
                          onClick={() => eliminarItem(item.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="equip-vacio-tabla">
              Todavía no has agregado equipamiento a este espacio.
            </div>
          )}

          {/* AGREGAR ÍTEM */}
          <form className="equip-form-agregar" onSubmit={agregarItem}>
            <select
              aria-label="Tipo de equipamiento"
              value={tipoNuevo}
              onChange={(e) => setTipoNuevo(e.target.value)}
            >
              {TIPOS_EQUIPAMIENTO.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>

            <input
              type="number"
              aria-label="Cantidad"
              min="1"
              step="1"
              value={cantidadNueva}
              onChange={(e) => setCantidadNueva(e.target.value)}
            />

            <button type="submit" className="equip-btn equip-btn-principal">
              Agregar ítem
            </button>
          </form>

          <div className="equip-acciones">
            <button
              type="button"
              className="equip-btn equip-btn-texto"
              onClick={descartarCambios}
            >
              Descartar
            </button>

            <button
              type="button"
              className="equip-btn equip-btn-principal"
              onClick={guardarEquipamiento}
            >
              Guardar equipamiento
            </button>
          </div>
        </section>

        {/* COLUMNA DERECHA */}
        <aside className="equip-columna-lateral">
          <section className="equip-card equip-resumen">
            <span className="equip-etiqueta">ESPACIO</span>

            <h2>{espacio.nombre}</h2>

            <p>
              {ubicacion || espacio.sede || 'Campus Monterrico'}
              {espacio.aforo ? ` · Aforo ${espacio.aforo}` : ''}
            </p>

            <span
              className={`equip-estado ${
                estado === 'Disponible'
                  ? 'equip-estado-disponible'
                  : estado === 'Mantenimiento'
                    ? 'equip-estado-mantenimiento'
                    : 'equip-estado-otro'
              }`}
            >
              {estado}
            </span>
          </section>

          <div className="equip-nota">
            El equipamiento registrado alimenta los filtros de búsqueda de
            los estudiantes y el formulario de incidencias.
          </div>

          <section className="equip-card equip-sin-equipo">
            <span className="equip-etiqueta">ESPACIO SIN EQUIPAMIENTO</span>

            {equipamiento.length === 0 ? (
              <div className="equip-vacio">
                <span className="equip-icono-vacio">⌗</span>
                <h3>Sin equipamiento registrado</h3>
                <p>
                  Así se ve el estado vacío para un espacio recién creado.
                </p>
              </div>
            ) : (
              <div className="equip-resumen-equipos">
                <strong>{equipamiento.length} tipos de equipamiento</strong>
                <p>
                  Total de unidades:{' '}
                  {equipamiento.reduce(
                    (total, item) => total + Number(item.cantidad || 0),
                    0
                  )}
                </p>
              </div>
            )}
          </section>
        </aside>
      </div>
    </main>
  )
}
