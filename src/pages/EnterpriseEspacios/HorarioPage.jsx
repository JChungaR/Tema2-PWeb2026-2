
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './HorarioPage.css'

const CLAVE_HORARIOS = 'horariosReservaUL'

const DIAS = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
]

const DURACIONES = [30, 60, 90, 120]

function crearHorariosIniciales() {
  return DIAS.map((dia, indice) => ({
    id: indice + 1,
    dia,
    activo: indice !== 6,
    apertura: indice === 5 ? '08:00' : '07:00',
    cierre:
      indice === 4 ? '20:00' :
      indice === 5 ? '14:00' :
      indice === 6 ? '' : '22:00',
    duracion: 60,
  }))
}

function leerHorarios() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_HORARIOS) || '{}')
  } catch {
    return {}
  }
}

function normalizarHorarios(guardados) {
  const iniciales = crearHorariosIniciales()

  if (!Array.isArray(guardados)) return iniciales

  return iniciales.map((inicial) => {
    const guardado = guardados.find((item) => item.dia === inicial.dia)

    if (!guardado) return inicial

    return {
      ...inicial,
      ...guardado,
      duracion: Number(guardado.duracion) || 60,
    }
  })
}

function minutos(hora) {
  if (!hora || !hora.includes(':')) return 0

  const [horas, mins] = hora.split(':').map(Number)
  return horas * 60 + mins
}

