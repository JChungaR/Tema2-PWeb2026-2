
import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './DetalleEspacioPage.css'

const CLAVE_ESPACIOS = 'espaciosReservaUL'
const CLAVE_EQUIPAMIENTO = 'equipamientoReservaUL'
const CLAVE_HORARIOS = 'horariosReservaUL'
const CLAVE_ESTADOS = 'estadosReservaUL'

const ESPACIOS_INICIALES = [
  {
    codigo: 'E-201',
    nombre: 'Sala de Estudio Grupal E-201',
    tipo: 'Sala de estudio grupal',
    sede: 'Campus Monterrico',
    pabellon: 'Pabellón E',
    piso: 2,
    aforo: 8,
    estado: 'Disponible',
  },
  {
    codigo: 'E-202',
    nombre: 'Sala de Estudio Grupal E-202',
    tipo: 'Sala de estudio grupal',
    sede: 'Campus Monterrico',
    pabellon: 'Pabellón E',
    piso: 2,
    aforo: 6,
    estado: 'Disponible',
  },
  {
    codigo: 'H-304',
    nombre: 'Laboratorio de Cómputo H-304',
    tipo: 'Laboratorio de cómputo',
    sede: 'Campus Monterrico',
    pabellon: 'Edificio de Ingeniería',
    piso: 3,
    aforo: 30,
    estado: 'Disponible',
  },
  {
    codigo: 'H-305',
    nombre: 'Laboratorio de Cómputo H-305',
    tipo: 'Laboratorio de cómputo',
    sede: 'Campus Monterrico',
    pabellon: 'Edificio de Ingeniería',
    piso: 3,
    aforo: 24,
    estado: 'Mantenimiento',
  },
  {
    codigo: 'H-201',
    nombre: 'Laboratorio de Redes H-201',
    tipo: 'Laboratorio de redes',
    sede: 'Campus Monterrico',
    pabellon: 'Edificio de Ingeniería',
    piso: 2,
    aforo: 20,
    estado: 'Disponible',
  },
  {
    codigo: 'N-105',
    nombre: 'Cabina de Grabación N-105',
    tipo: 'Cabina de grabación',
    sede: 'Campus Monterrico',
    pabellon: 'Pabellón N',
    piso: 1,
    aforo: 3,
    estado: 'Disponible',
  },
  {
    codigo: 'Q-101',
    nombre: 'Auditorio Q-101',
    tipo: 'Auditorio',
    sede: 'Campus Monterrico',
    pabellon: 'Pabellón Q',
    piso: 1,
    aforo: 120,
    estado: 'Disponible',
  },
  {
    codigo: 'A-410',
    nombre: 'Sala de Reuniones A-410',
    tipo: 'Sala de reuniones',
    sede: 'Campus Monterrico',
    pabellon: 'Pabellón A',
    piso: 4,
    aforo: 12,
    estado: 'Disponible',
  },
  {
    codigo: 'A-411',
    nombre: 'Sala de Reuniones A-411',
    tipo: 'Sala de reuniones',
    sede: 'Campus Monterrico',
    pabellon: 'Pabellón A',
    piso: 4,
    aforo: 10,
    estado: 'De baja',
  },
  {
    codigo: 'B-102',
    nombre: 'Sala de Estudio Biblioteca B-102',
    tipo: 'Sala de estudio',
    sede: 'Campus Monterrico',
    pabellon: 'Biblioteca',
    piso: 1,
    aforo: 6,
    estado: 'Disponible',
  },
]

const EQUIPAMIENTO_POR_DEFECTO = {
  'H-304': [
    { id: 1, nombre: 'Computadoras', cantidad: 30 },
    { id: 2, nombre: 'Proyector', cantidad: 1 },
    { id: 3, nombre: 'Pizarra acrílica', cantidad: 2 },
    { id: 4, nombre: 'Tomacorrientes', cantidad: 16 },
    { id: 5, nombre: 'Televisor', cantidad: 1 },
    { id: 6, nombre: 'Mesa de trabajo', cantidad: 1 },
  ],
}

const HORARIO_POR_DEFECTO = [
  { dia: 'Lunes', activo: true, apertura: '07:00', cierre: '22:00', duracion: 60 },
  { dia: 'Martes', activo: true, apertura: '07:00', cierre: '22:00', duracion: 60 },
  { dia: 'Miércoles', activo: true, apertura: '07:00', cierre: '22:00', duracion: 60 },
  { dia: 'Jueves', activo: true, apertura: '07:00', cierre: '22:00', duracion: 60 },
  { dia: 'Viernes', activo: true, apertura: '07:00', cierre: '20:00', duracion: 60 },
  { dia: 'Sábado', activo: true, apertura: '08:00', cierre: '14:00', duracion: 60 },
  { dia: 'Domingo', activo: false, apertura: '', cierre: '', duracion: 60 },
]

