import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Incidencias.css';

export default function MisIncidenciasPage() {
  
  // TRUCO: Ilumina el Navbar de verde sin tocar el código de tus compañeros
  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-link-custom');
    navLinks.forEach(link => {
      if (link.textContent.trim() === 'Mis incidencias') {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, []);

  const incidencias = [
    { codigo: 'INC-0142', espacio: 'Laboratorio de Cómputo H-304', tipo: 'Equipo con fallas', fecha: '14/09/2026', estado: 'Recibida', badge: 'badge-recibida' },
    { codigo: 'INC-0138', espacio: 'Sala de Estudio Grupal E-201', tipo: 'Mobiliario dañado', fecha: '09/09/2026', estado: 'En atención', badge: 'badge-atencion' },
    { codigo: 'INC-0129', espacio: 'Cabina de Grabación N-105', tipo: 'Falta de equipamiento', fecha: '02/09/2026', estado: 'Resuelta', badge: 'badge-resuelta' },
    { codigo: 'INC-0117', espacio: 'Sala Biblioteca B-102', tipo: 'Limpieza', fecha: '28/08/2026', estado: 'Resuelta', badge: 'badge-resuelta' }
  ];

  return (
    <div className="incidencias-wrapper">
      <div className="incidencias-content">
        
        {/* Cabecera */}
        <div className="d-flex justify-content-between align-items-end">
          <div>
            <h1 className="incidencias-titulo">Mis incidencias</h1>
            <p className="incidencias-subtitulo">4 reportes registrados</p>
          </div>
          <Link to="/estudiante/reportar-incidencia" className="btn-ulima">
            Reportar incidencia
          </Link>
        </div>

        {/* Tabla de reportes */}
        <div className="tabla-incidencias-card">
          <table className="tabla-incidencias">
            <thead>
              <tr>
                <th>CÓDIGO</th>
                <th>ESPACIO</th>
                <th>TIPO</th>
                <th>FECHA</th>
                <th>ESTADO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {incidencias.map((inc) => (
                <tr key={inc.codigo}>
                  <td><strong>{inc.codigo}</strong></td>
                  <td>{inc.espacio}</td>
                  <td>{inc.tipo}</td>
                  <td>{inc.fecha}</td>
                  <td><span className={`badge-estado ${inc.badge}`}>{inc.estado}</span></td>
                  <td className="text-end">
                    <Link to="#" className="fw-bold text-decoration-none" style={{color: '#12715d'}}>Ver detalle</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alerta de notificación */}
        <div className="alerta-ulima">
          Cada cambio de estado te llega por correo. Si la incidencia impide usar el espacio, el encargado puede bloquear los bloques afectados.
        </div>

        {/* Componente de Estado Vacío */}
        <div className="estado-vacio-card">
          <p className="estado-vacio-label">ESTADO VACÍO DE ESTA MISMA PANTALLA</p>
          <div className="estado-vacio-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
            </svg>
          </div>
          <h3 className="estado-vacio-titulo">No has reportado incidencias</h3>
          <p className="estado-vacio-texto">
            Si encuentras un equipo con fallas o un espacio sucio,<br/> cuéntanoslo desde la ficha del espacio.
          </p>
          <Link to="/estudiante/reportar-incidencia" className="btn-ulima">
            Reportar incidencia
          </Link>
        </div>

      </div>

      {/* Pie de página */}
      <footer className="footer-ulima">
        <div>Universidad de Lima · Campus Monterrico</div>
        <div>
          <a href="#">Reglamento de uso</a>
          <a href="#">Mesa de ayuda</a>
        </div>
      </footer>
    </div>
  );
}