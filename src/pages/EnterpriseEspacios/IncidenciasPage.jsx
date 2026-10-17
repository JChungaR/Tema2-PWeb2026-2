import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './IncidenciasAdmin.css';

export default function IncidenciasPage() {
  
  // Truco para iluminar el enlace "Incidencias" en el Navbar de Enterprise
  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (link.textContent.trim() === 'Incidencias') {
        link.classList.add('active');
        link.style.color = '#12715d';
        link.style.fontWeight = '700';
      } else {
        link.classList.remove('active');
      }
    });
  }, []);

  const incidencias = [
    { codigo: 'INC-0142', espacio: 'Lab. Cómputo H-304', tipo: 'Equipo con fallas', reportado: 'Camila Rojas Quispe', fecha: '14/09/2026', estado: 'Recibida', badge: 'badge-recibida', accion: 'Atender' },
    { codigo: 'INC-0141', espacio: 'Auditorio Q-101', tipo: 'Equipo con fallas', reportado: 'Álvaro Cárdenas Peña', fecha: '13/09/2026', estado: 'Recibida', badge: 'badge-recibida', accion: 'Atender' },
    { codigo: 'INC-0138', espacio: 'Sala Grupal E-201', tipo: 'Mobiliario dañado', reportado: 'Camila Rojas Quispe', fecha: '09/09/2026', estado: 'En atención', badge: 'badge-atencion', accion: 'Cerrar' },
    { codigo: 'INC-0136', espacio: 'Sala Reuniones A-410', tipo: 'Limpieza', reportado: 'Gabriela Ñahui Ccama', fecha: '08/09/2026', estado: 'En atención', badge: 'badge-atencion', accion: 'Cerrar' },
    { codigo: 'INC-0133', espacio: 'Lab. de Redes H-201', tipo: 'Falta de equipamiento', reportado: 'Renzo Paredes Núñez', fecha: '05/09/2026', estado: 'En atención', badge: 'badge-atencion', accion: 'Cerrar' },
    { codigo: 'INC-0129', espacio: 'Cabina Grabación N-105', tipo: 'Falta de equipamiento', reportado: 'Fernanda Zapata Vega', fecha: '02/09/2026', estado: 'Resuelta', badge: 'badge-resuelta', accion: '' }
  ];

  return (
    <div className="incidencias-admin-wrapper">
      <div className="incidencias-admin-content">
        
        <h1 className="incidencias-admin-titulo">Bandeja de incidencias</h1>

        {/* Tarjetas de Resumen */}
        <div className="summary-grid">
          <div className="summary-card">
            <span className="summary-label text-gris">TOTAL</span>
            <span className="summary-value text-oscuro">18</span>
          </div>
          <div className="summary-card">
            <span className="summary-label text-azul">RECIBIDAS</span>
            <span className="summary-value text-azul">7</span>
          </div>
          <div className="summary-card">
            <span className="summary-label text-naranja">EN ATENCIÓN</span>
            <span className="summary-value text-naranja">5</span>
          </div>
          <div className="summary-card">
            <span className="summary-label text-verde">RESUELTAS</span>
            <span className="summary-value text-verde">6</span>
          </div>
        </div>

        {/* Barra de Filtros */}
        <div className="filtros-bar">
          <input type="text" className="filtro-input" placeholder="Buscar por espacio o descripción..." />
          <select className="filtro-select"><option>Espacio: Todos</option></select>
          <select className="filtro-select"><option>Tipo: Todos</option></select>
          <select className="filtro-select"><option>Estado: Todos</option></select>
        </div>

        {/* Tabla */}
        <div className="tabla-admin-card">
          <table className="tabla-admin">
            <thead>
              <tr>
                <th>CÓDIGO</th>
                <th>ESPACIO</th>
                <th>TIPO</th>
                <th>REPORTADO POR</th>
                <th>FECHA</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {incidencias.map((inc) => (
                <tr key={inc.codigo}>
                  <td><strong>{inc.codigo}</strong></td>
                  <td>{inc.espacio}</td>
                  <td>{inc.tipo}</td>
                  <td>{inc.reportado}</td>
                  <td>{inc.fecha}</td>
                  <td><span className={`badge-estado ${inc.badge}`}>{inc.estado}</span></td>
                  <td>
                    {inc.accion && (
                      <button className="btn-accion-outline">{inc.accion}</button>
                    )}
                    <Link to={`/enterprise/incidencias/detalle/${inc.codigo}`} className="link-detalle">
                      Detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
} 