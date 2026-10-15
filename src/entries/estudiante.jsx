// src/entries/estudiantes.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Estilos globales
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//Componentes parciales
import Navbar from '../partials/Navbar.jsx';

// Páginas del sistema (CRUDs)
import ConfirmacionReserva from '../pages/reservas/ConfirmacionReserva.jsx';

// Layout Principal (Navbar + Footer)
function EstudianteLayout() {
  return (
      <div className="flex-grow-1 d-flex flex-column bg-light">
        <Navbar />
        <main className="p-4 flex-grow-1">
          {/* El contenido de la ruta activa se renderiza aquí */}
          <Outlet />
        </main>
      </div>
  );
}

// Configuración de Rutas
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/estudiante" element={<EstudianteLayout />}>
        <Route path="confirmacion-reserva" element={<ConfirmacionReserva />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Montaje en el DOM
const container = document.getElementById('root')

if (container) {
    ReactDOM.createRoot(container).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}