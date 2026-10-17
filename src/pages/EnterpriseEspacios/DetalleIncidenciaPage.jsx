import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './IncidenciasAdmin.css';

export default function DetalleIncidenciaPage() {
  const { codigo } = useParams();

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

  // Lista de datos simulados (Mock) 100% Frontend
  const baseDatosIncidencias = {
    'INC-0142': {
      estado: 'En atención', badge: 'badge-atencion',
      fechaReporte: '14/09/2026 a las 10:42', espacio: 'Lab. Cómputo H-304',
      tipo: 'Equipo con fallas', reportadoPor: 'Camila Rojas Quispe',
      detectadaEn: '14/09/2026 · 10:00 – 11:00', equipamiento: '3 computadoras (posiciones 12, 13, 14) · tomacorrientes de la fila 3',
      descripcion: 'Las computadoras de las posiciones 12, 13 y 14 no encienden y el tomacorriente de esa fila no da energía.',
      seguimiento: [
        { autor: 'Camila Rojas Quispe · estudiante', fecha: '14/09/2026 10:42', texto: 'Reporté la incidencia al terminar mi bloque.' },
        { autor: 'Jorge Ramírez Salas · encargado', fecha: '14/09/2026 11:15', texto: 'Verificado en sitio. Se solicitó apoyo a Mantenimiento para revisar el tablero de la fila 3.' },
        { autor: 'Jorge Ramírez Salas · encargado', fecha: '15/09/2026 09:30', texto: 'Se bloquearon los bloques del 16/09 al 18/09 para el recableado.' }
      ]
    },
    'INC-0141': {
      estado: 'Recibida', badge: 'badge-recibida',
      fechaReporte: '13/09/2026 a las 09:15', espacio: 'Auditorio Q-101',
      tipo: 'Equipo con fallas', reportadoPor: 'Álvaro Cárdenas Peña',
      detectadaEn: '13/09/2026 · 08:00 – 10:00', equipamiento: 'Proyector principal',
      descripcion: 'El proyector principal no da imagen, parece tener el foco quemado. No pude presentar mis diapositivas.',
      seguimiento: [
        { autor: 'Álvaro Cárdenas Peña · estudiante', fecha: '13/09/2026 09:15', texto: 'Dejé constancia con el profesor encargado del curso.' }
      ]
    },
    'INC-0138': {
      estado: 'En atención', badge: 'badge-atencion',
      fechaReporte: '09/09/2026 a las 15:30', espacio: 'Sala Grupal E-201',
      tipo: 'Mobiliario dañado', reportadoPor: 'Camila Rojas Quispe',
      detectadaEn: '09/09/2026 · 14:00 – 16:00', equipamiento: 'Silla ergonómica negra',
      descripcion: 'Una de las sillas tiene una rueda rota y el respaldar está completamente flojo.',
      seguimiento: [
        { autor: 'Camila Rojas Quispe · estudiante', fecha: '09/09/2026 15:30', texto: 'Aparté la silla a una esquina para que nadie se accidente.' }
      ]
    }
  };

  const data = baseDatosIncidencias[codigo] || {
    estado: 'En revisión', badge: 'badge-atencion',
    fechaReporte: 'Fecha no registrada', espacio: 'Espacio en revisión',
    tipo: 'Otro', reportadoPor: 'Usuario Anónimo',
    detectadaEn: 'Bloque no registrado', equipamiento: 'No especificado',
    descripcion: 'Datos de prueba genéricos.',
    seguimiento: []
  };

  return (
    <div className="incidencias-admin-wrapper">
      <div className="incidencias-admin-content">
        
        <div className="detalle-breadcrumb">
          Incidencias / <b>{codigo}</b>
        </div>

        <div className="detalle-header">
          <div>
            <h1 className="detalle-titulo-main">
              {codigo} <span className={`badge-estado ${data.badge}`} style={{fontSize: '12px', padding: '6px 10px'}}>{data.estado}</span>
            </h1>
            <p className="detalle-subtitulo">Reportada el {data.fechaReporte}</p>
          </div>
          <div style={{display: 'flex', gap: '12px'}}>
            <button className="btn-ulima-outline">Bloquear el espacio</button>
            <button className="btn-ulima">Cerrar incidencia</button>
          </div>
        </div>

        <div className="detalle-grid">
          <div>
            <div className="detalle-card">
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                <div>
                  <span className="detalle-label">ESPACIO</span>
                  <p className="detalle-valor">{data.espacio}</p>
                </div>
                <div>
                  <span className="detalle-label">TIPO</span>
                  <p className="detalle-valor">{data.tipo}</p>
                </div>
                <div>
                  <span className="detalle-label">REPORTADO POR</span>
                  <p className="detalle-valor">{data.reportadoPor}</p>
                </div>
                <div>
                  <span className="detalle-label">DETECTADA EN</span>
                  <p className="detalle-valor">{data.detectadaEn}</p>
                </div>
              </div>
              
              <span className="detalle-label mt-2">EQUIPAMIENTO AFECTADO</span>
              <p className="detalle-valor">{data.equipamiento}</p>

              <span className="detalle-label mt-2">DESCRIPCIÓN</span>
              <p className="detalle-valor" style={{marginBottom: 0}}>{data.descripcion}</p>
            </div>

            <div className="detalle-card">
              <h3 className="seguimiento-titulo">Seguimiento</h3>
              
              {data.seguimiento.length > 0 ? (
                data.seguimiento.map((seg, index) => (
                  <div className="timeline-item" key={index}>
                    <div className="timeline-autor">{seg.autor}</div>
                    <div className="timeline-fecha">{seg.fecha}</div>
                    <p className="timeline-texto">{seg.texto}</p>
                  </div>
                ))
              ) : (
                <p style={{color: '#6c757d', fontSize: '14px', marginBottom: '24px'}}>No hay historial de seguimiento aún.</p>
              )}

              <div style={{marginTop: '32px'}}>
                <textarea className="seguimiento-input" placeholder="Agregar un comentario de seguimiento..."></textarea>
                <div style={{textAlign: 'right'}}>
                  <button className="btn-ulima">Publicar comentario</button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="detalle-card">
              <h3 className="cierre-titulo">Cerrar la incidencia</h3>
              <span className="detalle-label">DESCRIPCIÓN DE LA SOLUCIÓN (OBLIGATORIA)</span>
              <textarea className="cierre-input" rows="4" style={{resize: 'vertical'}} placeholder="Detalla las acciones tomadas..."></textarea>
              <span className="detalle-label" style={{marginTop: '20px'}}>FECHA DE SOLUCIÓN</span>
              <input type="date" className="cierre-input" />
              <div className="alerta-cierre">
                Al cerrar la incidencia se notificará a {data.reportadoPor} y el espacio volverá a estado disponible.
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <button className="btn-ulima-text px-0">Cancelar</button>
                <button className="btn-ulima">Cerrar como resuelta</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}