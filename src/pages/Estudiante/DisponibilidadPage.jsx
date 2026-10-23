import { useState } from "react";
import "./DisponibilidadPage.css";

const espaciosIniciales = [
  {
    codigo: "E-201",
    nombre: "Sala de Estudio Grupal E-201",
    sede: "Pabellón E",
    tipo: "Sala de estudio grupal",
    aforo: 8,
    equipamiento: ["Pizarra acrílica", "Tomacorrientes"],
    horario: "09:00",
  },
  {
    codigo: "B-102",
    nombre: "Sala de Estudio B-102",
    sede: "Biblioteca",
    tipo: "Sala de estudio grupal",
    aforo: 6,
    equipamiento: ["Pizarra acrílica", "Televisor"],
    horario: "10:00",
  },
  {
    codigo: "A-410",
    nombre: "Sala de Reuniones A-410",
    sede: "Pabellón A",
    tipo: "Sala de reuniones",
    aforo: 12,
    equipamiento: ["Televisor", "Pizarra acrílica"],
    horario: "12:00",
  },
  {
    codigo: "H-304",
    nombre: "Laboratorio de Cómputo H-304",
    sede: "Edificio de Ingeniería",
    tipo: "Laboratorio de cómputo",
    aforo: 30,
    equipamiento: ["Computadoras", "Proyector"],
    horario: "13:00",
  },
];

const horas = [
  "07:00", "08:00", "09:00", "10:00",
  "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00",
  "19:00", "20:00", "21:00",
];

const dias = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

