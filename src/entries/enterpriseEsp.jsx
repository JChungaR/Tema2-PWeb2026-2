import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Cabecera from '../partials/NavbarEnterprise'
import Sidebar from '../partials/Sidebar'
import Footer from '../partials/FooterEnterpriseEsp'


import './enterpriseEsp.css'


// ========================================
// PÁGINAS
// ========================================
import EspaciosPage from '../pages/EnterpriseEspacios/EspaciosPage'
import BandejaDelDiaPage from '../pages/EnterpriseEspacios/BandejaDelDiaPage'
import BloqueosPage from '../pages/EnterpriseEspacios/BloqueosPage'
import IncidenciasPage from '../pages/EnterpriseEspacios/IncidenciasPage'
import NuevoEspacioPage from '../pages/EnterpriseEspacios/NuevoEspacioPage'
import DetalleEspacioPage from '../pages/EnterpriseEspacios/DetalleEspacioPage'
import EquipamientoPage from '../pages/EnterpriseEspacios/EquipamientoPage'
import HorarioPage from '../pages/EnterpriseEspacios/HorarioPage'
import EstadoPage from '../pages/EnterpriseEspacios/EstadoPage'

// ========================================
// LAYOUT DE ENTERPRISE
// ========================================

function EnterpriseLayout() {
  return (
    <>
      <Cabecera />

      <div className="enterprise-layout">

        {/* Sidebar vacío por ahora */}
        <Sidebar />

        {/* Contenido que cambia según la ruta */}
        <main className="enterprise-content">

          <Routes>

            <Route
              path="/"
              element={<EspaciosPage />}
            />

            <Route
              path="/espacios/nuevo"
              element={<NuevoEspacioPage />}
            />

            <Route
              path="espacios/detalle/:codigo"
              element={<DetalleEspacioPage />}
            />

            <Route
              path="espacios/estado/:codigo"
              element={<EstadoPage />}
            />

            <Route
              path="espacios/horario/:codigo"
              element={<HorarioPage />}
            />

             <Route
              path="espacios/equipamiento/:codigo"
              element={<EquipamientoPage />}
            />

            <Route
              path="/bandeja"
              element={<BandejaDelDiaPage />}
            />

            <Route
              path="/bloqueos"
              element={<BloqueosPage />}
            />

            <Route
              path="/incidencias"
              element={<IncidenciasPage />}
            />

          </Routes>

        </main>

      </div>

      <Footer />
    </>
  )
}


// ========================================
// MONTAJE
// ========================================

const container = document.getElementById('root')

if (container) {

  ReactDOM.createRoot(container).render(

    <React.StrictMode>

      <BrowserRouter>

        <Routes>

          <Route
            path="/enterprise/*"
            element={<EnterpriseLayout />}
          />

        </Routes>

      </BrowserRouter>

    </React.StrictMode>
  )
}