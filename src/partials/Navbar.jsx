
// src/partials/Navbar.jsx
import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Activa Dropdown y Collapse de Bootstrap
import './Navbar.css';

export default function Navbar({ user = { name: "Pepe Valdivia", role: "Estudiante" }, activeLink = "/estudiantes/espacios" }) {

  // Función para obtener las iniciales (Ej: "Pepe Valdivia" -> "PV")
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };


  const initials = getInitials(user.name);

  return (

      <nav className="navbar navbar-expand-lg navbar-custom py-3">
        <div className="container">
          {/* Logo institucional */}
          <a className="navbar-brand fw-bold fs-4 me-4 d-flex align-items-center" href="/estudiantes/espacios">
            <span className="brand-verde">Reserva</span>
            <span className="brand-tinta">UL</span>
          </a>

          {/* Botón responsive menú hamburguesa */}
          <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Abrir menú">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            {/* Enlaces principales */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1 gap-lg-2">
              <li className="nav-item">
                <a
                    className={`nav-link nav-link-custom ${activeLink === '/estudiante/espacios' ? 'active' : ''}`}
                    href="/estudiante/espacios">
                  Buscar espacios
                </a>
              </li>
              <li className="nav-item">
                <a
                    className={`nav-link nav-link-custom ${activeLink === '/estudiante/reservas' ? 'active' : ''}`}
                    href="/estudiante/reservas">
                  Mis reservas
                </a>
              </li>
              <li className="nav-item">
                <a
                    className={`nav-link nav-link-custom ${activeLink === '/estudiante/incidencias' ? 'active' : ''}`}
                    href="/estudiante/incidencias">
                  Mis incidencias
                </a>
              </li>
              <li className="nav-item">
                <a
                    className={`nav-link nav-link-custom ${activeLink === '/estudiante' ? 'active' : ''}`}
                    href="/estudiante/mi-cuenta">
                  Mi cuenta
                </a>
              </li>
            </ul>

            {/* Perfil de usuario y Dropdown */}
            <div className="d-flex align-items-center mt-3 mt-lg-0 ms-auto">
              {/* Rol */}
              <span className="badge badge-rol rounded-2 me-3 px-3 py-2 font-monospace">
                            {user.role}
                        </span>

              {/* Avatar de iniciales */}
              <div className="avatar-iniciales rounded-circle d-flex align-items-center justify-content-center me-2">
                {initials}
              </div>

              {/* Menú Desplegable (Dropdown) */}
              <div className="dropdown">
                <a
                    className="nav-link dropdown-toggle brand-tinta fw-semibold p-0 d-flex align-items-center cursor-pointer"
                    href="#"
                    id="userMenuDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                  {user.name}
                </a>

                <ul className="dropdown-menu dropdown-menu-end shadow-sm dropdown-menu-custom mt-2" aria-labelledby="userMenuDropdown">
                  <li>
                    <a className="dropdown-item dropdown-item-custom" href="/perfil">
                      Mi Perfil
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item dropdown-item-custom" href="/configuracion">
                      Configuración
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider my-1" />
                  </li>
                  <li>
                    <a className="dropdown-item dropdown-item-danger" href="/logout">
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>

      

    </nav>
  )
}