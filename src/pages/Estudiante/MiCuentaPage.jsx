// src/pages/Estudiante/MiCuentaPage.jsx
import { useState } from 'react'
import './MiCuentaPage.css'

const CARRERAS = [
  'Ingeniería de Sistemas',
  'Ingeniería Industrial',
  'Ingeniería Civil',
  'Administración',
  'Comunicación',
  'Derecho',
  'Psicología'
]

const CICLOS = [
  'Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto',
  'Sexto', 'Séptimo', 'Octavo', 'Noveno', 'Décimo'
]

const DATOS_INICIALES = {
  nombres: 'Camila Andrea',
  apellidos: 'Rojas Quispe',
  carrera: 'Ingeniería de Sistemas',
  ciclo: 'Séptimo'
}

const PASSWORD_INICIAL = {
  actual: '',
  nueva: '',
  confirmar: ''
}

// Lee los datos guardados en el navegador; si no hay, usa los iniciales.
function leerDatosGuardados(clave) {
  try {
    const guardado = JSON.parse(localStorage.getItem(clave) || 'null')
    return guardado ? { ...DATOS_INICIALES, ...guardado } : DATOS_INICIALES
  } catch {
    return DATOS_INICIALES
  }
}

export default function MiCuentaPage({
  correo = 'camila.rojas@ulima.edu.pe',
  codigo = '20221534',
  semana = '14/09 – 19/09',
  horasUsadas = 5,
  horasMaximas = 8,
  inasistencias = 1
}) {
  // La clave incluye el correo para que dos usuarios no se pisen los datos.
  const CLAVE_STORAGE = `cuentaEstudiante:${correo}`

  const [datos, setDatos] = useState(() => leerDatosGuardados(CLAVE_STORAGE))
  const [datosGuardados, setDatosGuardados] = useState(() =>
    leerDatosGuardados(CLAVE_STORAGE)
  )
  const [erroresDatos, setErroresDatos] = useState({})
  const [mensajeDatos, setMensajeDatos] = useState(null)

  const [password, setPassword] = useState(PASSWORD_INICIAL)
  const [erroresPassword, setErroresPassword] = useState({})
  const [mensajePassword, setMensajePassword] = useState(null)

  const porcentajeUso = Math.min(
    100,
    Math.round((horasUsadas / horasMaximas) * 100)
  )

  /* ---------- Datos personales ---------- */

  function actualizarDato(e) {
    const { name, value } = e.target

    setDatos((actual) => ({ ...actual, [name]: value }))
    setErroresDatos((actuales) => ({ ...actuales, [name]: '' }))
    setMensajeDatos(null)
  }

  function descartarCambios() {
    setDatos(datosGuardados)
    setErroresDatos({})
    setMensajeDatos(null)
  }

  function guardarDatos(e) {
    e.preventDefault()

    const errores = {}

    if (!datos.nombres.trim()) {
      errores.nombres = 'Ingresa tus nombres.'
    }

    if (!datos.apellidos.trim()) {
      errores.apellidos = 'Ingresa tus apellidos.'
    }

    setErroresDatos(errores)

    if (Object.keys(errores).length > 0) {
      setMensajeDatos({
        tipo: 'error',
        texto: 'Revisa los campos señalados antes de guardar.'
      })
      return
    }

    const limpios = {
      ...datos,
      nombres: datos.nombres.trim(),
      apellidos: datos.apellidos.trim()
    }

    // Guardar en el navegador (luego se reemplaza por una llamada a la API).
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(limpios))
    } catch {
      setMensajeDatos({
        tipo: 'error',
        texto: 'No se pudo guardar. Revisa el almacenamiento del navegador.'
      })
      return
    }

    setDatos(limpios)
    setDatosGuardados(limpios)
    setMensajeDatos({ tipo: 'exito', texto: 'Cambios guardados correctamente.' })
  }

  /* ---------- Contraseña ---------- */
  // La contraseña NO se guarda en localStorage: debe ir siempre al servidor.

  function actualizarPassword(e) {
    const { name, value } = e.target

    setPassword((actual) => ({ ...actual, [name]: value }))
    setErroresPassword((actuales) => ({ ...actuales, [name]: '' }))
    setMensajePassword(null)
  }

  function actualizarContrasena(e) {
    e.preventDefault()

    const errores = {}

    if (!password.actual) {
      errores.actual = 'Ingresa tu contraseña actual.'
    }

    if (
      password.nueva.length < 8 ||
      !/[A-Z]/.test(password.nueva) ||
      !/[0-9]/.test(password.nueva)
    ) {
      errores.nueva = 'Usa mínimo 8 caracteres, una mayúscula y un número.'
    } else if (password.nueva === password.actual) {
      errores.nueva = 'La nueva contraseña debe ser distinta de la actual.'
    }

    if (password.confirmar !== password.nueva) {
      errores.confirmar = 'Las contraseñas no coinciden.'
    }

    setErroresPassword(errores)

    if (Object.keys(errores).length > 0) {
      setMensajePassword({
        tipo: 'error',
        texto: 'Revisa los campos señalados antes de actualizar.'
      })
      return
    }

    // TODO: enviar la contraseña al backend cuando exista el endpoint.
    setPassword(PASSWORD_INICIAL)
    setMensajePassword({
      tipo: 'exito',
      texto: 'Contraseña actualizada correctamente.'
    })
  }

  return (
    <div className="cuenta-page">
      <h1 className="cuenta-titulo">Mi cuenta</h1>

      <div className="cuenta-contenido">
        {/* COLUMNA IZQUIERDA: DATOS PERSONALES */}
        <section className="cuenta-card">
          <h2>Datos personales</h2>

          {mensajeDatos && (
            <div
              className={`cuenta-mensaje cuenta-mensaje-${mensajeDatos.tipo}`}
              role="status"
            >
              {mensajeDatos.texto}
            </div>
          )}

          <form onSubmit={guardarDatos} noValidate>
            <div className="cuenta-grid-2">
              <div className="cuenta-campo">
                <label htmlFor="nombres">Nombres</label>
                <input
                  id="nombres"
                  name="nombres"
                  value={datos.nombres}
                  onChange={actualizarDato}
                  autoComplete="given-name"
                  className={erroresDatos.nombres ? 'campo-error' : ''}
                />
                {erroresDatos.nombres && (
                  <small className="cuenta-error">{erroresDatos.nombres}</small>
                )}
              </div>

              <div className="cuenta-campo">
                <label htmlFor="apellidos">Apellidos</label>
                <input
                  id="apellidos"
                  name="apellidos"
                  value={datos.apellidos}
                  onChange={actualizarDato}
                  autoComplete="family-name"
                  className={erroresDatos.apellidos ? 'campo-error' : ''}
                />
                {erroresDatos.apellidos && (
                  <small className="cuenta-error">
                    {erroresDatos.apellidos}
                  </small>
                )}
              </div>

              <div className="cuenta-campo">
                <label htmlFor="correo">Correo institucional</label>
                <input id="correo" value={correo} readOnly />
                <small className="cuenta-ayuda">No editable.</small>
              </div>

              <div className="cuenta-campo">
                <label htmlFor="codigo">Código</label>
                <input id="codigo" value={codigo} readOnly />
              </div>

              <div className="cuenta-campo">
                <label htmlFor="carrera">Carrera</label>
                <select
                  id="carrera"
                  name="carrera"
                  value={datos.carrera}
                  onChange={actualizarDato}
                >
                  {CARRERAS.map((carrera) => (
                    <option key={carrera} value={carrera}>
                      {carrera}
                    </option>
                  ))}
                </select>
              </div>

              <div className="cuenta-campo">
                <label htmlFor="ciclo">Ciclo</label>
                <select
                  id="ciclo"
                  name="ciclo"
                  value={datos.ciclo}
                  onChange={actualizarDato}
                >
                  {CICLOS.map((ciclo) => (
                    <option key={ciclo} value={ciclo}>
                      {ciclo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="cuenta-acciones">
              <button
                type="button"
                className="cuenta-btn-texto"
                onClick={descartarCambios}
              >
                Descartar
              </button>

              <button type="submit" className="cuenta-btn-principal">
                Guardar cambios
              </button>
            </div>
          </form>
        </section>

        {/* COLUMNA DERECHA */}
        <div className="cuenta-columna-lateral">
          {/* CAMBIAR CONTRASEÑA */}
          <section className="cuenta-card">
            <h2>Cambiar contraseña</h2>

            {mensajePassword && (
              <div
                className={`cuenta-mensaje cuenta-mensaje-${mensajePassword.tipo}`}
                role="status"
              >
                {mensajePassword.texto}
              </div>
            )}

            <form onSubmit={actualizarContrasena} noValidate>
              <div className="cuenta-campo">
                <label htmlFor="actual">Contraseña actual</label>
                <input
                  id="actual"
                  name="actual"
                  type="password"
                  value={password.actual}
                  onChange={actualizarPassword}
                  autoComplete="current-password"
                  className={erroresPassword.actual ? 'campo-error' : ''}
                />
                {erroresPassword.actual && (
                  <small className="cuenta-error">
                    {erroresPassword.actual}
                  </small>
                )}
              </div>

              <div className="cuenta-campo">
                <label htmlFor="nueva">Nueva contraseña</label>
                <input
                  id="nueva"
                  name="nueva"
                  type="password"
                  value={password.nueva}
                  onChange={actualizarPassword}
                  autoComplete="new-password"
                  className={erroresPassword.nueva ? 'campo-error' : ''}
                />
                {erroresPassword.nueva ? (
                  <small className="cuenta-error">
                    {erroresPassword.nueva}
                  </small>
                ) : (
                  <small className="cuenta-ayuda">
                    Mínimo 8 caracteres, una mayúscula y un número.
                  </small>
                )}
              </div>

              <div className="cuenta-campo">
                <label htmlFor="confirmar">Confirmar nueva contraseña</label>
                <input
                  id="confirmar"
                  name="confirmar"
                  type="password"
                  value={password.confirmar}
                  onChange={actualizarPassword}
                  autoComplete="new-password"
                  className={erroresPassword.confirmar ? 'campo-error' : ''}
                />
                {erroresPassword.confirmar && (
                  <small className="cuenta-error">
                    {erroresPassword.confirmar}
                  </small>
                )}
              </div>

              <button type="submit" className="cuenta-btn-principal cuenta-btn-ancho">
                Actualizar contraseña
              </button>
            </form>
          </section>

          {/* USO DE LA SEMANA */}
          <section className="cuenta-card cuenta-uso">
            <p className="cuenta-uso-etiqueta">Uso de la semana ({semana})</p>

            <p className="cuenta-uso-valor">
              {horasUsadas} de {horasMaximas} horas reservadas
            </p>

            <div
              className="cuenta-barra"
              role="progressbar"
              aria-valuenow={horasUsadas}
              aria-valuemin={0}
              aria-valuemax={horasMaximas}
              aria-label="Horas reservadas esta semana"
            >
              <div
                className="cuenta-barra-relleno"
                style={{ width: `${porcentajeUso}%` }}
              />
            </div>

            <p className="cuenta-uso-nota">
              {inasistencias === 0
                ? 'Sin inasistencias acumuladas.'
                : `${inasistencias} inasistencia${inasistencias === 1 ? '' : 's'} acumulada${inasistencias === 1 ? '' : 's'}.`}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
