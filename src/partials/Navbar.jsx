// src\partials\Navbar.jsx

import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar({
  user = {
    name: 'Pepe Valdivia',
    role: 'Estudiante'
  }
}) {

  // ========================================
  // INICIALES DEL USUARIO
  // ========================================

  let initials = ''

  initials += user.name.charAt(0)

  for (let i = 0; i < user.name.length; i++) {

    if (user.name[i] === ' ') {
      initials += user.name[i + 1]
      break
    }

  }


  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 border-bottom">

      <div className="container">

        {/* ========================================
            LOGO
        ======================================== */}

        <NavLink
          className="navbar-brand fw-bold fs-4 me-4"
          to="/enterprise/"
        >
          <span style={{ color: '#0f6c5f' }}>
            Reserva
          </span>

          <span className="text-dark">
            UL
          </span>
        </NavLink>


        {/* ========================================
            BOTÓN MOBILE
        ======================================== */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        {/* ========================================
            MENÚ
        ======================================== */}

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >

          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">


            {/* ESPACIOS */}

            <li className="nav-item">

              <NavLink
                to="/enterprise/"
                end
                className={({ isActive }) =>
                  isActive
                    ? 'nav-link fw-bold'
                    : 'nav-link text-secondary'
                }
                style={({ isActive }) => ({
                  color: isActive ? '#0f6c5f' : undefined
                })}
              >
                Espacios
              </NavLink>

            </li>


            {/* BANDEJA DEL DÍA */}

            <li className="nav-item">

              <NavLink
                to="/enterprise/bandeja"
                className={({ isActive }) =>
                  isActive
                    ? 'nav-link fw-bold'
                    : 'nav-link text-secondary'
                }
                style={({ isActive }) => ({
                  color: isActive ? '#0f6c5f' : undefined
                })}
              >
                Bandeja del día
              </NavLink>

            </li>


            {/* BLOQUEOS */}

            <li className="nav-item">

              <NavLink
                to="/enterprise/bloqueos"
                className={({ isActive }) =>
                  isActive
                    ? 'nav-link fw-bold'
                    : 'nav-link text-secondary'
                }
                style={({ isActive }) => ({
                  color: isActive ? '#0f6c5f' : undefined
                })}
              >
                Bloqueos
              </NavLink>

            </li>


            {/* INCIDENCIAS */}

            <li className="nav-item">

              <NavLink
                to="/enterprise/incidencias"
                className={({ isActive }) =>
                  isActive
                    ? 'nav-link fw-bold'
                    : 'nav-link text-secondary'
                }
                style={({ isActive }) => ({
                  color: isActive ? '#0f6c5f' : undefined
                })}
              >
                Incidencias
              </NavLink>

            </li>

          </ul>


          {/* ========================================
              USUARIO
          ======================================== */}

          <div className="d-flex align-items-center mt-3 mt-lg-0 ms-auto">

            {/* ROL */}

            <span
              className="badge rounded-2 me-3 px-3 py-2 font-monospace"
              style={{
                backgroundColor: '#d1e7dd',
                color: '#0f5132',
                fontWeight: '700',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}
            >
              {user.role}
            </span>


            {/* AVATAR */}

            <div
              className="rounded-circle d-flex align-items-center justify-content-center me-2 fw-bold"
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#d1e7dd',
                color: '#0f5132',
                fontSize: '0.85rem'
              }}
            >
              {initials}
            </div>


            {/* NOMBRE + DROPDOWN */}

            <div className="dropdown">

              <a
                className="nav-link dropdown-toggle text-dark fw-medium p-0 d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.name}
              </a>


              <ul className="dropdown-menu dropdown-menu-end shadow-sm">

                <li>
                  <a
                    className="dropdown-item"
                    href="/perfil"
                  >
                    Mi Perfil
                  </a>
                </li>

                <li>
                  <a
                    className="dropdown-item"
                    href="/configuracion"
                  >
                    Configuración
                  </a>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item text-danger"
                    href="/logout"
                  >
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