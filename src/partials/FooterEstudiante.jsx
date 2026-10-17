// src/partials/FooterEstudiante.jsx
import './FooterEstudiante.css'; // <-- IMPORTAMOS EL CSS AQUÍ

export default function FooterEstudiante() {
  return (
    <footer className="estudiante-footer">
      <div>Universidad de Lima · Campus Monterrico</div>
      <div className="estudiante-footer-links">
        <a href="/reglamento">Reglamento de uso</a>
        <a href="/ayuda">Mesa de ayuda</a>
      </div>
    </footer>
  );
}