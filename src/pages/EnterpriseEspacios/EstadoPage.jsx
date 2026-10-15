
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './EstadoPage.css'

const CLAVE_ESPACIOS = 'espaciosReservaUL'
const CLAVE_ESTADOS = 'estadosReservaUL'

const ESTADOS = ['Mantenimiento', 'De baja', 'Disponible']

function leerJSON(clave, valorInicial) {
  try {
    return JSON.parse(localStorage.getItem(clave) || 'null') ?? valorInicial
  } catch {
    return valorInicial
  }
}

const ESPACIOS_INICIALES = [
  { codigo: 'E-201', nombre: 'Sala de Estudio Grupal E-201', estado: 'Disponible' },
  { codigo: 'E-202', nombre: 'Sala de Estudio Grupal E-202', estado: 'Disponible' },
  { codigo: 'H-304', nombre: 'Laboratorio de Cómputo H-304', estado: 'Disponible' },
  { codigo: 'H-305', nombre: 'Laboratorio de Cómputo H-305', estado: 'Mantenimiento' },
  { codigo: 'H-201', nombre: 'Laboratorio de Redes H-201', estado: 'Disponible' },
  { codigo: 'N-105', nombre: 'Cabina de Grabación N-105', estado: 'Disponible' },
  { codigo: 'Q-101', nombre: 'Auditorio Q-101', estado: 'Disponible' },
  { codigo: 'A-410', nombre: 'Sala de Reuniones A-410', estado: 'Disponible' },
  { codigo: 'A-411', nombre: 'Sala de Reuniones A-411', estado: 'De baja' },
  { codigo: 'B-102', nombre: 'Sala de Estudio Biblioteca B-102', estado: 'Disponible' },
]

function obtenerEspacio(codigo) {
  const guardados = leerJSON(CLAVE_ESPACIOS, [])
  const estados = leerJSON(CLAVE_ESTADOS, {})
  const espacios = [
    ...ESPACIOS_INICIALES,
    ...(Array.isArray(guardados) ? guardados : []),
  ]

  const espacio = [...espacios].reverse().find(
    (item) => item.codigo?.toUpperCase() === codigo
  )

  if (!espacio) return null

  return {
    ...espacio,
    estado: estados[codigo] || espacio.estado || 'Disponible',
  }
}

export default function EstadoPage() {
  const { codigo: parametro } = useParams()
  const codigo = (parametro || '').toUpperCase()

  const [espacio, setEspacio] = useState(() => obtenerEspacio(codigo))
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(
    () => obtenerEspacio(codigo)?.estado || 'Disponible'
  )
  const [motivo, setMotivo] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const actual = obtenerEspacio(codigo)
    setEspacio(actual)
    setEstadoSeleccionado(actual?.estado || 'Disponible')
    setMotivo('')
    setMensaje('')
    setError(false)
  }, [codigo])

  function cerrarModal() {
    // Regresa al catálogo sin guardar cambios.
    window.history.back()
  }

  function guardarEstado(e) {
    e.preventDefault()

    if (!motivo.trim()) {
      setError(true)
      setMensaje('El motivo es obligatorio para cambiar el estado.')
      return
    }

    if (!espacio) {
      setError(true)
      setMensaje('No se encontró el espacio seleccionado.')
      return
    }

    try {
      const estados = leerJSON(CLAVE_ESTADOS, {})
      const nuevosEstados = {
        ...estados,
        [codigo]: estadoSeleccionado,
      }

      localStorage.setItem(CLAVE_ESTADOS, JSON.stringify(nuevosEstados))

      const espaciosGuardados = leerJSON(CLAVE_ESPACIOS, [])
      const lista = Array.isArray(espaciosGuardados)
        ? espaciosGuardados
        : []

      const existe = lista.some(
        (item) => item.codigo?.toUpperCase() === codigo
      )

      const listaActualizada = existe
        ? lista.map((item) =>
            item.codigo?.toUpperCase() === codigo
              ? { ...item, estado: estadoSeleccionado }
              : item
          )
        : [...lista, { ...espacio, estado: estadoSeleccionado }]

      localStorage.setItem(
        CLAVE_ESPACIOS,
        JSON.stringify(listaActualizada)
      )

      setEspacio({ ...espacio, estado: estadoSeleccionado })
      setError(false)
      setMensaje('Estado guardado correctamente.')
    } catch {
      setError(true)
      setMensaje('No se pudo guardar el estado. Inténtalo nuevamente.')
    }
  }

  if (!espacio) {
    return (
      <main className="estado-fondo">
        <section className="estado-modal estado-no-encontrado">
          <h1>No se encontró el espacio {codigo}</h1>
          <Link to="/enterprise" className="estado-volver">
            Volver al catálogo
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="estado-fondo">
      <form className="estado-modal" onSubmit={guardarEstado}>
        <button
          type="button"
          className="estado-cerrar"
          onClick={cerrarModal}
          aria-label="Cerrar"
          title="Cerrar"
        >
          ×
        </button>

        <h1>Cambiar estado de {codigo}</h1>

        <label className="estado-label">NUEVO ESTADO</label>

        <div className="estado-opciones">
          {ESTADOS.map((estado) => (
            <button
              key={estado}
              type="button"
              className={`estado-opcion ${
                estadoSeleccionado === estado ? 'seleccionada' : ''
              }`}
              onClick={() => {
                setEstadoSeleccionado(estado)
                setMensaje('')
              }}
              aria-pressed={estadoSeleccionado === estado}
            >
              {estado}
            </button>
          ))}
        </div>

        <label className="estado-label" htmlFor="motivoEstado">
          MOTIVO (OBLIGATORIO)
        </label>

        <textarea
          id="motivoEstado"
          className="estado-motivo"
          value={motivo}
          onChange={(e) => {
            setMotivo(e.target.value)
            setMensaje('')
          }}
          placeholder="Explica el motivo del cambio de estado..."
          rows={3}
          required
        />

        <p className="estado-ayuda">
          El motivo se mostrará a los usuarios afectados.
        </p>

        {estadoSeleccionado !== 'Disponible' && (
          <div className="estado-advertencia">
            <strong>Atención:</strong> cambiar el estado puede afectar las
            reservas existentes. Antes de confirmar, verifica las reservas
            vigentes de este espacio. La cancelación automática y el envío de
            correos aún no están conectados.
          </div>
        )}

        {mensaje && (
          <div
            className={`estado-mensaje ${error ? 'error' : 'exito'}`}
            role="status"
          >
            {mensaje}
          </div>
        )}

        <div className="estado-acciones">
          <button
            type="button"
            className="estado-cancelar"
            onClick={cerrarModal}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className={`estado-confirmar ${
              estadoSeleccionado === 'Disponible' ? 'es-disponible' : ''
            }`}
          >
            {estadoSeleccionado === 'Disponible'
              ? 'Cambiar estado'
              : 'Cambiar estado y cancelar reservas'}
          </button>
        </div>
      </form>
    </main>
  )
}