function DisponibilidadPage() {
  const [busqueda, setBusqueda] = useState("");
  const [tipo, setTipo] = useState("");
  const [aforo, setAforo] = useState("");
  const [equipo, setEquipo] = useState("");
  const [espacioSeleccionado, setEspacioSeleccionado] =
    useState(null);
  const [semana, setSemana] = useState(0);

  // Filtrar los espacios según los criterios ingresados
  const espaciosFiltrados = espaciosIniciales.filter((espacio) => {
    const coincideBusqueda =
      espacio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      espacio.codigo.toLowerCase().includes(busqueda.toLowerCase());

    const coincideTipo =
      tipo === "" || espacio.tipo === tipo;

    const coincideAforo =
      aforo === "" || espacio.aforo >= Number(aforo);

    const coincideEquipo =
      equipo === "" || espacio.equipamiento.includes(equipo);

    return (
      coincideBusqueda &&
      coincideTipo &&
      coincideAforo &&
      coincideEquipo
    );
  });

  // Limpiar todos los filtros
  function limpiarFiltros() {
    setBusqueda("");
    setTipo("");
    setAforo("");
    setEquipo("");
  }

  // Cambiar la semana del calendario
  function cambiarSemana(cantidad) {
    setSemana((semanaActual) => semanaActual + cantidad);
  }

  // Mostrar el estado de los bloques de ejemplo
  function obtenerEstado(hora, indiceDia) {
    if (indiceDia === 5 && hora === "07:00") {
      return "No disponible";
    }

    if (
      (hora === "09:00" && indiceDia === 0) ||
      (hora === "10:00" && indiceDia === 3) ||
      (hora === "12:00" && indiceDia === 1)
    ) {
      return "Ocupado";
    }

    return "Libre";
  }

  // Calcular las fechas de la semana que se está visualizando
  function obtenerFecha(indiceDia) {
    const fecha = new Date(2026, 8, 14 + indiceDia + semana * 7);

    return fecha.toLocaleDateString("es-PE", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    });
  }

  return (
    <main className="h3-contenedor">
      
      <section className="h3-contenido" id="buscar-espacios">
        <h2>Disponibilidad y búsqueda</h2>

        <p className="h3-descripcion">
          Encuentra espacios del campus según tus necesidades.
        </p>

        <div className="h3-layout">
          {/* Panel de filtros */}
          <aside className="h3-filtros">
            <h3>Filtros de búsqueda</h3>

            <label htmlFor="h3-busqueda">
              Nombre o código
            </label>

            <input
              id="h3-busqueda"
              type="text"
              placeholder="Ej. E-201"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <label htmlFor="h3-tipo">
              Tipo de espacio
            </label>

            <select
              id="h3-tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">Todos los tipos</option>
              <option value="Sala de estudio grupal">
                Sala de estudio grupal
              </option>
              <option value="Sala de reuniones">
                Sala de reuniones
              </option>
              <option value="Laboratorio de cómputo">
                Laboratorio de cómputo
              </option>
            </select>

            <label htmlFor="h3-aforo">
              Aforo mínimo
            </label>

            <input
              id="h3-aforo"
              type="number"
              min="1"
              placeholder="Cantidad de personas"
              value={aforo}
              onChange={(e) => setAforo(e.target.value)}
            />

            <label htmlFor="h3-equipo">
              Equipamiento
            </label>

            <select
              id="h3-equipo"
              value={equipo}
              onChange={(e) => setEquipo(e.target.value)}
            >
              <option value="">Cualquier equipamiento</option>
              <option value="Pizarra acrílica">
                Pizarra acrílica
              </option>
              <option value="Tomacorrientes">
                Tomacorrientes
              </option>
              <option value="Televisor">Televisor</option>
              <option value="Computadoras">Computadoras</option>
              <option value="Proyector">Proyector</option>
            </select>

            <button
              type="button"
              className="h3-boton-secundario"
              onClick={limpiarFiltros}
            >
              Limpiar filtros
            </button>
          </aside>

          {/* Resultados de la búsqueda */}
          <section className="h3-resultados">
            <h3>Espacios encontrados</h3>

            <p>
              {espaciosFiltrados.length} resultados encontrados
            </p>

            {espaciosFiltrados.length === 0 ? (
              <div className="h3-vacio">
                <h4>No se encontraron espacios</h4>

                <p>
                  Modifica los filtros para encontrar otras opciones.
                </p>

                <button
                  type="button"
                  onClick={limpiarFiltros}
                >
                  Quitar filtros
                </button>
              </div>
            ) : (
              <div className="h3-tarjetas">
                {espaciosFiltrados.map((espacio) => (
                  <article
                    className="h3-tarjeta"
                    key={espacio.codigo}
                  >
                    <div className="h3-tarjeta-info">
                      <span className="h3-etiqueta">
                        Espacio de ejemplo
                      </span>

                      <h4>{espacio.nombre}</h4>

                      <p>
                        <strong>Código:</strong> {espacio.codigo}
                      </p>

                      <p>
                        <strong>Ubicación:</strong> {espacio.sede}
                      </p>

                      <p>
                        <strong>Tipo:</strong> {espacio.tipo}
                      </p>

                      <p>
                        <strong>Aforo:</strong> {espacio.aforo} personas
                      </p>

                      <p>
                        <strong>Equipamiento:</strong>{" "}
                        {espacio.equipamiento.join(", ")}
                      </p>

                      <button
                        type="button"
                        onClick={() => setEspacioSeleccionado(espacio)}
                      >
                        Ver calendario
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Calendario del espacio seleccionado */}
        {espacioSeleccionado && (
          <section
            className="h3-calendario"
            id="calendario-semanal"
          >
            <div className="h3-calendario-titulo">
              <div>
                <h3>Disponibilidad semanal</h3>

                <p>{espacioSeleccionado.nombre}</p>
              </div>

              <div className="h3-semana-botones">
                <button
                  type="button"
                  onClick={() => cambiarSemana(-1)}
                  aria-label="Semana anterior"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={() => setSemana(0)}
                >
                  Semana inicial
                </button>

                <button
                  type="button"
                  onClick={() => cambiarSemana(1)}
                  aria-label="Semana siguiente"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="h3-leyenda">
              <span>
                <i className="h3-libre"></i> Libre
              </span>

              <span>
                <i className="h3-ocupado"></i> Ocupado
              </span>

              <span>
                <i className="h3-no-disponible"></i> No disponible
              </span>
            </div>

            <div className="h3-tabla-contenedor">
              <table className="h3-tabla">
                <thead>
                  <tr>
                    <th>Hora</th>

                    {dias.map((dia, indice) => (
                      <th key={dia}>
                        {dia}
                        <br />
                        {obtenerFecha(indice)}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {horas.map((hora) => (
                    <tr key={hora}>
                      <th>{hora}</th>

                      {dias.map((dia, indice) => {
                        const estado = obtenerEstado(hora, indice);

                        let clase = "h3-libre";

                        if (estado === "Ocupado") {
                          clase = "h3-ocupado";
                        } else if (estado === "No disponible") {
                          clase = "h3-no-disponible";
                        }

                        return (
                          <td key={`${dia}-${hora}`}>
                            <span className={`h3-bloque ${clase}`}>
                              {estado}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="h3-nota">
              La información del calendario es demostrativa y debe
              conectarse con las reservas reales del sistema.
            </p>
          </section>
        )}
      </section>
    </main>
  );
}

export default DisponibilidadPage;
