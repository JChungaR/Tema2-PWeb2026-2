import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Incidencias.css'; // Importamos tu CSS único

export default function ReportarIncidenciaPage() {
  const navigate = useNavigate();
  const [equipamiento, setEquipamiento] = useState(['Computadoras (3)', 'Tomacorrientes']);

  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-link-custom, .nav-link');
    navLinks.forEach(link => {
      if (link.textContent.trim() === 'Mis incidencias') {
        link.classList.add('active');
        link.style.color = '#12715d';
        link.style.fontWeight = '700';
      } else {
        link.classList.remove('active');
      }
    });
  }, []);

  const toggleEq = (item) => {
    if (equipamiento.includes(item)) setEquipamiento(equipamiento.filter(i => i !== item));
    else setEquipamiento([...equipamiento, item]);
  };

  const enviarReporte = (e) => {
    e.preventDefault();
    navigate('/estudiante/mis-incidencias');
  };

  return (
    <div className="incidencias-wrapper">
      <div className="incidencias-content">

        <div className="breadcrumb-text">
          Ficha del espacio / <b>Reportar incidencia</b>
        </div>

        <div className="card-formulario">
          <h2 className="incidencias-titulo fs-3 mb-1">Reportar una incidencia</h2>
          <p className="incidencias-subtitulo mb-4" style={{marginBottom: '32px'}}>
            El encargado del espacio recibirá el reporte y podrás seguir su avance.
          </p>

          <form onSubmit={enviarReporte}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label className="form-label-ulima">ESPACIO</label>
                <select className="form-control-ulima">
                  <option>Laboratorio de Cómputo H-304</option>
                </select>
              </div>
              <div>
                <label className="form-label-ulima">TIPO DE INCIDENCIA</label>
                <select className="form-control-ulima">
                  <option>Equipo con fallas</option>
                </select>
                <small style={{fontSize: '11px', color: '#6c757d', display: 'block', marginTop: '6px'}}>
                  Equipo con fallas · limpieza · mobiliario dañado · falta de equipamiento · otro.
                </small>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label className="form-label-ulima">EQUIPAMIENTO AFECTADO</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                {['Computadoras (3)', 'Proyector', 'Tomacorrientes', 'Pizarra acrílica', 'Televisor', 'Mesa de trabajo'].map(eq => (
                  <button
                    type="button"
                    key={eq}
                    onClick={() => toggleEq(eq)}
                    className={`btn-equipamiento ${equipamiento.includes(eq) ? 'active' : ''}`}
                  >
                    {eq}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label className="form-label-ulima">DESCRIPCIÓN</label>
              <textarea
                className="form-control-ulima"
                rows="4"
                defaultValue="Las computadoras de las posiciones 12, 13 y 14 no encienden y el tomacorriente de esa fila no da energía."
                style={{ resize: 'vertical' }}
              ></textarea>
              <small style={{fontSize: '11px', color: '#6c757d', display: 'block', marginTop: '6px'}}>Máximo 500 caracteres.</small>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div>
                <label className="form-label-ulima">FECHA EN QUE SE DETECTÓ</label>
                <input type="date" className="form-control-ulima" defaultValue="2026-09-14"/>
              </div>
              <div>
                <label className="form-label-ulima">BLOQUE EN QUE SE DETECTÓ</label>
                <select className="form-control-ulima">
                  <option>10:00 – 11:00</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '24px', borderTop: '1px solid #e9ecef', paddingTop: '24px' }}>
              <button
                type="button"
                onClick={() => navigate('/estudiante/mis-incidencias')}
                className="btn-ulima-text px-0"
              >
                Cancelar
              </button>
              <button type="submit" className="btn-ulima">Enviar reporte</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}