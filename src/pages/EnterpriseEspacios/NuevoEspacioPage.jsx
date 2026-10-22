import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NuevoEspacioPage.css'

const CODIGOS_EXISTENTES = [
  'E-201', 'E-202', 'H-304', 'H-305', 'H-201',
  'N-105', 'Q-101', 'A-410', 'A-411', 'B-102'
]

const VALORES_INICIALES = {
  codigo: '',
  nombre: '',
  tipo: 'Sala de estudio grupal',
  sede: 'Campus Monterrico',
  pabellon: 'Pabellón E',
  piso: '2',
  aforo: '',
  descripcion: ''
}

const TIPOS_ESPACIO = [
  'Sala de estudio grupal',
  'Laboratorio de cómputo',
  'Cabina de grabación',
  'Auditorio',
  'Sala de reuniones'
]

const PABELLONES = [
  'Pabellón A',
  'Pabellón B',
  'Pabellón E',
  'Pabellón H',
  'Pabellón N',
  'Pabellón Q',
  'Biblioteca',
  'Ed. de Ingeniería'
]

export default function NuevoEspacioPage() {
  const navigate = useNavigate()
  const inputFotosRef = useRef(null)

  const [formulario, setFormulario] = useState(VALORES_INICIALES)
  const [fotografias, setFotografias] = useState([])
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('error')

  function actualizarCampo(e) {
    const { name, value } = e.target

    setFormulario((actual) => ({
      ...actual,
      [name]: value
    }))

    setErrores((actuales) => ({
      ...actuales,
      [name]: ''
    }))

    setMensaje('')
  }

  function obtenerEspaciosGuardados() {
    try {
      const datos = JSON.parse(
        localStorage.getItem('espaciosReservaUL') || '[]'
      )

      return Array.isArray(datos) ? datos : []
    } catch {
      return []
    }
  }

  function validarFormulario() {
    const nuevosErrores = {}
    const codigo = formulario.codigo.trim().toUpperCase()
    const nombre = formulario.nombre.trim()
    const espaciosGuardados = obtenerEspaciosGuardados()

    if (!codigo) {
      nuevosErrores.codigo = 'Ingresa el código del espacio.'
    } else if (
      CODIGOS_EXISTENTES.includes(codigo) ||
      espaciosGuardados.some(
        (espacio) => espacio.codigo?.toUpperCase() === codigo
      )
    ) {
      nuevosErrores.codigo = 'Ya existe un espacio con este código.'
    }

    if (!nombre) {
      nuevosErrores.nombre = 'Ingresa el nombre del espacio.'
    }

    if (
      formulario.aforo === '' ||
      !Number.isFinite(Number(formulario.aforo)) ||
      Number(formulario.aforo) <= 0
    ) {
      nuevosErrores.aforo = 'Ingresa un aforo mayor que cero.'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  function subirFotografias(e) {
    const archivos = Array.from(e.target.files || [])
    const nuevasFotos = []
    let advertencia = ''

    archivos.forEach((archivo) => {
      if (!['image/jpeg', 'image/png'].includes(archivo.type)) {
        advertencia = 'Solo se permiten imágenes JPG o PNG.'
        return
      }

      if (archivo.size > 2 * 1024 * 1024) {
        advertencia = 'Cada fotografía debe pesar como máximo 2 MB.'
        return
      }

      nuevasFotos.push({
        id: `${archivo.name}-${archivo.lastModified}-${Math.random()}`,
        nombre: archivo.name,
        url: URL.createObjectURL(archivo)
      })
    })

    setFotografias((actuales) => {
      const disponibles = Math.max(0, 5 - actuales.length)
      const aceptadas = nuevasFotos.slice(0, disponibles)

      nuevasFotos.slice(disponibles).forEach((foto) => {
        URL.revokeObjectURL(foto.url)
      })

      if (aceptadas.length < nuevasFotos.length) {
        advertencia = 'Puedes registrar un máximo de 5 fotografías.'
      }

      return [...actuales, ...aceptadas]
    })

    setMensaje(advertencia)
    setTipoMensaje('error')
    e.target.value = ''
  }

  function eliminarFotografia(id) {
    setFotografias((actuales) => {
      const foto = actuales.find((item) => item.id === id)

      if (foto) {
        URL.revokeObjectURL(foto.url)
      }

      return actuales.filter((item) => item.id !== id)
    })
  }

  function guardarEspacio(esBorrador = false) {
    const codigo = formulario.codigo.trim().toUpperCase()
    const espaciosGuardados = obtenerEspaciosGuardados()

    if (!esBorrador && !validarFormulario()) {
      setMensaje('Revisa los campos señalados antes de guardar.')
      setTipoMensaje('error')
      return
    }

    if (esBorrador && !codigo && !formulario.nombre.trim()) {
      setMensaje(
        'Completa al menos el código o el nombre para guardar el borrador.'
      )
      setTipoMensaje('error')
      return
    }

    if (
      codigo &&
      (
        CODIGOS_EXISTENTES.includes(codigo) ||
        espaciosGuardados.some(
          (espacio) => espacio.codigo?.toUpperCase() === codigo
        )
      )
    ) {
      setErrores((actuales) => ({
        ...actuales,
        codigo: 'Ya existe un espacio con este código.'
      }))

      setMensaje('No se puede guardar: el código ya está registrado.')
      setTipoMensaje('error')
      return
    }

    const nuevoEspacio = {
      ...formulario,
      codigo,
      nombre: formulario.nombre.trim(),
      aforo: Number(formulario.aforo) || 0,
      estado: esBorrador ? 'Borrador' : 'Disponible',
      fotografias: fotografias.map((foto) => ({
        nombre: foto.nombre
      })),
      fechaCreacion: new Date().toISOString()
    }

    try {
      localStorage.setItem(
        'espaciosReservaUL',
        JSON.stringify([...espaciosGuardados, nuevoEspacio])
      )

      setMensaje(
        esBorrador
          ? 'Borrador guardado en este navegador.'
          : 'Espacio guardado correctamente.'
      )

      setTipoMensaje('exito')

      if (!esBorrador) {
        setTimeout(() => navigate('/enterprise'), 700)
      }
    } catch {
      setMensaje(
        'No se pudo guardar. Comprueba el almacenamiento del navegador.'
      )
      setTipoMensaje('error')
    }
  }

  function cancelar() {
    fotografias.forEach((foto) => URL.revokeObjectURL(foto.url))
    navigate('/enterprise')
  }

  return (
    <div className="nuevo-espacio-page">
      <div className="nuevo-breadcrumb">
        <button type="button" onClick={cancelar}>
          Espacios
        </button>
        <span>/</span>
        <span>Nuevo espacio</span>
      </div>

      <h1 className="nuevo-titulo">Nuevo espacio</h1>

      {mensaje && (
        <div
          className={`nuevo-mensaje nuevo-mensaje-${tipoMensaje}`}
          role="status"
        >
          {mensaje}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          guardarEspacio(false)
        }}
        noValidate
      >
        <div className="nuevo-contenido">
          {/* COLUMNA IZQUIERDA */}
          <div className="nuevo-columna-principal">

            {/* IDENTIFICACIÓN Y UBICACIÓN */}
            <section className="nuevo-card">
              <h2>Identificación y ubicación</h2>

              <div className="nuevo-grid-identificacion">
                <div className="nuevo-campo">
                  <label htmlFor="codigo">Código</label>
                  <input
                    id="codigo"
                    name="codigo"
                    value={formulario.codigo}
                    onChange={actualizarCampo}
                    placeholder="Ej. H-306"
                    className={errores.codigo ? 'campo-error' : ''}
                  />
                  {errores.codigo && (
                    <small className="nuevo-error">
                      {errores.codigo}
                    </small>
                  )}
                </div>

                <div className="nuevo-campo">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    id="nombre"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={actualizarCampo}
                    placeholder="Nombre del espacio"
                    className={errores.nombre ? 'campo-error' : ''}
                  />
                  {errores.nombre && (
                    <small className="nuevo-error">
                      {errores.nombre}
                    </small>
                  )}
                </div>

                <div className="nuevo-campo">
                  <label htmlFor="tipo">Tipo</label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={formulario.tipo}
                    onChange={actualizarCampo}
                  >
                    {TIPOS_ESPACIO.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="nuevo-grid-ubicacion">
                <div className="nuevo-campo">
                  <label htmlFor="sede">Sede</label>
                  <select
                    id="sede"
                    name="sede"
                    value={formulario.sede}
                    onChange={actualizarCampo}
                  >
                    <option>Campus Monterrico</option>
                  </select>
                </div>

                <div className="nuevo-campo">
                  <label htmlFor="pabellon">Pabellón</label>
                  <select
                    id="pabellon"
                    name="pabellon"
                    value={formulario.pabellon}
                    onChange={actualizarCampo}
                  >
                    {PABELLONES.map((pabellon) => (
                      <option key={pabellon} value={pabellon}>
                        {pabellon}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="nuevo-campo">
                  <label htmlFor="piso">Piso</label>
                  <select
                    id="piso"
                    name="piso"
                    value={formulario.piso}
                    onChange={actualizarCampo}
                  >
                    {[1, 2, 3, 4, 5, 6].map((piso) => (
                      <option key={piso} value={piso}>
                        {piso}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* AFORO Y DESCRIPCIÓN */}
            <section className="nuevo-card">
              <div className="nuevo-grid-aforo">
                <div className="nuevo-campo">
                  <label htmlFor="aforo">Aforo</label>
                  <input
                    id="aforo"
                    name="aforo"
                    type="number"
                    min="1"
                    value={formulario.aforo}
                    onChange={actualizarCampo}
                    placeholder="Ej. 30"
                    className={errores.aforo ? 'campo-error' : ''}
                  />
                  {errores.aforo && (
                    <small className="nuevo-error">
                      {errores.aforo}
                    </small>
                  )}
                </div>

                <div className="nuevo-campo">
                  <label htmlFor="descripcion">Descripción</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    maxLength={300}
                    value={formulario.descripcion}
                    onChange={actualizarCampo}
                    placeholder="Describe las características del espacio."
                    className={errores.descripcion ? 'campo-error' : ''}
                  />
                  <small className="nuevo-ayuda">
                    {formulario.descripcion.length}/300 caracteres.
                  </small>
                  {errores.descripcion && (
                    <small className="nuevo-error">
                      {errores.descripcion}
                    </small>
                  )}
                </div>
              </div>
            </section>

            {/* GALERÍA DE FOTOGRAFÍAS */}
            <section className="nuevo-card">
              <h2>Galería de fotografías</h2>

              <div className="nuevo-galeria">
                {fotografias.map((foto) => (
                  <div className="nuevo-foto" key={foto.id}>
                    <img src={foto.url} alt={foto.nombre} />
                    <span title={foto.nombre}>{foto.nombre}</span>

                    <button
                      type="button"
                      onClick={() => eliminarFotografia(foto.id)}
                      aria-label={`Eliminar ${foto.nombre}`}
                    >
                      ×
                    </button>
                  </div>
                ))}

                {fotografias.length < 5 && (
                  <button
                    type="button"
                    className="nuevo-subir-foto"
                    onClick={() => inputFotosRef.current?.click()}
                  >
                    + Subir fotografía
                  </button>
                )}

                <div className="nuevo-restricciones-foto">
                  JPG o PNG · máx. 2 MB
                  <br />
                  Hasta 5 fotografías
                </div>

                <input
                  ref={inputFotosRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  multiple
                  hidden
                  onChange={subirFotografias}
                />
              </div>
            </section>

            {/* ACCIONES: DEBAJO DE LA GALERÍA */}
            <div className="nuevo-acciones">
              <button
                type="button"
                className="nuevo-btn-texto"
                onClick={cancelar}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="nuevo-btn-secundario"
                onClick={() => guardarEspacio(true)}
              >
                Guardar borrador
              </button>

              <button
                type="submit"
                className="nuevo-btn-principal"
              >
                Guardar espacio
              </button>
            </div>
          </div>


          {/* PANEL LATERAL DERECHO */}
          <aside className="nuevo-panel-lateral">
            <h3>SIGUIENTES PASOS</h3>

            <p>
              Después de guardar podrás configurar el equipamiento y el
              horario de atención del espacio.
            </p>

            
            <div className="nuevo-pasos">
            <button
                type="button"
                onClick={() => {
                const codigo = formulario.codigo.trim().toUpperCase()

                if (!codigo) {
                    setMensaje('Ingresa el código del espacio primero.')
                    setTipoMensaje('error')
                    return
                }

                navigate(`/enterprise/espacios/equipamiento/${encodeURIComponent(codigo)}`)
                }}
            >
                Equipamiento del espacio →
            </button>

            <button
                type="button"
                onClick={() => {
                const codigo = formulario.codigo.trim().toUpperCase()

                if (!codigo) {
                    setMensaje('Ingresa el código del espacio primero.')
                    setTipoMensaje('error')
                    return
                }

                navigate(`/enterprise/espacios/horario/${encodeURIComponent(codigo)}`)
                }}
            >
                Horario de atención →
            </button>

            <button
                type="button"
                onClick={() => {
                const codigo = formulario.codigo.trim().toUpperCase()

                if (!codigo) {
                    setMensaje('Ingresa el código del espacio primero.')
                    setTipoMensaje('error')
                    return
                }

                navigate(`/enterprise/espacios/estado/${encodeURIComponent(codigo)}`)
                }}
            >
                Cambiar estado →
            </button>
            </div>


            <hr />

            <p className="nuevo-nota">
              El código debe ser único en toda la sede y coincidir con la
              nomenclatura del pabellón.
            </p>
          </aside>
        </div>
      </form>
    </div>
  )
}
