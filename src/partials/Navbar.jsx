import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function Navbar({ user = { name: "Pepe Valdivia", role: "Estudiante" } }) {
    let initials = "";

    initials += user.name.charAt(0);

    for(let i=0; i<user.name.length; i++){
      console.log(user.name[i]);
      if(user.name[i] === ' ') {
        initials += user.name[i+1];
        console.log(user.name[i+1]);
        break;
      }
    }



  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 border-bottom">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4 me-4" href="/estudiantes">
            <span style={{color: '#0f6c5f'}}>Reserva</span><span className="text-dark">UL</span>
          </a>

          <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Abrir menú">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
              <li className="nav-item">
                <a className="nav-link text-secondary" href="/espacios">
                  Buscar espacios
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-bold" style={{color: '#0f6c5f'}} href="/reservas">
                  Mis reservas
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary" href="/incidencias">
                  Mis incidencias
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary" href="/cuenta">
                  Mi cuenta
                </a>
              </li>
            </ul>

            <div className="d-flex align-items-center mt-3 mt-lg-0 ms-auto">
              <span className="badge rounded-2 me-3 px-3 py-2 font-monospace"
                    style={{backgroundColor: '#d1e7dd', color: '#0f5132', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase'}}>
                    {user.role}
                </span>

              <div className="rounded-circle d-flex align-items-center justify-content-center me-2 fw-bold"
                   style={{width: '36px', height: '36px', backgroundColor: '#d1e7dd', color: '#0f5132', fontSize: '0.85rem'}}>
                {initials}
              </div>

              <div className="dropdown">
                <a className="nav-link dropdown-toggle text-dark fw-medium p-0 d-flex align-items-center"
                   href="#"
                   role="button"
                   data-bs-toggle="dropdown"
                   aria-expanded="false">
                  {user.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  <li><a className="dropdown-item" href="/perfil">Mi Perfil</a></li>
                  <li><a className="dropdown-item" href="/configuracion">Configuración</a></li>
                  <li>
                    <hr className="dropdown-divider"/>
                  </li>
                  <li><a className="dropdown-item text-danger" href="/logout">Cerrar sesión</a></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </nav>
  );
}