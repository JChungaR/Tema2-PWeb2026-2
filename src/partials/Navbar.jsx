// src/partials/Navbar.jsx
import React from 'react';

export default function Navbar({
  user,
  variant = 'student'
}) {

  // ========================================
  // TIPO DE NAVBAR
  // ========================================

  const isEnterprise = variant === 'enterprise';


  // ========================================
  // USUARIO ACTUAL
  // ========================================

  const currentUser = user || (
    isEnterprise
      ? {
          name: 'Jorge Ramírez',
          role: 'Encargado'
        }
      : {
          name: 'Pepe Valdivia',
          role: 'Estudiante'
        }
  );


  // ========================================
  // INICIALES
  // ========================================

  const nameParts = currentUser.name
    .trim()
    .split(' ');

  const initials =
    nameParts.length > 1
      ? (
          nameParts[0][0] +
          nameParts[1][0]
        ).toUpperCase()
      : nameParts[0][0].toUpperCase();


  // ========================================
  // RUTA ACTUAL
  // ========================================

  const currentPath = window.location.pathname;


  // ========================================
  // LINKS ESTUDIANTE
  // ========================================

  const studentLinks = [
    {
      label: 'Buscar espacios',
      href: '/espacios'
    },
    {
      label: 'Mis reservas',
      href: '/reservas'
    },
    {
      label: 'Mis incidencias',
      href: '/incidencias'
    },
    {
      label: 'Mi cuenta',
      href: '/cuenta'
    }
  ];


  // ========================================
  // LINKS ENCARGADO
  // ========================================

  const enterpriseLinks = [
    {
      label: 'Espacios',
      href: '/enterprise'
    },
    {
      label: 'Bandeja del día',
      href: '/enterprise/bandeja'
    },
    {
      label: 'Bloqueos',
      href: '/enterprise/bloqueos'
    },
    {
      label: 'Incidencias',
      href: '/enterprise/incidencias'
    }
  ];


  const links = isEnterprise
    ? enterpriseLinks
    : studentLinks;


  return (

    <nav
      className={
        `navbar navbar-expand-lg navbar-light bg-white border-bottom
        ${isEnterprise ? 'enterprise-navbar' : 'py-3'}`
      }
    >

      <div
        className={
          isEnterprise
            ? 'container-fluid enterprise-navbar-container'
            : 'container'
        }
      >


        {/* ========================================
            LOGO
            ======================================== */}

        <a
          className="
            navbar-brand
            fw-bold
            fs-4
            me-4
          "
          href={
            isEnterprise
              ? '/enterprise'
              : '/estudiantes'
          }
        >
          <span
            style={{
              color: '#0f6c5f'
            }}
          >
            Reserva
          </span>

          <span className="text-dark">
            UL
          </span>
        </a>


        {/* ========================================
            BOTÓN RESPONSIVE
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
          <span className="navbar-toggler-icon" />
        </button>


        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >


          {/* ========================================
              LINKS
              ======================================== */}

          <ul
            className="
              navbar-nav
              me-auto
              mb-2
              mb-lg-0
              gap-2
            "
          >

            {links.map((link) => {

              const active =
                currentPath === link.href ||
                (
                  link.href !== '/enterprise' &&
                  currentPath.startsWith(
                    `${link.href}/`
                  )
                );


              return (

                <li
                  className="nav-item"
                  key={link.href}
                >

                  <a
                    href={link.href}

                    className={
                      active
                        ? 'nav-link fw-bold'
                        : 'nav-link text-secondary'
                    }

                    style={
                      active
                        ? {
                            color: '#0f6c5f'
                          }
                        : undefined
                    }
                  >

                    {link.label}

                  </a>

                </li>

              );

            })}

          </ul>


          {/* ========================================
              LADO DERECHO
              ======================================== */}

          <div
            className="
              d-flex
              align-items-center
              mt-3
              mt-lg-0
              ms-auto
            "
          >


            {/* CAMPUS SOLO PARA ENCARGADO */}

            {isEnterprise && (

              <button
                type="button"
                className="
                  btn
                  btn-sm
                  bg-white
                  border
                  me-3
                "
                style={{
                  height: '36px',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}
              >

                Campus Monterrico

                <span
                  style={{
                    marginLeft: '7px'
                  }}
                >
                  ▾
                </span>

              </button>

            )}


            {/* ========================================
                ROL
                ======================================== */}

            <span
              className="
                badge
                rounded-2
                me-3
                px-3
                py-2
                font-monospace
              "

              style={{
                backgroundColor:
                  isEnterprise
                    ? '#e8f0fa'
                    : '#d1e7dd',

                color:
                  isEnterprise
                    ? '#3b6fa8'
                    : '#0f5132',

                fontWeight: '700',
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}
            >

              {currentUser.role}

            </span>


            {/* ========================================
                AVATAR
                ======================================== */}

            <div
              className="
                rounded-circle
                d-flex
                align-items-center
                justify-content-center
                me-2
                fw-bold
              "

              style={{
                width: '36px',
                height: '36px',

                backgroundColor:
                  isEnterprise
                    ? '#e8f0fa'
                    : '#d1e7dd',

                color:
                  isEnterprise
                    ? '#3b6fa8'
                    : '#0f5132',

                fontSize: '0.85rem'
              }}
            >

              {initials}

            </div>


            {/* ========================================
                DROPDOWN USUARIO
                ======================================== */}

            <div className="dropdown">

              <a
                className="
                  nav-link
                  dropdown-toggle
                  text-dark
                  fw-medium
                  p-0
                  d-flex
                  align-items-center
                "
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >

                {currentUser.name}

              </a>


              <ul
                className="
                  dropdown-menu
                  dropdown-menu-end
                  shadow-sm
                "
              >

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
                    className="
                      dropdown-item
                      text-danger
                    "
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
  );
}