const REGLAS_USO = [
  'Presenta tu carné al ingresar.',
  'Tolerancia de 15 minutos.',
  'No se permiten alimentos ni bebidas.',
  'Reporta cualquier equipo con fallas.',
]

function leerJSON(clave, valorInicial) {
  try {
    return JSON.parse(localStorage.getItem(clave) || 'null') ?? valorInicial
  } catch {
    return valorInicial
  }
}

function cargarEspacio(codigo) {
  const guardados = leerJSON(CLAVE_ESPACIOS, [])
  const estados = leerJSON(CLAVE_ESTADOS, {})
  const lista = [
    ...ESPACIOS_INICIALES,
    ...(Array.isArray(guardados) ? guardados : []),
  ]

  const espacio = [...lista].reverse().find(
    (item) => item.codigo?.toUpperCase() === codigo
  )

  if (!espacio) return null

  return {
    ...espacio,
    estado: estados[codigo] || espacio.estado || 'Disponible',
  }
}

function obtenerUbicacion(espacio) {
  return [
    espacio.pabellon || espacio.sede,
    espacio.piso ? `piso ${espacio.piso}` : null,
  ].filter(Boolean).join(', ')
}

function obtenerBloques(horario) {
  if (
    !horario?.activo ||
    !horario.apertura ||
    !horario.cierre ||
    Number(horario.duracion) <= 0
  ) {
    return 0
  }

  const convertir = (hora) => {
    const [h, m] = hora.split(':').map(Number)
    return h * 60 + m
  }

  const diferencia = convertir(horario.cierre) - convertir(horario.apertura)

  return diferencia > 0
    ? Math.floor(diferencia / Number(horario.duracion))
    : 0
}

function estadoClase(estado) {
  if (estado === 'Disponible') return 'detalle-estado-disponible'
  if (estado === 'Mantenimiento') return 'detalle-estado-mantenimiento'
  return 'detalle-estado-baja'
}

function iconoEquipo(nombre) {
  const texto = nombre.toLowerCase()

  if (texto.includes('comput')) return '▣'
  if (texto.includes('proyector')) return '▤'
  if (texto.includes('pizarra')) return '▥'
  if (texto.includes('tomacorriente')) return '◈'
  if (texto.includes('televisor')) return '◫'
  if (texto.includes('mesa')) return '▦'
  if (texto.includes('silla')) return '▤'
  if (texto.includes('micrófono') || texto.includes('microfono')) return '♩'

  return '▦'
}