function formatoHora(totalMinutos) {
  const horas = Math.floor(totalMinutos / 60)
  const mins = totalMinutos % 60

  return `${String(horas).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

function generarBloques(horario) {
  if (
    !horario ||
    !horario.activo ||
    !horario.apertura ||
    !horario.cierre ||
    !horario.duracion
  ) {
    return []
  }

  const inicio = minutos(horario.apertura)
  const fin = minutos(horario.cierre)
  const duracion = Number(horario.duracion)

  if (fin <= inicio || duracion <= 0) return []

  const bloques = []

  for (
    let actual = inicio;
    actual + duracion <= fin;
    actual += duracion
  ) {
    bloques.push({
      inicio: formatoHora(actual),
      fin: formatoHora(actual + duracion),
    })
  }

  return bloques
}

export default function HorarioPage() {
  const { codigo: parametro } = useParams()
  const codigo = (parametro || 'H-304').toUpperCase()

  const [horarios, setHorarios] = useState(() => {
    const guardados = leerHorarios()
    return normalizarHorarios(guardados[codigo])
  })

  const [diaVista, setDiaVista] = useState('Lunes')
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('exito')

  useEffect(() => {
    const guardados = leerHorarios()
    setHorarios(normalizarHorarios(guardados[codigo]))
    setDiaVista('Lunes')
    setMensaje('')
  }, [codigo])

  const horarioSeleccionado = horarios.find(
    (horario) => horario.dia === diaVista
  )

  const bloques = useMemo(
    () => generarBloques(horarioSeleccionado),
    [horarioSeleccionado]
  )

  function actualizarHorario(id, campo, valor) {
    setHorarios((actuales) =>
      actuales.map((horario) =>
        horario.id === id
          ? { ...horario, [campo]: valor }
          : horario
      )
    )
    setMensaje('')
  }

  function guardarHorario() {
    const invalido = horarios.some((horario) => {
      if (!horario.activo) return false

      return (
        !horario.apertura ||
        !horario.cierre ||
        minutos(horario.cierre) <= minutos(horario.apertura) ||
        !horario.duracion
      )
    })

    if (invalido) {
      setTipoMensaje('error')
      setMensaje(
        'Revisa los horarios activos: el cierre debe ser posterior a la apertura.'
      )
      return
    }

    try {
      const guardados = leerHorarios()

      localStorage.setItem(
        CLAVE_HORARIOS,
        JSON.stringify({
          ...guardados,
          [codigo]: horarios,
        })
      )

      setTipoMensaje('exito')
      setMensaje('Horario guardado correctamente.')
    } catch {
      setTipoMensaje('error')
      setMensaje('No se pudo guardar el horario.')
    }
  }

  function cancelarCambios() {
    const guardados = leerHorarios()
    setHorarios(normalizarHorarios(guardados[codigo]))
    setMensaje('')
  }

  return (
    <main className="horario-page">
      <div className="horario-contenedor">
        <section className="horario-panel">
          <h1 className="horario-titulo">
            Horario de atención · {codigo}
          </h1>

          {mensaje && (
            <div
              className={`horario-mensaje ${
                tipoMensaje === 'error' ? 'error' : 'exito'
              }`}
              role="status"
            >
              {mensaje}
            </div>
          )}

          <div className="horario-tabla-scroll">
            <table className="horario-tabla">
              <thead>
                <tr>
                  <th>DÍA</th>
                  <th>APERTURA</th>
                  <th>CIERRE</th>
                  <th>DURACIÓN DEL BLOQUE</th>
                </tr>
              </thead>

              <tbody>
                {horarios.map((horario) => (
                  <tr
                    key={horario.id}
                    className={!horario.activo ? 'dia-cerrado' : ''}
                  >
                    <td>
                      <label className="horario-dia">
                        <input
                          type="checkbox"
                          checked={horario.activo}
                          onChange={(e) =>
                            actualizarHorario(
                              horario.id,
                              'activo',
                              e.target.checked
                            )
                          }
                        />
                        <span>{horario.dia}</span>
                      </label>
                    </td>

                    <td>
                      <input
                        className="horario-campo"
                        type="time"
                        aria-label={`Apertura ${horario.dia}`}
                        value={horario.activo ? horario.apertura : ''}
                        disabled={!horario.activo}
                        onChange={(e) =>
                          actualizarHorario(
                            horario.id,
                            'apertura',
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <input
                        className="horario-campo"
                        type="time"
                        aria-label={`Cierre ${horario.dia}`}
                        value={horario.activo ? horario.cierre : ''}
                        disabled={!horario.activo}
                        onChange={(e) =>
                          actualizarHorario(
                            horario.id,
                            'cierre',
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      {horario.activo ? (
                        <select
                          className="horario-campo horario-select"
                          aria-label={`Duración del bloque ${horario.dia}`}
                          value={horario.duracion}
                          onChange={(e) =>
                            actualizarHorario(
                              horario.id,
                              'duracion',
                              Number(e.target.value)
                            )
                          }
                        >
                          {DURACIONES.map((duracion) => (
                            <option key={duracion} value={duracion}>
                              {duracion} minutos
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="horario-campo horario-cerrado">
                          Cerrado
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="horario-acciones">
            <button
              type="button"
              className="horario-cancelar"
              onClick={cancelarCambios}
            >
              Cancelar
            </button>

            <button
              type="button"
              className="horario-guardar"
              onClick={guardarHorario}
            >
              Guardar horario
            </button>
          </div>
        </section>

        <aside className="horario-preview">
          <span className="preview-etiqueta">
            VISTA PREVIA · {diaVista.toUpperCase()}
          </span>

          <label className="preview-selector-label" htmlFor="diaVista">
            Día para previsualizar
          </label>

          <select
            id="diaVista"
            className="preview-selector"
            value={diaVista}
            onChange={(e) => setDiaVista(e.target.value)}
          >
            {DIAS.map((dia) => (
              <option key={dia} value={dia}>
                {dia}
              </option>
            ))}
          </select>

          <p className="preview-descripcion">
            {bloques.length > 0
              ? `${bloques.length} bloques generados de ${horarioSeleccionado.apertura} a ${horarioSeleccionado.cierre}`
              : 'No hay bloques horarios para este día.'}
          </p>

          {bloques.length > 0 ? (
            <div className="preview-bloques">
              {bloques.map((bloque) => (
                <div
                  className="preview-bloque"
                  key={`${bloque.inicio}-${bloque.fin}`}
                >
                  {bloque.inicio}–{bloque.fin}
                </div>
              ))}
            </div>
          ) : (
            <div className="preview-vacio">
              Este día está cerrado o no tiene un horario válido.
            </div>
          )}

          <div className="preview-nota">
            Al guardar, los bloques quedan registrados para la configuración
            semanal de este espacio.
          </div>

          <Link className="preview-volver" to="/enterprise">
            ← Volver a espacios
          </Link>
        </aside>
      </div>
    </main>
  )
}
