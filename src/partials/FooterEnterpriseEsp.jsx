// src/partials/FooterEnterpriseEsp.jsx
import './FooterEnterpriseEsp.css';

export default function FooterEnterpriseEsp() {
  return (
    <footer className="enterprise-footer">

      <div className="enterprise-footer-left">
        Universidad de Lima · Campus Monterrico
      </div>

      <div className="enterprise-footer-right">

        <a className="links" href="/manual">
          Manual de operación
        </a>

        <a className="links" href="/soporte">
          soporte.reservas@ulima.edu.pe
        </a>

      </div>

    </footer>
  );
}