export default function DetalleEspacioPage() {
  const { codigo: parametro } = useParams()
  const navigate = useNavigate()
  const codigo = (parametro || '').toUpperCase()

  const espacio = useMemo(() => cargarEspacio(codigo), [codigo])

  const todosLosEquipos = leerJSON(CLAVE_EQUIPAMIENTO, {})
  const equipamiento = Array.isArray(todosLosEquipos[codigo])
    ? todosLosEquipos[codigo]
    : EQUIPAMIENTO_POR_DEFECTO[codigo] || []

  const todosLosHorarios = leerJSON(CLAVE_HORARIOS, {})
  const horarioGuardado = todosLosHorarios[codigo]

  const horarios = Array.isArray(horarioGuardado)
    ? HORARIO_POR_DEFECTO.map((inicial) => {
        const guardado = horarioGuardado.find(
          (item) => item.dia === inicial.dia
        )
        return guardado ? { ...inicial, ...guardado } : inicial
      })
    : HORARIO_POR_DEFECTO

  const horarioPorDia = (dia) => horarios.find((item) => item.dia === dia)

  const libresHoy = useMemo(() => {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const diaActual = dias[new Date().getDay()]
    return obtenerBloques(horarioPorDia(diaActual))
  }, [horarios])

  if (!espacio) {
    return (
      <main className="detalle-pagina">
        <div className="detalle-no-encontrado">
          <h1>No se encontró el espacio {codigo}</h1>
          <Link to="/enterprise">Volver al catálogo</Link>
        </div>
      </main>
    )
  }

  const ubicacion = obtenerUbicacion(espacio)
  const tipo = espacio.tipo || 'Espacio académico'
  const aforo = Number(espacio.aforo) || 0

  function verDisponibilidad() {
    navigate(`/enterprise/espacios/horario/${codigo}`)
  }

  function reportarIncidencia() {
    navigate(`/enterprise/espacios/incidencia/${codigo}`)
  }

  return (
    <main className="detalle-pagina">
      <div className="detalle-contenedor">
        <div className="detalle-migas">
          <Link to="/enterprise">Catálogo</Link>
          <span>/</span>
          <span>{tipo.endsWith('s') ? tipo : `${tipo}s`}</span>
          <span>/</span>
          <strong>{codigo}</strong>
        </div>

        <div className="detalle-layout">
          <div className="detalle-columna-principal">
            <section className="detalle-galeria" aria-label="Fotografías del espacio">
              <div className="detalle-foto detalle-foto-principal">
                fotografía principal · {codigo}
              </div>
              <div className="detalle-fotos-secundarias">
                <div className="detalle-foto">foto 2</div>
                <div className="detalle-foto">foto 3</div>
              </div>
            </section>

            <section className="detalle-tarjeta detalle-equipamiento">
              <h2>Equipamiento</h2>

              {equipamiento.length > 0 ? (
                <div className="detalle-lista-equipos">
                  {equipamiento.map((item) => (
                    <div className="detalle-equipo" key={item.id ?? item.nombre}>
                      <span className="detalle-equipo-icono">
                        {iconoEquipo(item.nombre)}
                      </span>
                      <span>
                        <strong>{item.cantidad}</strong>{' '}
                        {item.nombre.toLowerCase()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="detalle-vacio">
                  No hay equipamiento registrado para este espacio.
                </p>
              )}
            </section>

            <section className="detalle-tarjeta detalle-info-inferior">
              <div className="detalle-horario">
                <h2>Horario de atención</h2>
                <p>
                  Lunes a jueves ·{' '}
                  {horarioPorDia('Lunes')?.activo
                    ? `${horarioPorDia('Lunes').apertura} – ${horarioPorDia('Lunes').cierre}`
                    : 'cerrado'}
                </p>
                <p>
                  Viernes ·{' '}
                  {horarioPorDia('Viernes')?.activo
                    ? `${horarioPorDia('Viernes').apertura} – ${horarioPorDia('Viernes').cierre}`
                    : 'cerrado'}
                </p>
                <p>
                  Sábado ·{' '}
                  {horarioPorDia('Sábado')?.activo
                    ? `${horarioPorDia('Sábado').apertura} – ${horarioPorDia('Sábado').cierre}`
                    : 'cerrado'}
                </p>
                <p className={!horarioPorDia('Domingo')?.activo ? 'detalle-cerrado' : ''}>
                  Domingo ·{' '}
                  {horarioPorDia('Domingo')?.activo
                    ? `${horarioPorDia('Domingo').apertura} – ${horarioPorDia('Domingo').cierre}`
                    : 'cerrado'}
                </p>
              </div>

              <div className="detalle-reglas">
                <h2>Reglas de uso</h2>
                {REGLAS_USO.map((regla) => (
                  <p key={regla}>· {regla}</p>
                ))}
              </div>
            </section>
          </div>

          <aside className="detalle-columna-lateral">
            <section className="detalle-tarjeta detalle-resumen">
              <span className={`detalle-estado ${estadoClase(espacio.estado)}`}>
                {espacio.estado}
              </span>

              <h1>{espacio.nombre}</h1>

              <p className="detalle-subtitulo">
                Código {codigo}
                {ubicacion ? ` · ${ubicacion}` : ''}
              </p>

              <div className="detalle-datos">
                <div>
                  <span>Tipo</span>
                  <strong>{tipo}</strong>
                </div>
                <div>
                  <span>Aforo</span>
                  <strong>{aforo} personas</strong>
                </div>
                <div>
                  <span>Bloque</span>
                  <strong>
                    {horarioPorDia('Lunes')?.duracion || 60} minutos
                  </strong>
                </div>
                <div>
                  <span>Libres hoy</span>
                  <strong className="detalle-libres">
                    {espacio.estado === 'Disponible' ? `${libresHoy} bloques` : 'No disponible'}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                className="detalle-btn-principal"
                onClick={verDisponibilidad}
                disabled={espacio.estado !== 'Disponible'}
              >
                Ver disponibilidad
              </button>

              <button
                type="button"
                className="detalle-btn-secundario"
                onClick={reportarIncidencia}
              >
                Reportar incidencia
              </button>
            </section>

            <section className="detalle-tarjeta detalle-mapa">
              <h2>CÓMO LLEGAR</h2>
              <div className="detalle-mapa-placeholder">
                mapa del campus
              </div>
              <p>{ubicacion || 'Campus Monterrico'}</p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}
